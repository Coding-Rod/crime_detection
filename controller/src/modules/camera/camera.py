import cv2
import numpy as np

from PyQt5.QtCore import pyqtSignal, pyqtSlot, QObject


class VideoStream(QObject):
    frame_signal = pyqtSignal(np.ndarray)
    
    def __init__(self, camera=0):
        super().__init__()
        self.camera = camera
        self.stopped = False        

    @pyqtSlot()
    def start(self):
        cap = cv2.VideoCapture(self.camera)
        while not self.stopped:
            ret, frame = cap.read()
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            if ret:
                self.frame_signal.emit(frame)

    @pyqtSlot()
    def stop(self):
        self.stopped = True
