from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
import uvicorn

import hashlib as hl
import numpy as np
import pathlib
import os

import tensorflow as tf
import tensorflow_hub as hub


app = FastAPI()

# Tensorflow configuration

# TODO: Modify the configuration to use the new model
labels_path = tf.keras.utils.get_file(
    fname='labels.txt',
    origin='https://raw.githubusercontent.com/tensorflow/models/f8af2291cced43fc9f1d9b41ddbf772ae7b0d7d2/official/projects/movinet/files/kinetics_600_labels.txt'
)
labels_path = pathlib.Path(labels_path)

lines = labels_path.read_text().splitlines()
LABEL_MAP = np.array([line.strip() for line in lines])

id = 'a2'
mode = 'base'
version = '3'
hub_url = f'https://tfhub.dev/tensorflow/movinet/{id}/{mode}/kinetics-600/classification/{version}'
model = hub.load(hub_url)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

def load_gif(file_path, image_size=(224, 224)):
    """Loads a gif file into a TF tensor.

    Use images resized to match what's expected by your model.
    The model pages say the "A2" models expect 224 x 224 images at 5 fps

    Args:
        file_path: path to the location of a gif file.
        image_size: a tuple of target size.

    Returns:
        a video of the gif file
    """
    
    # Load a gif file, convert it to a TF tensor
    raw = tf.io.read_file(file_path)
    video = tf.io.decode_gif(raw)
    # Resize the video
    video = tf.image.resize(video, image_size)
    # change dtype to a float32
    # Hub models always want images normalized to [0,1]
    # ref: https://www.tensorflow.org/hub/common_signatures/images#input
    video = tf.cast(video, tf.float32) / 255.
    return video

def inference(video):
    sig = model.signatures['serving_default']
    video = tf.cast(video, tf.float32) / 255.
    sig(image = video[tf.newaxis, :1])
    probs = sig(image = video[tf.newaxis, ...])
    probs = probs['classifier_head'][0]
    
    # Sort predictions to find top_k
    top_prediction = tf.argsort(probs, axis=-1, direction='DESCENDING')[0]
    # collect the labels of top_k predictions
    top_label = tf.gather(LABEL_MAP, top_prediction, axis=-1)
    # decode lablels
    top_label = top_label.numpy().decode('utf8')
    # top_k probabilities of the predictions
    return top_label

@app.post("/convert_to_gif")
async def convert_to_gif(file: UploadFile = File(...)):
    # Create gifs folder if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    # Save the received gif file
    filename = hl.md5(file.filename.encode()).hexdigest() + ".gif"
    with open(filename, "wb") as f:
        f.write(await file.read())
    
    # Make predictions
    result = inference(load_gif(filename))
    
    return {"message": result}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)