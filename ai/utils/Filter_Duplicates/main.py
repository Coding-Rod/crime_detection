import os
import hashlib
from tqdm import tqdm

def get_file_hash(filename):
    """
    Compute the MD5 hash of a file.
    """
    hasher = hashlib.md5()
    with open(filename, 'rb') as f:
        buf = f.read()
        hasher.update(buf)
    return hasher.hexdigest()

def filter_duplicates(image_dir):
    """
    Filter out duplicate images in a directory.
    """
    hashes = {}
    duplicates = []

    # Iterate over all the files in the directory.
    for root, dirs, files in os.walk(image_dir):
        for filename in tqdm(files, desc='Computing hashes'):
            # Compute the hash for each file.
            filepath = os.path.join(root, filename)
            file_hash = get_file_hash(filepath)

            # Check if the hash already exists in the dictionary.
            if file_hash in hashes:
                duplicates.append(filepath)
            else:
                hashes[file_hash] = filepath

    # Remove the duplicate files.
    for duplicate in tqdm(duplicates, desc='Removing duplicates'):
        os.remove(duplicate)

    return len(duplicates)

def image_generator(image_dir):
    """
    Generator that yields image filepaths from a directory.
    """
    for root, dirs, files in os.walk(image_dir):
        for filename in files:
            filepath = os.path.join(root, filename)
            yield filepath

def filter_duplicates_generator(image_dir):
    """
    Filter out duplicate images in a directory using generators.
    """
    hashes = {}
    duplicates = []

    # Iterate over all the image filepaths using a generator.
    for filepath in tqdm(image_generator(image_dir), desc='Computing hashes'):
        # Compute the hash for each file.
        file_hash = get_file_hash(filepath)

        # Check if the hash already exists in the dictionary.
        if file_hash in hashes:
            duplicates.append(filepath)
        else:
            hashes[file_hash] = filepath

    # Remove the duplicate files.
    for duplicate in tqdm(duplicates, desc='Removing duplicates'):
        os.remove(duplicate)

    return len(duplicates)

if __name__ == '__main__':
    image_dir = '/home/rodri/Downloads/guns/export4/output/'
    num_duplicates = filter_duplicates_generator(image_dir)
    print(f'Removed {num_duplicates} duplicate images.')
