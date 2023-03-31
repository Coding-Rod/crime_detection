import os
import shutil
import xml.etree.ElementTree as ET
import numpy as np
from sklearn.cluster import KMeans
from tqdm import tqdm

def annotation_generator(annotation_dir):
    """
    A generator that yields the paths to all annotation files in the given directory.
    """
    for annotation_file in os.listdir(annotation_dir):
        if annotation_file.endswith('.xml'):
            yield os.path.join(annotation_dir, annotation_file)

def get_boxes(annotation_path):
    """
    Extracts the bounding boxes from the given annotation file and returns them as an array.
    """
    boxes = []
    tree = ET.parse(annotation_path)
    root = tree.getroot()
    for obj in root.iter('object'):
        bndbox = obj.find('bndbox')
        xmin = float(bndbox.find('xmin').text)
        ymin = float(bndbox.find('ymin').text)
        xmax = float(bndbox.find('xmax').text)
        ymax = float(bndbox.find('ymax').text)
        boxes.append([xmin, ymin, xmax, ymax])
    return np.array(boxes)

def kmeans_clustering(annotation_dir, output_dir, num_clusters):
    """
    Performs KMeans clustering on the bounding boxes found in the annotation files and
    moves the corresponding image and annotation files to the appropriate cluster directory.
    """
    # Create the output directories.
    for i in range(num_clusters):
        cluster_dir = os.path.join(output_dir, f'cluster_{i}')
        os.makedirs(cluster_dir, exist_ok=True)

    # Get the bounding boxes for all annotations.
    boxes = np.vstack([get_boxes(annotation_path) for annotation_path in annotation_generator(annotation_dir)])

    # Perform KMeans clustering.
    kmeans = KMeans(n_clusters=num_clusters)
    kmeans.fit(boxes)

    # Move the image and annotation files to the appropriate cluster directories.
    for i, annotation_path in enumerate(annotation_generator(annotation_dir)):
        image_path = os.path.splitext(annotation_path)[0] + '.jpg'
        if not os.path.isfile(image_path):
            continue
        boxes = get_boxes(annotation_path)
        cluster_idx = kmeans.predict(boxes)
        for idx in cluster_idx:
            try:
                cluster_dir = os.path.join(output_dir, f'cluster_{idx}')
                shutil.move(annotation_path, os.path.join(cluster_dir, os.path.basename(annotation_path)))
                shutil.move(image_path, os.path.join(cluster_dir, os.path.basename(image_path)))
                print(f"{annotation_path} moved to cluster {idx}")
            except FileNotFoundError as error:
                print("-"*10,error,"-"*10)

    print('Done.')

if __name__ == '__main__':
    annotation_dir = '/home/rodri/Downloads/guns/export4/input_test'
    output_dir = '/home/rodri/Downloads/guns/export4/splitted_input'
    num_clusters = 100
    kmeans_clustering(annotation_dir, output_dir, num_clusters)
