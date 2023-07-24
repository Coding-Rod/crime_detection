import cv2
from roboflow import Roboflow
import time

# Initialize Roboflow API
rf = Roboflow(api_key="wSbYaczzLzELee2lx4ed")
project = rf.workspace("crime-detection-zbmr9").project("knifes-and-guns")
model = project.version(4).model

# Enable CUDA acceleration for OpenCV and DNN module
cv2.dnn.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
cv2.dnn.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# Open camera
cap = cv2.VideoCapture(0, cv2.CAP_CUDA)

# Initialize FPS calculation
prev_time = 0

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Make prediction on frame using Roboflow model
    predictions = model.predict_from_image(frame, confidence=40, overlap=30).json()

    # Extract classes and amounts from predictions
    classes = [prediction["class"] for prediction in predictions]

    # Draw FPS on frame
    cur_time = time.time()
    fps = 1 / (cur_time - prev_time)
    prev_time = cur_time
    cv2.putText(frame, f"FPS: {int(fps)}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

    # Draw white box and prediction text on frame
    cv2.rectangle(frame, (frame.shape[1]-200, frame.shape[0]-50), (frame.shape[1], frame.shape[0]), (255, 255, 255), -1)

    # Display the resulting frame
    cv2.imshow('frame', frame)

    # Print a dictionary with the classes as keys and the amount of times they appear as values
    if classes:
        print({cls: classes.count(cls) for cls in classes})

    # Exit on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture and destroy all windows
cap.release()
cv2.destroyAllWindows()
