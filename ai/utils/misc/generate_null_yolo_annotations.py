import os
from tqdm import tqdm

image_folder = "/media/rodri/Files/Background_dataset/images"
annotation_folder = "/media/rodri/Files/Background_dataset/annotations"

# Crate destination folder
os.makedirs(annotation_folder, exist_ok=True)

# Define a generator to yield image paths
def image_generator():
    for filename in os.listdir(image_folder):
        if filename.endswith(('.jpg', '.jpeg', '.png')):
            yield os.path.join(image_folder, filename)

# Define a generator to yield annotation paths
def annotation_generator():
    for image_path in image_generator():
        filename = os.path.splitext(os.path.basename(image_path))[0] + ".txt"
        yield os.path.join(annotation_folder, filename)

# Create empty annotation files for each image
for annotation_path in tqdm(annotation_generator(), total=3000):
    with open(annotation_path, "w") as annotation_file:
        pass  # Empty file
