import aiohttp
import asyncio

class ApiClient:
    __token = None
    def __init__(self, base_url):
        self.base_url = base_url

    async def get(self, endpoint):
        url = f"{self.base_url}/{endpoint}"
        headers = {'Authorization': f'Bearer {self.__token}'} if self.__token else None
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                return await response.json()

    async def post(self, data, endpoint):
        url = f"{self.base_url}/{endpoint}"
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=data) as response:
                response = await response.json()
                self.__token = response['token']
                return response