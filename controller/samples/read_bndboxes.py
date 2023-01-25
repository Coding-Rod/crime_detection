import xml.etree.ElementTree as ET

def return_bndboxes(filename):
    tree = ET.parse(filename)
    root = tree.getroot()
    bndboxes = []
    for obj in root.iter('object'):
        difficult = obj.find('difficult').text
        if difficult == '0':
            bndbox = obj.find('bndbox')
            xmin = bndbox.find('xmin').text
            ymin = bndbox.find('ymin').text
            xmax = bndbox.find('xmax').text
            ymax = bndbox.find('ymax').text
            bndboxes.append((int(xmin), int(ymin), int(xmax), int(ymax)))
    return bndboxes

if __name__ == '__main__':
    print(return_bndboxes("/home/rodri/Documents/crime_detection/data/Pistols/train/9-Cabot-Mirror-Image-Pearl-Pistol-Set-View-2-e1420302677510-1024x641_jpg.rf.d84ced0a26a023bf37934c1ade0e43e1.xml"))