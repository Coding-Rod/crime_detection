import cv2
import queue
from tqdm import tqdm
import requests
import imageio
import hashlib

# Initialize the queue
frame_queue = queue.Queue(maxsize=20)

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

# Save frames as a GIF
# imageio.mimsave('gifsoutput.gif', frames, fps=10)
filename = 'gifs/' + hashlib.md5(str(frames).encode()).hexdigest() + '.gif'
imageio.mimsave(
    filename,
    frames,
    fps=10
)

# Send the JSON file to the receiver
url = 'http://http://192.168.0.11:8000/convert_to_gif'
data = {'filename': filename}
response = requests.post(url, data=data)

# # Print the response
print(response.json())