import asyncio
import yaml
from PyQt5.QtWidgets import QApplication

from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI
from modules.api.apiClient import ApiClient

from modules.cli.cli import cli
from modules.pinOut.pinOut import PinOut

class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, client: ApiClient, hardware: dict, camera=0):
        self.client = client
        self.pinOut = PinOut(**hardware)

        self.pinOut.write_rgb(0, 0, 0)
        
        super().__init__()
        self.set_video_stream(camera)
        self.hidratate_design_methods(self.pinOut)
        self.video_stream.hidratate_video_stream(self.client, self.pinOut)
        
        
        self.setupUi()

async def main():
    config = yaml.safe_load(open("config/config.yml"))
    client = await cli(**config['network'])

    app = QApplication([])
    window = MainWindow(client=client, hardware=config['hardware'], camera=config['camera'])
    window.show()
    app.exec_()
    

if __name__ == "__main__":
    asyncio.run(main())