import os
import glob
import json
import re
def atoi(text):
    return int(text) if text.isdigit() else text
def natural_keys(text):
    return [ atoi(c) for c in re.split('(\d+)',text) ]
class Tmp_script:
    def __init__(self, dir_path):
        self.__dir_path = dir_path
        self.__checkpoints = glob.glob(os.path.join(dir_path,"*.json"))
        self.__checkpoints.sort(key=natural_keys)
        self.__current_checkpoint = os.path.join(self.__dir_path,f"checkpoint{(len(self.__checkpoints)+1)}.json")

    def create_checkpoint(self, attributes):
        with open(self.__current_checkpoint, 'w') as f:
            f.write(json.dumps(attributes, indent = 4))
        print("checkpoint created successfully")
    
    def load_checkpoint(self, index):
        with open(self.__checkpoints[index], 'r') as f:
            print(index)
            print(self.__checkpoints[index])
            return json.load(f)
    
    def save_checkpoint(self, attributes, index):
        try:
            with open(self.__checkpoints[index], 'w') as f:
                f.write(json.dumps(attributes, indent = 4))
            return "Saved"
        except Exception as e:
            return e
    
    def getCheckpoints(self):
        return self.__checkpoints
    
    def getDirpath(self):
        return self.__dir_path
    
    def setCheckpointFile(self, filename):
        self.__current_checkpoint = filename