import aiohttp
import sys

from pathlib import Path


class Auth:    
    def __init__(self, base_url: str):
        self.base_url = base_url
        
    async def login(self, username: str, password: str) -> str or None:
        """ Login to the API.
        
        Args:
            username (str): The username of the user.
            password (str): The password of the user.
        """
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(f'{self.base_url}/auth/login', json={'username': username, 'password': password}) as response:
                    response = await response.json()
                    self.token = response['token']
                    return self.token
        except KeyError:
            print('Username or password incorrect')
            sys.exit()