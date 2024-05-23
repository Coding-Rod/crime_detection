import cv2
import queue
import numpy as np
import imageio
from tqdm import tqdm
import os


# Initialize the queue
frame_queue = queue.Queue(maxsize=60)

# Start capturing video from the webcam
cap = cv2.VideoCapture(1)

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

# Save the GIF to the computer
# Create a directory to store the GIFs if it doesn't exist
if not os.path.exists('gifs'):
    os.makedirs('gifs')

# Generate a unique filename for each GIF
gif_filename = f'gifs/gif{len(os.listdir("gifs")) + 1}.gif'

# Save the GIF to the computer
imageio.mimsave(gif_filename, frames)
print(f'GIF saved to {gif_filename}')