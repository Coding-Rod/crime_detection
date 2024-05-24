import cv2
import queue
import numpy as np
from tqdm import tqdm
import requests

# Initialize the queue
frame_queue = queue.Queue(maxsize=20)

# Start capturing video from the webcam
cap = cv2.VideoCapture(0)

while True:
    # Read a frame from the webcam
    ret, frame = cap.read()

    # print frame
    print(frame)

    # Display the frame
    cv2.imshow('Webcam', frame)

    # Append the frame to the queue
    frame_queue.put(frame)

    # Check if 'q' is pressed to exit the loop
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release the video capture and close the window
cap.release()
cv2.destroyAllWindows()

# Convert the frames in the queue to a GIF
frames = []
while not frame_queue.empty():
    frame = frame_queue.get()
    frames.append(frame)

# Convert frames from BGR to RGB
frames = [cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) for frame in tqdm(frames)]

# Make it JSON serializable
json_frames = [frame.tolist() for frame in tqdm(frames)]

# Send the JSON file to the receiver
url = 'http://localhost:8000/convert_to_gif'
data = {'frames': json_frames}
response = requests.post(url, json=data)

# # Print the response
print(response.json())