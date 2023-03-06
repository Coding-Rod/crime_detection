from PyQt5.QtWidgets import QApplication

from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI

class MainWindow(VideoPlayer, Design_UI):
    def __init__(self):
        super().__init__()
        self.setupUi()

if __name__ == "__main__":
    app = QApplication([])
    window = MainWindow()
    window.show()
    app.exec_()
