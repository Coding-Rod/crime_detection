import numpy as np
from collections import deque

def momentum(self, class_name: int, confidence: float, threshold: float, queue: deque, constant: float = 0.9) -> tuple:
    """ Momentum is a measure of how many frames in a row a given class has been, it considers a queue of the last 10 frames and returns the most frequent class in the queue, consudering a pondered sum of the last 10 frames. Each frame has a weight of a constant value between 0 and 1, where the first frame has the lowest weight confidense multiplied by the constant power to n, where n is the frame index, and the last frame has the highest weight confidense multiplied by the constant power to 0.

    Args:
        class_name (int): Class name, could be 0 or 1, where 0 is no class and 1 is class.
        confidence (float): Confidence of the class, between 0 and 1.

    Returns:
        int: Class name, could be 0 or 1, where 0 is no class and 1 is class.
    """
    momentum = 0
    
    queue.append((class_name, confidence))
    
    if len(queue) > 10:
        queue.popleft()
    
    for i,j in enumerate(queue):
        momentum += j[0] * (j[1] * self.constant ** i )

    return momentum >= threshold, queue