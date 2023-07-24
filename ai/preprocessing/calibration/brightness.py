import cv2
import numpy as np

def increase_brightness(image, value):
    # Convert the image to the HSV color space
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

    # Split the channels
    h, s, v = cv2.split(hsv)

    # Increase the value channel (brightness)
    v = np.clip(v + value, 0, 255)

    # Merge the channels back together
    hsv = cv2.merge([h, s, v])

    # Convert the image back to the BGR color space
    result = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

    return result

def on_trackbar(value):
    global brightness_value
    brightness_value = value

# Create a named window for the trackbar
cv2.namedWindow('Brightness Adjustment')

# Create a trackbar for adjusting brightness
cv2.createTrackbar('Brightness', 'Brightness Adjustment', 0, 100, on_trackbar)

# Initialize the video capture object
video_capture = cv2.VideoCapture(0)

brightness_value = 0

while True:
    # Read a frame from the video capture
    ret, frame = video_capture.read()

    # Increase the brightness dynamically based on the trackbar value
    brightened_frame = increase_brightness(frame, brightness_value)

    # Display the resulting frame
    cv2.imshow('Brightness Adjustment', brightened_frame)

    # Wait for keyboard events
    key = cv2.waitKey(1) & 0xFF

    # Exit if the 'q' key is pressed
    if key == ord('q'):
        break

# Release the video capture object and close the windows
video_capture.release()
cv2.destroyAllWindows()
