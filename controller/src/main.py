import numpy as np

from PyQt5.QtCore import Qt, pyqtSlot, QThread
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel

from modules.camera.camera import VideoStream
from modules.design.design import Design_UI
class VidePlayer(QMainWindow, Design_UI):
    def __init__(self):
        super().__init__()
        self.MainWindow = QMainWindow()
        self.setWindowTitle("Video Player")
        self.setGeometry(100, 100, 640, 300)

        # Image label
        self.image_label = QLabel(self)
        self.image_label.setGeometry(390, -5, 200, 200)

        # Video stream
        self.video_stream = VideoStream()
        self.video_thread = QThread()
        self.video_stream.moveToThread(self.video_thread)
        self.video_thread.started.connect(self.video_stream.start)
        self.video_stream.frame_signal.connect(self.display_frame)
        self.video_thread.start()
        
        # Window
        self.MainWindow.setObjectName("MainWindow")
        self.MainWindow.resize(650, 280)
        
        # Setup UI
        self.setupUi()
        
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

if __name__ == "__main__":
    app = QApplication([])
    player = VidePlayer()
    player.show()
    app.exec_()
