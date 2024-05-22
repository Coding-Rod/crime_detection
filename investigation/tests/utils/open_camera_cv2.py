import cv2
import time

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
