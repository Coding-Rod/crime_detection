from cryptography.fernet import Fernet

# Generate a new key for encryption
key = Fernet.generate_key()

# Initialize a Fernet instance with the key
fernet = Fernet(key)

# Save the key to a file
with open('key.key', 'wb') as key_file:
    key_file.write(key)