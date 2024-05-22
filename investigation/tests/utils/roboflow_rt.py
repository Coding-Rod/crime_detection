import cv2
import time
from roboflow import Roboflow

# Initialize the Roboflow API
rf = Roboflow(api_key="wSbYaczzLzELee2lx4ed")
project = rf.workspace("crime-detection-zbmr9").project("knifes-and-guns")
model = project.version(4).model

# Open the default camera
cap = cv2.VideoCapture(0)

# Get the frames per second (fps) of the video stream
fps = cap.get(cv2.CAP_PROP_FPS)

# Initialize the previous time
prev_time = 0

while True:
    # Read the frame
    ret, frame = cap.read()

    # Calculate the current time
    curr_time = time.time()

    # Calculate the time elapsed since the previous frame
    time_elapsed = curr_time - prev_time

    # Update the FPS every second
    if time_elapsed > 1.0/fps:
        # Update the previous time
        prev_time = curr_time

        # Display the FPS on the frame
        fps_text = 'FPS: {:.2f}'.format(1.0/time_elapsed)
        cv2.putText(frame, fps_text, (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

        # Make an inference on the frame using the Roboflow model
        response = model.predict(frame, confidence=40, overlap=30).json()

        # Extract the predictions from the response
        predictions = response['predictions']

        # Initialize lists to hold class labels and confidence scores
        classes = []
        confidences = []

        # Loop over the predictions and extract the class labels and confidence scores
        for pred in predictions:
            classes.append(pred['class'])
            confidences.append(pred['confidence'])

        # Display the class labels and confidence scores on the frame
        for i, cls in enumerate(classes):
            text = f"{cls}: {confidences[i]:.2f}"
            cv2.putText(frame, text, (10, 70 + i * 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)
        
        # Print a dictionary with the classes as keys and the amount of times they appear as values
        if classes:
            print({cls: classes.count(cls) for cls in classes})

    # Display the frame
    cv2.imshow('frame', frame)

    # Wait for a key press
    key = cv2.waitKey(1)

    # Exit loop on 'q' key press
    if key == ord('q'):
        break

# Release the camera and close all windows
cap.release()
cv2.destroyAllWindows()
