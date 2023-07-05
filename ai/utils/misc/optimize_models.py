import torch
import onnx
import tensorflow as tf
from tqdm import tqdm
import os

def convert_yolo_to_tflite(input_model, output_folder, input_file):
    # Step 1: Convert PyTorch model to ONNX
    input_shape = (1, 3, 416, 416)  # Example input shape
    print(f"Converting {input_model} to ONNX...")
    model = torch.load(input_model)
    dummy_input = torch.randn(input_shape)
    torch.onnx.export(model, dummy_input, f"{output_folder}/yolo.onnx", verbose=True)

    # Step 2: Convert ONNX model to TensorFlow
    onnx_model = onnx.load(f"{output_folder}/yolo.onnx")
    tf_graph = tf.compat.v1.graph_util.import_graph_def(onnx_model.graph_def)
    tf.compat.v1.disable_eager_execution()
    with tf.compat.v1.Session() as sess:
        tf_output = sess.run(tf_graph.get_tensor_by_name('output:0'))
    tf.compat.v1.reset_default_graph()

    # Step 3: Quantize the TensorFlow model
    input_tensor = tf_graph.get_tensor_by_name('input:0')
    output_tensor = tf_graph.get_tensor_by_name('output:0')
    converter = tf.compat.v1.lite.TFLiteConverter.from_session(sess, [input_tensor], [output_tensor])
    converter.optimizations = [tf.compat.v1.lite.Optimize.DEFAULT]
    tflite_model = converter.convert()

    # Step 4: Convert TensorFlow model to TFLite
    tflite_converter = tf.compat.v1.lite.TFLiteConverter.from_saved_model(f"{output_folder}/yolo_saved_model")
    tflite_model = tflite_converter.convert()

    # Step 5: Deploy TFLite model on Jetson Nano
    with open(input_file, "wb") as f:
        f.write(tflite_model)
    
    interpreter = tf.lite.Interpreter(model_content=tflite_model)
    interpreter.allocate_tensors()

if __name__ == '__main__':
    parent_dir = os.path.dirname('../models/new/')
    sub_dirs = ['batch_8', 'batch_16', 'batch_32']
    model_names = ['yolov5', 'yolov7']
    individual_model_path = '../models/yolov8.pt'
    output_folder = '../models/optimized/'
    
    for sub_dir in tqdm(sub_dirs):
        for model_name in model_names:
            input_model = f"{parent_dir}/{sub_dir}/{model_name}.pt"
            input_file = f"{output_folder}/{sub_dir}/{model_name}.tflite"
            convert_yolo_to_tflite(input_model, output_folder, input_file)
    