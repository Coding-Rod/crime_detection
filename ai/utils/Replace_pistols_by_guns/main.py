# Copy dataset replacing all pistols on annotations by guns
import os
import shutil
from tqdm import tqdm

def directory_generator(path):
    for root, dirs, files in os.walk(path):
        for file in files:
            yield os.path.join(root, file)
            
def copy_image(image_path, new_image_path):
    shutil.copyfile(image_path, new_image_path)
    
def copy_annotation(annotation_path, new_annotation_path):
    with open(annotation_path, 'r') as f:
        lines = f.readlines()
    with open(new_annotation_path, 'w') as f:
        for line in lines:
            if 'pistol' in line:
                line = line.replace('pistol', 'gun')
            f.write(line)
            
if __name__ == '__main__':
    input_folder = '/media/rodri/Files/Datasets/Final_Dataset/guns/upload'
    output_folder = '/media/rodri/Files/Datasets/Final_Dataset/guns/new_upload'
    
    os.makedirs(output_folder, exist_ok=True)
    
    for file in tqdm(directory_generator(input_folder)):
        if file.endswith('.jpg'):
            new_file = file.replace(input_folder, output_folder)
            copy_image(file, new_file)
            continue
        elif file.endswith('.xml'):
            new_file = file.replace(input_folder, output_folder)
            copy_annotation(file, new_file)
    
    