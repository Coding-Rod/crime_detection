from logging import exception
import pyrebase
from getpass import getpass
import json

firebaseConfig = {
    "apiKey": "AIzaSyDOiVXW7-HuQ8K9Fo5ROuMPHpdiV_IS9c0",
    "authDomain": "crime-detection-48ba3.firebaseapp.com",
    "projectId": "crime-detection-48ba3",
    "storageBucket": "crime-detection-48ba3.appspot.com",
    "messagingSenderId": "525094847317",
    "appId": "1:525094847317:web:16eb6b0ec093f7b656a5dc",
    "measurementId": "G-9240F08QT7",
    "databaseURL": ""
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()

def signup():
    user = None
    while user is None:
        try:
            print("Signing up...")
            email = input("Enter your email address: ")
            password = getpass("Enter your password: ")
            user = auth.create_user_with_email_and_password(email, password)
            print("Count successfully created")
            return auth.get_account_info(user['idToken'])
        except Exception as e:
            print(json.loads(e.strerror)["error"]["message"])

def login():
    user = None
    while user is None:
        try:
            print("Log in...")
            email = input("Enter your email address: ")
            password = getpass("Enter your password: ")
            user = auth.sign_in_with_email_and_password(email, password)
            print("Successfully logged in")
            return dict(auth.get_account_info(user['idToken']))
        except Exception as e:
            print(json.loads(e.strerror)["error"]["message"])

def logout():
    auth.current_user = None
    return None