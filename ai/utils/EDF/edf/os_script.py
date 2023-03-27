import os
import shutil

class Os_script:
    def __init__(self, input_folder, output_folder, current_folder):
        self.__current_folder = current_folder
        self.__input_folder = os.path.join(self.__current_folder, input_folder)
        self.__output_folder = os.path.join(self.__current_folder, output_folder)

    def move_file(self, path, destination):
        shutil.copyfile(path, destination)
        print(f"{path.split('/')[-1]} moved")

    def move_xml_file(self, path, destination, image_extension):
        try:
            shutil.copyfile(path.replace(image_extension, 'xml'), destination.replace(image_extension, "xml"))
            print(f"{path.split('/')[-1]} moved with its xml file")
        except FileNotFoundError:
            print(f"{path.split('/')[-1]} has no xml file")

    def has_xml_file(self, path, image_extension):
        return os.path.exists(path.replace(image_extension, 'xml'))

    def setInputfolder(self, path):
        self.__input_folder = path

    def setOutputfolder(self, path):
        self.__output_folder = path
    
    def getInputfolder(self):
        return self.__input_folder
    
    def getCurrentfolder(self):
        return self.__current_folder

    def getOutputfolder(self):
        return self.__output_folder