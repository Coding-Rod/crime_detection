from imgaug.augmentables.bbs import BoundingBox, BoundingBoxesOnImage
import xml.etree.ElementTree as ET
import cv2
from tqdm import tqdm
def overwritexmlfilewithnewbndboxes(xml_file, bbs_aug, output_path):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    for obj,bbs in zip(root.iter('object'),bbs_aug):
        difficult = obj.find('difficult').text
        bndbox = obj.find('bndbox')
        if difficult == '0':
            bndbox.find('xmin').text = str(bbs.x1)
            bndbox.find('xmax').text = str(bbs.x2)
            bndbox.find('ymin').text = str(bbs.y1)
            bndbox.find('ymax').text = str(bbs.y2)
    tree.write(output_path)
    
if __name__ == '__main__':
    image = cv2.imread('/home/rodri/Documents/crime_detection/samples/data/image2.jpg')
    bbs = BoundingBoxesOnImage([
        BoundingBox(x1=65, y1=100, x2=200, y2=50),
        BoundingBox(x1=50, y1=80, x2=200, y2=130)
    ], shape=image.shape)
    overwritexmlfilewithnewbndboxes("/home/rodri/Documents/crime_detection/samples/data/image2.xml", bbs, "/home/rodri/Documents/crime_detection/samples/data/out.xml")