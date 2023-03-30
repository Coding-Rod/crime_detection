import os
import shutil
import xml.etree.ElementTree as ET
from tqdm import tqdm

def dir_generator(annotation_dir):
    for annotation_file in os.listdir(annotation_dir):
        yield annotation_file
        

def move_annotations(annotation_dir, image_dir, trash_dir):
    """
    Move annotations and their corresponding images that meet the criteria to the trash folder.
    """
    for annotation_file in tqdm(dir_generator(annotation_dir), desc='Processing annotations'):
        if annotation_file[-3:] != 'xml':
            continue
        
        try:
            annotation_path = os.path.join(annotation_dir, annotation_file)
            image_file = os.path.splitext(annotation_file)[0] + '.jpg'
            image_path = os.path.join(image_dir, image_file)

            # Load the annotation file and iterate over the objects.
            tree = ET.parse(annotation_path)
            root = tree.getroot()
            for obj in root.iter('object'):
                bndbox = obj.find('bndbox')
                xmin = float(bndbox.find('xmin').text)
                ymin = float(bndbox.find('ymin').text)
                xmax = float(bndbox.find('xmax').text)
                ymax = float(bndbox.find('ymax').text)
                width = xmax - xmin
                height = ymax - ymin

                # Check if the object meets the criteria.
                if width / height > 2.5 or height / width > 2.5:
                    # Move the annotation and image files to the trash folder.
                    shutil.move(annotation_path, os.path.join(trash_dir, annotation_file))
                    shutil.move(image_path, os.path.join(trash_dir, image_file))
                    break
        except FileNotFoundError:
            pass

    print('Done.')

if __name__ == '__main__':
    annotation_dir = '/home/rodri/Downloads/guns/export4/input'
    image_dir = '/home/rodri/Downloads/guns/export4/input'
    trash_dir = '/home/rodri/Downloads/guns/export4/trash'
    move_annotations(annotation_dir, image_dir, trash_dir)
