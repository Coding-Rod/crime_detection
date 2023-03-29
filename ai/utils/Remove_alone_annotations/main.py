import os
import xml.etree.ElementTree as ET
from tqdm import tqdm

def file_generator(data_dir):
    for file in os.listdir(data_dir):
        yield file

def remove_annotations_without_images(data_dir):
    """
    Remove annotations that do not have corresponding images in the directory.
    """
    for file in tqdm(file_generator(data_dir), desc='Processing files'):
        if file.endswith('.xml'):
            annotation_path = os.path.join(data_dir, file)
            image_path = os.path.join(data_dir, file[:-4] + '.jpg')

            # Check if the corresponding image exists.
            if not os.path.exists(image_path):
                os.remove(annotation_path)

    print('Done.')

if __name__ == '__main__':
    data_dir = '/home/rodri/Downloads/guns/export4/input_test'
    remove_annotations_without_images(data_dir)
