import asyncio
import yaml
from PyQt5.QtWidgets import QApplication

from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI
from modules.api.apiClient import ApiClient
from modules.cli.cli import cli
class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, client: ApiClient, hardware: dict):
        self.client = client
                    
        super().__init__()
        self.setupUi()

async def main():
    config = yaml.safe_load(open("config/config.yml"))
    client = await cli(**config['network'])

    app = QApplication([])
    window = MainWindow(client=client, hardware=config['hardware'])
    window.show()
    app.exec_()
    

if __name__ == "__main__":
    asyncio.run(main())