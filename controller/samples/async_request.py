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

async def main():
    client = ApiClient('http://192.168.0.13:3000/api/v1')
    try:
        response = await client.post({'username': 'ivan3299', 'password': 'password123'}, 'auth/login')
        print(response)
        response = await client.get('users')
        print(response)
    except aiohttp.ClientError as error:
        print(f"An error occurred: {error}")

if __name__ == '__main__':
    asyncio.run(main())
