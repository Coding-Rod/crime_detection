# Convert a json file to a csv file

# Import libraries
import json
import csv
import cv2
from tqdm import tqdm
# Set constants
JSON_FILE_TRAIN = '/media/rodri/Files/Datasets/Roboflow_v11/Dataset/train_labels.json'
CSV_FILE_TRAIN = '/media/rodri/Files/Datasets/Roboflow_v11/Dataset/train_labels.csv'

JSON_FILE_TEST = '/media/rodri/Files/Datasets/Roboflow_v11/Dataset/test_labels.json'
CSV_FILE_TEST = '/media/rodri/Files/Datasets/Roboflow_v11/Dataset/test_labels.csv'

def converter(json_file_path, csv_file_path):
    # Open json file
    with open(json_file_path) as json_file:
        data = json.load(json_file)
        
    # Open csv file
    csv_file = open(csv_file_path, 'w')
    csv_writer = csv.writer(csv_file)

    # Write the header
    csv_writer.writerow(['filename', 'img_width', 'img_height', 'channels', 'class', 'xmin', 'ymin', 'xmax', 'ymax', 'width', 'height'])

    # Print JSON file
    print(data[0])

    # Write the data
    for i in tqdm(range(len(data)), desc='Writing data'):
        filename = (data[i][0]['path'][:-3]+'jpg').replace('/labels/', '/images/')
        img_width, img_height, channels = cv2.imread(filename).shape
        
        class_name = data[i][0]['class']
        class_name = ('Background', 'Gun', 'Knife')[class_name]
        
        xmin = data[i][0]['bbox']['xmin']
        ymin = data[i][0]['bbox']['ymin']
        xmax = data[i][0]['bbox']['xmax']
        ymax = data[i][0]['bbox']['ymax']
        
        width = xmax - xmin
        height = ymax - ymin
        
        if width < 0:
            width = width * (-1)
            xmin, xmax = xmax, xmin
        if height < 0:
            height = height * (-1)
            ymin, ymax = ymax, ymin
        
        # Print data
        # print(f"Filename: {filename}\nWidth: {img_width}\nHeight: {img_height}\nChannels: {channels}\nClass: {class_name}\nXmin: {xmin}\nYmin: {ymin}\nXmax: {xmax}\nYmax: {ymax}\nWidth: {width}\nHeight: {height}\n")
        # print('-------------------')
        
        csv_writer.writerow([filename, img_width, img_height, channels, class_name, xmin, ymin, xmax, ymax, width, height])

if __name__ == '__main__':
    print('Converting train data...')
    converter(JSON_FILE_TRAIN, CSV_FILE_TRAIN)
    
    print('Converting test data...')
    converter(JSON_FILE_TEST, CSV_FILE_TEST)