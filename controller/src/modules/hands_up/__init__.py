from .response import Response

class HandsUp(Response):
    def __init__(self, algorithm="mediapipe"):
        if algorithm == "mediapipe":
            self.algorithm = "mediapipe"
        else:
            raise ValueError("Unknown algorithm")

