from cryptography.fernet import Fernet
from pathlib import Path
class Security:
    def __init__(self):
        self.key = Fernet.generate_key()
        self.cipher_suite = Fernet(self.key)
        
        # Password
        self.__actual_path = Path(__file__).parent.absolute()
        file = open(f'{self.__actual_path}/assets/pass.txt', 'rb')
        self.__encrypted_password = file.read()
        file.close()
        
    def verifyPassword(self, password: str) -> bool:
        """ Verify the password.

        Args:
            password (str): The password to verify.

        Returns:
            bool: True if the password is correct, False otherwise.
        """
        with open(f'{self.__actual_path}/assets/key.key', 'rb') as file:
            key = file.read()
            fernet = Fernet(key)
            encrypted_password = fernet.decrypt(self.__encrypted_password)
            return password == encrypted_password.decode()
        
    def changePassword(self, password: str):
        """ Change the password.

        Args:
            password (str): The new password.
        """
        with open(f'{self.__actual_path}/assets/key.key', 'rb') as file:
            key = file.read()
            fernet = Fernet(key)
            self.__encrypted_password = fernet.encrypt(password.encode())
            with open(f'{self.__actual_path}/assets/pass.txt', 'wb') as file:
                file.write(self.__encrypted_password)
                
    def validatePassword(self, password: str) -> bool:
        """ Validate the password.

        Args:
            password (str): The password to validate.

        Returns:
            bool: True if the password is valid, False otherwise.
        """
        assert len(password) == 4, 'The password must be 4 characters long.'
        assert password.isdigit(), 'The password must be a number.'
        return True