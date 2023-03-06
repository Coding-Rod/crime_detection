import asyncio
from PyQt5.QtWidgets import QApplication

from modules.auth.auth import Auth
from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI

class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, token: str):
        self.token = token
        super().__init__()
        self.setupUi()

async def main():
    auth = Auth('http://192.168.0.13:3000/api/v1')
    token = await auth.login('ivan3299', 'password123')
    app = QApplication([])
    window = MainWindow(token)
    window.show()
    app.exec_()
    

if __name__ == "__main__":
    asyncio.run(main())