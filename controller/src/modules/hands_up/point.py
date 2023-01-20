import numpy as np
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return str((self.x, self.y))

    def angle(self):
        return np.arctan2(self.y, self.x)*(180/np.pi)