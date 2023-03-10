import numpy as np

def object_detection(image: np.ndarray) -> dict:
    """ This function is used to detect guns and/or knives in an image.

    Args:
        image (numpy.ndarray): The image to detect guns and/or knives in.

    Returns:
        dict: A dictionary containing the amount of the detected guns and/or knives.
    """
    print('Not implemented yet.')
    
    weapons = np.random.randint(0, image.shape[0]*image.shape[1])
    return {
        "guns": 5 if weapons == 0 else weapons, 
        "knives": 5 if weapons == 0 else weapons
    }    