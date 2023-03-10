import cv2
import numpy as np

from PyQt5.QtCore import Qt, pyqtSlot, QThread
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtWidgets import QMainWindow, QLabel
from PyQt5.QtCore import pyqtSignal, pyqtSlot, QObject

from ..model.model import object_detection

class VideoStream(QObject):
    frame_signal = pyqtSignal(np.ndarray)
    client = None
    pinOut = None
    
    def __init__(self, camera=0):
        super().__init__()
        self.camera = camera
        self.stopped = False        

    # def hidratate_video_stream(self, frame):
    #     """ Obtain client and pinOut objects from the main window. """
    #     self.client = frame.client
    #     self.pinOut = frame.pinOut

    @pyqtSlot()
    def start(self):
        cap = cv2.VideoCapture(self.camera)
        while not self.stopped:
            ret, frame = cap.read()
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            # if self.pinOut.read_pin():
            #     detection = object_detection(frame)
            #     if sum(detection.values()) > 0:
            #         self.pinOut.write_rgb(1, 0, 0)
            #         self.pinOut.write_relay(0)
            #         if detection['guns'] > 0 and detection['knives'] > 0:
            #             self.client.new_alert_notification(f"{self.client.node_data['name']} - {self.client.node_data['location']} detected {str(detection['guns'])+(' gun' + 's' if detection['guns'] > 1 else ' gun')} and {str(detection['knives'])+(' knives' if detection['knives'] > 1 else ' knife')}")
            #         elif detection['guns'] > 0:
            #             self.client.new_alert_notification(f"{self.client.node_data['name']} - {self.client.node_data['location']} detected {str(detection['guns'])+(' gun' + 's' if detection['guns'] > 1 else ' gun')}")
            #         elif detection['knives'] > 0:
            #             self.client.new_alert_notification(f"{self.client.node_data['name']} - {self.client.node_data['location']} detected {str(detection['knives'])+(' knives' if detection['knives'] > 1 else ' knife')}")
            if ret:
                self.frame_signal.emit(frame)

    @pyqtSlot()
    def stop(self):
        self.stopped = True

class VideoPlayer(QMainWindow):
    def __init__(self):
        super().__init__()
        self.MainWindow = QMainWindow()
        self.setWindowTitle("Video Player")
        self.setGeometry(100, 100, 640, 300)

        # Image label
        self.image_label = QLabel(self)
        self.image_label.setGeometry(390, -5, 200, 200)

        # Window
        self.MainWindow.setObjectName("MainWindow")
        self.MainWindow.resize(650, 280)
        
    def set_video_stream(self, camera=0):
        """ This function is used to set the video camera to be used by the video player

        Args:
            camera (int, optional): This parameter let the user to select the camera that is going to be used. Defaults to 0.
        """        
        self.video_stream = VideoStream(camera)
        self.video_thread = QThread()
        self.video_stream.moveToThread(self.video_thread)
        self.video_thread.started.connect(self.video_stream.start)
        self.video_stream.frame_signal.connect(self.display_frame)
        self.video_thread.start()
        
    @pyqtSlot(np.ndarray)
    def display_frame(self, image):
        # Convert the frame to an RGB image and resize it to fit the label
        h, w, c = image.shape
        bytes_per_line = c * w
        q_image = QImage(image.data, w, h, bytes_per_line, QImage.Format_RGB888)
        pixmap = QPixmap.fromImage(q_image)
        pixmap = pixmap.scaled(self.image_label.width(), self.image_label.height(),aspectRatioMode=Qt.KeepAspectRatio)

        # Update the label with the pixmap
        self.image_label.setPixmap(pixmap)

    def closeEvent(self, event):
        self.video_stream.stop()
        self.video_thread.quit()
        self.video_thread.wait()
        event.accept()
        