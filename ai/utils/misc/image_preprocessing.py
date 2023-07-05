import cv2

import numpy as np

cap = cv2.VideoCapture(0)

while True:
    
    _, frame = cap.read()
    contrast = 5. # Contrast control ( 0 to 127)
    brightness = 2. # Brightness control (0-100)

    # call addWeighted function. use beta = 0 to effectively only operate on one image
    out = cv2.addWeighted( frame, contrast, frame, 0, brightness)

    # display the image with changed contrast and brightness
    cv2.imshow('adjusted', out)
    cv2.waitKey(0)
    cv2.destroyAllWindows()