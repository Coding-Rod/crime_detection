import asyncio
import yaml
from PyQt5.QtWidgets import QApplication

from modules.auth.auth import Auth
from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI

class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, config: dict):
        print(config)
        self.token = config['token']
        super().__init__()
        self.setupUi()

async def main():
    config = yaml.safe_load(open('config.yml'))
    auth = Auth(config['base_url'])
    config['token'] = await auth.login(config['username'], config['password'])
    del config['username']
    del config['password']

    app = QApplication([])
    window = MainWindow(config=config)
    window.show()
    app.exec_()
    

if __name__ == "__main__":
    asyncio.run(main())