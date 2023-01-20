import os
from .firebase_auth_demo import signup, login, logout

clear = lambda: os.system('clear')
clear()
if __name__ == "__main__":
    userid = None
    while True:
        if userid is None:
            userid = signup() if input("Are you a new user?[yes/no]: ")=="yes" else login()
        with open('docs/menu.txt', 'r') as f:
            option = int(input(f.read()))
        if option == 1:
            pass
        else:
            userid = logout()
        clear()
