import asyncio
import sys
import yaml
from PyQt5.QtWidgets import QApplication

from modules.auth.auth import Auth
from modules.camera.camera import VideoPlayer
from modules.design.design import Design_UI
from modules.api.apiClient import ApiClient

class MainWindow(VideoPlayer, Design_UI):
    def __init__(self, client: ApiClient):
        self.client = client
        super().__init__()
        self.setupUi()

async def main():
    config = yaml.safe_load(open('config.yml'))
    auth = Auth(config['base_url'])
    config['token'] = await auth.login(config['username'], config['password'])    
    client = ApiClient(config['base_url'], config['token'])
    
    del config
    try:
        print('Verifying node information...')
        client.verify_config()
    except AssertionError as error:
        print(error)
        print("Complete data for the configuration file")
        data = client.read_config() or {}
        
        data['node_id'] = data['node_id'] if 'node_id' in data.keys() else input('Enter the node_id: ')
        data['name'] = data['name'] if 'name' in data.keys() else input('Enter the name: ')
        data['location'] = data['location'] if 'location' in data.keys() else input('Enter the location: ')
            
        client.save_config(data)
        print('Node information  saved!')
    else:
        print('Node information verified')        

    try:
        await client.compare_local_server()
    except AssertionError as error:
        print(error)
        if input('Not registered on server, do you want to do it now? (y/N): ') == 'y':
            await client.post('nodes', data=client.node_config) 
        else:
            print('Node not created')
            sys.exit()
    else:
        try:
            match client.status:
                case 0: # Name and location are wrong
                    if input('The name and location are wrong, do you want to update it now? (y/N): ') == 'y':
                        await client.patch('nodes', data=client.node_config)
                    else:
                        raise PermissionError('Node was not updated')
                case 1: # Name is wrong
                    if input('The name is wrong, do you want to update it now? (y/N): ') == 'y':
                        await client.patch('nodes', data=client.node_config)
                    else:
                        raise PermissionError('Node was not updated')
                case 2: # Location is wrong
                    if input('The location is wrong, do you want to update it now? (y/N): ') == 'y':
                        await client.patch('nodes', data=client.node_config)
                    else:
                        raise PermissionError('Node was not updated')
                case 3: # OK
                    print('Node information is correct')
        except PermissionError as error:
            print(error)
            sys.exit()
    
    print('Starting...')
    app = QApplication([])
    window = MainWindow(client=client)
    window.show()
    app.exec_()
    

if __name__ == "__main__":
    asyncio.run(main())