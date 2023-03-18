import aiohttp
import requests
import sys
import yaml

from pathlib import Path

class ApiClient:
    base_path = Path(__file__).parent
    filename = (base_path / "config.yml").resolve()
    node_config = None
    node_data = None
    status = None
    
    def __init__(self, base_url: str, token: str):
        print(self.filename)
        self.base_url = base_url
        self.__token = token
        
    async def get(self) -> dict:
        """ This method is used to get data from the API

        Args:
            endpoint (str): The endpoint of the API
            id (int): The id of the node, it will be send as a query parameter
            
        Returns:
            dict: The response of the API
        """
        
        url = f"{self.base_url}/nodes"
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params={'id': self.node_config['node_id']}, headers={'Authorization': f'Bearer {self.__token}'}) as response:
                self.node_data = await response.json()
                return self.node_data
            
    async def post(self, data: dict) -> dict:
        """ This method is used to create a new node

        Args:
            endpoint (str): The endpoint of the API
            data (dict): The data of the node, this will contain the name and the location of the node

        Returns:
            dict: The response of the API
        """
        
        url = f"{self.base_url}/nodes"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=data, headers={'Authorization': f'Bearer {self.__token}'}) as response:
                    data = await response.json()
                    assert 'error' not in data.keys(), data['message']
                    self.node_data = data
                    return self.node_data
        except AssertionError as error:
            print(error)
            sys.exit()

    async def patch(self, data: dict) -> dict:
        """ This method is used to update a node

        Args:
            endpoint (str): The endpoint of the API
            data (dict): The data of the node, this could contain the name, the location and the status of the node

        Returns:
            dict: The response of the API
        """
        
        url = f"{self.base_url}/nodes/{self.node_config['node_id']}"
        try:
            async with aiohttp.ClientSession() as session:
                async with session.patch(url, json=data, headers={'Authorization': f'Bearer {self.__token}'}) as response:
                    data = await response.json()
                    assert 'error' not in data.keys(), data['message']
                    self.node_data = data
                    return self.node_data
        except AssertionError as error:
            print(error)
            sys.exit()

    def new_alert_notification(self, message: str):
        """ This method is used to create a new notification synchronously with requests

        Args:
            message (str): The message of the notification
        """
        url = f"{self.base_url}/notifications"
        
        try:
            response = requests.post(url, json={ "message": message, "type": 3 }, headers={'Authorization': f'Bearer {self.__token}'})
            data = response.json()
            assert 'error' not in data.keys(), data['message']
        except AssertionError as error:
            print(error)
                
    def save_config(self, data: dict) -> None:
        """ This method is used to save the configuration of the nodes in a file, this file must only contains node_id, name and location

        Args:
            data (dict): The data of the nodes
        """
        
        with open(self.filename, 'w') as file:
            yaml.dump(data, file)
        self.node_config = data
            
    def verify_config(self) -> dict:
        """ This method is used to verify if the configuration file exists

        Returns:
            dict: The data of the node
        """
        
        with open(self.filename, 'r') as file:
            data = yaml.safe_load(file) or {}
            
            assert 'node_id' in data.keys(), 'The node_id is not defined'
            assert 'name' in data.keys(), 'The name is not defined'
            assert 'location' in data.keys(), 'The location is not defined'
            
            self.node_config = data
            
            return self.node_config
    
    def read_config(self) -> dict:
        """ This method is used to read the configuration file

        Returns:
            dict: The data of the node
        """
        
        with open(self.filename, 'r') as file:
            data = yaml.safe_load(file)
            self.node_config = data
            return self.node_config
        
    async def compare_local_server(self):
        """ This method is used to compare the local configuration with the server configuration

        int: Number code:
            - 0: Name and location are wrong
            - 1: Name is wrong
            - 2: Location is wrong
            - 3: OK
        """
        
        response = await self.get()
        
        assert 'name' in response.keys(), response['message']
                
        self.status = int(bin(int(response['name'] == self.node_config['name']) << 1 | int(response['location'] == self.node_config['location'])), 2)