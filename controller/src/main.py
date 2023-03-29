import asyncio
import yaml

from PyQt5.QtWidgets import QApplication
from aiohttp import client_exceptions

from modules.api.apiClient import ApiClient
from modules.camera.camera import VideoPlayer
from modules.cli.cli import cli
from modules.design.design import Design_UI
from modules.pinOut.pinOut import PinOut

class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, client: ApiClient, hardware: dict, camera=0):
        self.client = client
        self.pinOut = PinOut(**hardware)

        # Set RGB led to Green
        self.pinOut.write_rgb(0, 255, 0)
        
        super().__init__()
        self.set_video_stream(camera)
        
        self.hidratate_design_methods(self.pinOut)
        self.video_stream.hidratate_video_stream(self.client, self.pinOut)
        
        self.setupUi()

async def main():
    try:
        config = yaml.safe_load(open("config/config.yml"))
        client = await cli(**config['network'])

        # Send status to server
        await client.patch({'status': True})        

        app = QApplication([])
        window = MainWindow(client=client, hardware=config['hardware'], camera=config['camera'])
        window.show()
        app.exec_()
    except client_exceptions.ClientConnectorError:
        print('Server is not available')
    else:        
        # Send status to server
        await client.patch({'status': False})
    finally:
        print("Closing...")
    

if __name__ == "__main__":
    asyncio.run(main())