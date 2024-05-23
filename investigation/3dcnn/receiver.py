from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import numpy as np
import hashlib as hl
import pathlib

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

def inference(video):
    sig = model.signatures['serving_default']
    video = tf.cast(video, tf.float32) / 255.
    sig(image = video[tf.newaxis, :1])
    probs = sig(image = video[tf.newaxis, ...])
    probs = probs['classifier_head'][0]
    
    # Sort predictions to find top_k
    top_predictions = tf.argsort(probs, axis=-1, direction='DESCENDING')[:5]
    # collect the labels of top_k predictions
    top_labels = tf.gather(LABEL_MAP, top_predictions, axis=-1)
    # decode lablels
    top_labels = [label.decode('utf8') for label in top_labels.numpy()]
    # top_k probabilities of the predictions
    top_probs = tf.gather(probs, top_predictions, axis=-1).numpy()
    return tuple(zip(top_labels, top_probs))

@app.post("/convert_to_gif")
async def convert_to_gif(frames: dict):
    # Extract frames from the request body
    frame_list = frames.get('frames', [])

    # Check if frames are present
    if not frame_list:
        return {"message": "No frames found"}

    # Convert frames to gif
    gif_path = f"gifs/{hl.sha256(str(frame_list).encode()).hexdigest()}.gif"
    
    # Convert frames (which are lists) to numpy arrays
    frames = np.array(frame_list)
    
    # Convert to tensor
    frames = tf.convert_to_tensor(frames)
    
    # Make predictions
    result = inference(frames)
    
    return {"message": result}