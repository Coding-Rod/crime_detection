from cryptography.fernet import Fernet

# Read the key from the file
file = open("key.key", "rb")
key = file.read()
file.close()

# Initialize a Fernet instance with the key
fernet = Fernet(key)

# Encrypt the password
password = "1234"
encrypted_password = fernet.encrypt(password.encode())

# Write the encrypted password to a file
with open("pass.txt", "wb") as f:
    f.write(encrypted_password)