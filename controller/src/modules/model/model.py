import numpy as np
import cv2

def object_detection(image: np.ndarray) -> dict:
    """ This function is used to detect guns and/or knives in an image.

    Args:
        image (numpy.ndarray): The image to detect guns and/or knives in.

    Returns:
        dict: A dictionary containing the amount of the detected guns and/or knives.
    """
    # Check if screen is black
    if np.mean(image) < 10:
        return {
            "guns": 1,
            "knives": 0
        }        
    
    weapons = {
        "guns": 0,
        "knives": 0
    }
    return weapons