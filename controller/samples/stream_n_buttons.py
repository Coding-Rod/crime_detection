import sys
import cv2
import asyncio
from PyQt5.QtCore import Qt
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtWidgets import QApplication, QLabel, QWidget, QVBoxLayout, QPushButton


class VideoStream(QWidget):
    def __init__(self):
        super().__init__()

        # Create a label to display the video stream
        self.label = QLabel(self)
        self.label.setAlignment(Qt.AlignCenter)

        # Create buttons
        self.start_button = QPushButton("Start", self)
        self.stop_button = QPushButton("Stop", self)

        # Create a layout to hold the buttons
        button_layout = QVBoxLayout()
        button_layout.addWidget(self.start_button)
        button_layout.addWidget(self.stop_button)

        # Create a layout to hold the label and the button layout
        main_layout = QVBoxLayout()
        main_layout.addWidget(self.label)
        main_layout.addLayout(button_layout)

        self.setLayout(main_layout)

        # Connect the start and stop button signals to slots
        self.start_button.clicked.connect(self.start_stream)
        self.stop_button.clicked.connect(self.stop_stream)

        # Initialize the video stream
        self.capture = cv2.VideoCapture(0)
        self.capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    async def update_frame(self):
        while True:
            ret, frame = self.capture.read()
            if ret:
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                h, w, ch = image.shape
                bytes_per_line = ch * w
                convert_to_qt_format = QImage(
                    image.data, w, h, bytes_per_line, QImage.Format_RGB888
                )
                pixmap = QPixmap.fromImage(convert_to_qt_format)
                self.label.setPixmap(pixmap)
                await asyncio.sleep(0.01)

    def start_stream(self):
        asyncio.ensure_future(self.update_frame())

    def stop_stream(self):
        self.capture.release()
        QApplication.quit()


if __name__ == "__main__":
    app = QApplication(sys.argv)
    stream = VideoStream()
    stream.show()

    sys.exit(app.exec_())
