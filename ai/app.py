from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import hashlib as hl
import numpy as np
import os
import tensorflow as tf
import cv2

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your custom saved TensorFlow model
model = tf.saved_model.load('./model')
class_names = ["normal", "robbery"]

# Load MP4 file using OpenCV and preprocess it for model input
def load_mp4(file_path, image_size=(224, 224), num_frames=30, every_n_frame=2):
    """
    Loads an mp4 file, extracts and preprocesses frames.

    Args:
        file_path (str): Path to the mp4 file.
        image_size (tuple): Size to which each frame will be resized (width, height). Default is (224, 224).
        num_frames (int): Number of frames to extract from the video. Default is 30.
        every_n_frame (int): Interval at which frames are extracted. For example, if set to 2, every second frame is extracted. Default is 2.

    Returns:
        np.ndarray: A NumPy array of shape (1, num_frames, image_size[0], image_size[1]) containing the preprocessed frames.
    """
    cap = cv2.VideoCapture(file_path)
    frames = []
    counter = 0
    while len(frames) < num_frames:
        ret, frame = cap.read()
        if not ret:
            break
        if counter % every_n_frame == 0:
            gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
            resized_frame = cv2.resize(gray_frame, image_size)  # Resize to model's input size
            normalized_frame = resized_frame / 255.0  # Normalize pixel values to [0, 1]
            frames.append(normalized_frame)
        counter += 1
    cap.release()

    # Convert the frames list to a NumPy array
    frames_array = np.array(frames)
    frames_array = np.expand_dims(frames_array, axis=0)  # Add batch dimension
    frames_array = frames_array.astype(np.float32)
    return frames_array

# Perform inference using the loaded model
def inference(video):
    video = np.transpose(video, (0, 3, 2, 1))  # Adjust dimensions to match model input
    video = np.expand_dims(video, axis=4)  # Add the extra dimension
    score = model.signatures.get('serving_default')(tf.constant(video))['output_0']
    final_score = score.numpy().tolist()[0][0]
    class_name = "robbery" if final_score < 0.5 else "normal"
    return class_name, 2*abs(final_score-0.5)  # Return the class with the highest score

# FastAPI endpoint to handle MP4 video file uploads and perform inference
@app.post("/get_inference")
async def get_inference(file: UploadFile = File(...)):
    # Ensure the uploaded file is an MP4 file
    if not file.filename.endswith(".mp4"):
        return {"error": "Only MP4 files are supported."}

    # Create uploads folder if it doesn't exist
    os.makedirs("uploads", exist_ok=True)

    # Save the received video file
    file_location = f"uploads/{hl.md5(file.filename.encode()).hexdigest()}_{file.filename}"
    with open(file_location, "wb") as f:
        f.write(await file.read())

    # Process the MP4 video
    video = load_mp4(file_location)

    # Perform inference and return the result
    result, score = inference(video)

    return {"message": result, "score": score}

# Run the FastAPI app
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
