import os
import random
import shutil
from tqdm import tqdm
source_dir = "/home/rodri/fiftyone/coco-2017/train/data"
destination_dir = "/media/rodri/Files/Background_dataset/images"
num_images_to_copy = 3000

# Create the destination directory if it doesn't exist
os.makedirs(destination_dir, exist_ok=True)

# Get a tuple of all image file names in the source directory
image_files = tuple(f for f in os.listdir(source_dir) if f.endswith(('.jpg', '.jpeg', '.png')))

# Randomly select num_images_to_copy images
random_images = random.sample(image_files, num_images_to_copy)

# Delete the image_files tuple to conserve memory
del image_files

# Define a generator to yield the randomly selected images
def image_generator():
    for image in random_images:
        yield os.path.join(source_dir, image)

# Copy the randomly selected images to the destination directory
for image_path in tqdm(image_generator(), total=num_images_to_copy):
    shutil.copy(image_path, destination_dir)
