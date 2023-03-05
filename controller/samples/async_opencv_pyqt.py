import cv2
import numpy as np
from PyQt5.QtCore import Qt
from PyQt5.QtCore import pyqtSignal, pyqtSlot, QObject, QThread
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel

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
            if ret:
                self.frame_signal.emit(frame)

    @pyqtSlot()
    def stop(self):
        self.stopped = True

class VideoPlayer(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Video Player")
        self.setGeometry(100, 100, 640, 480)

        self.image_label = QLabel(self)
        self.image_label.setGeometry(0, 0, 640, 480)

        self.video_stream = VideoStream()
        self.video_thread = QThread()
        self.video_stream.moveToThread(self.video_thread)
        self.video_thread.started.connect(self.video_stream.start)
        self.video_stream.frame_signal.connect(self.display_frame)
        self.video_thread.start()

    @pyqtSlot(np.ndarray)
    def display_frame(self, frame):
        # Convert the frame to an RGB image and resize it to fit the label
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
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

if __name__ == "__main__":
    app = QApplication([])
    player = VideoPlayer()
    player.show()
    app.exec_()
