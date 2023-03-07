'''
Get node
Post node
Update node
Save configuration
verify configuration
'''

import aiohttp
import yaml

from pathlib import Path

class ApiClient:
    base_path = Path(__file__).parent
    filename = (base_path / "config.yml").resolve()
    node_data = None
    
    def __init__(self, base_url: str, token: str):
        print(self.filename)
        self.base_url = base_url
        self.__token = token
        
    async def get(self, endpoint: str, id: int) -> dict:
        """ This method is used to get data from the API

        Args:
            endpoint (str): The endpoint of the API
            id (int): The id of the node, it will be send as a query parameter
            
        Returns:
            dict: The response of the API
        """
        
        url = f"{self.base_url}/{endpoint}"
        async with aiohttp.ClientSession() as session:
            async with session.get(url, params={'id': id}, headers={'Authorization': f'Bearer {self.__token}'}) as response:
                return await response.json()
            
    async def post(self, endpoint: str, data: dict) -> dict:
        """ This method is used to create a new node

        Args:
            endpoint (str): The endpoint of the API
            data (dict): The data of the node, this will contain the name and the location of the node

        Returns:
            dict: The response of the API
        """
        
        url = f"{self.base_url}/{endpoint}"
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=data, headers={'Authorization': f'Bearer {self.__token}'}) as response:
                return await response.json()
            
    async def patch(self, endpoint: str, data: dict) -> dict:
        """ This method is used to update a node

        Args:
            endpoint (str): The endpoint of the API
            data (dict): The data of the node, this could contain the name, the location and the status of the node

        Returns:
            dict: The response of the API
        """
        
        url = f"{self.base_url}/{endpoint}"
        async with aiohttp.ClientSession() as session:
            async with session.patch(url, json=data, headers={'Authorization': f'Bearer {self.__token}'}) as response:
                return await response.json()
            
    def save_config(self, data: dict) -> None:
        """ This method is used to save the configuration of the nodes in a file, this file must only contains node_id, name and location

        Args:
            data (dict): The data of the nodes
        """
        
        with open(self.filename, 'w') as file:
            yaml.dump(data, file)
        self.node_data = data
            
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
            
            self.node_data = data
            
            return data
    
    def read_config(self) -> dict:
        """ This method is used to read the configuration file

        Returns:
            dict: The data of the node
        """
        
        with open(self.filename, 'r') as file:
            data = yaml.safe_load(file)
            self.node_data = data
            return data