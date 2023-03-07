import asyncio
import yaml
from PyQt5.QtWidgets import QApplication

from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI
from modules.api.apiClient import ApiClient
from modules.cil.cil import cil
class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, client: ApiClient):
        self.client = client
        super().__init__()
        self.setupUi()

async def main():
    
    client = cil(yaml.load(open('config.yml', 'r'), Loader=yaml.FullLoader))

    app = QApplication([])
    window = MainWindow(client=client)
    window.show()
    app.exec_()
    

if __name__ == "__main__":
    asyncio.run(main())