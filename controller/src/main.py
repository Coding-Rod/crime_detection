# Imports 
from modules.controllers import Controllers
from modules.auth import Auth
from modules.hands_up import HandsUp
import cv2
import os

class Main(Auth, Controllers, HandsUp):
    def __init__(self):
        self.detect_algorithm = "yolo"
        self.keypoint_algorithm = "mediapipe"
        self.process = 1
        self.time_sleep = 5
        self.sunset_time = (18,0,0)
        self.sunrise_time = (6,0,0)
        self.vid = cv2.VideoCapture(1)
        self.auth = None

    def process1(self):
        ret, frame = self.vid.read()
  
        # Display the resulting frame
        # cv2.imshow('frame', frame)
        print(self.are_hands_up(frame))
        
        # Getting bounding boxes
        # detections = self.detect(frame) # None or {'label': 'person', 'confidence': 0.9, 'bounding_box': (x,y,w,h)}
        
        # # Filtering bounding boxes of weapons
        # weapons_detected = bool(len([detections for detections in detections if detections['label'] != 'person']))
        
        # # Filtering bounding boxes of people
        # people = [detections['bounding_box'] for detections in detections if detections['label'] == 'person']
        
        # # Detecting hands_up
        # if people:
        #     hnds_up = all((main.are_hands_up(detection) for detection in people))
        
        # # Detecting screams
        # scr = main.scream()
    
        # if weapons_detected or hnds_up or scr:
        #     # TODO: Post HTTP request to server
        #     # TODO: time.sleep(5)
        #     pass
            
    def process2(self):
        ret, frame = self.vid.read()
        
        # people = self.detect_people(frame)
        
        # if people:
        #     # TODO: Post HTTP request to server
        #     # TODO: time.sleep(5)
        #     pass                
        
    def get_process(self):
        # FIXME: Use controllers instead of this
        self.process = int(input("Enter process number: "))

    def __del__(self):
        self.vid.release()
        cv2.destroyAllWindows()
        print("Program finished")
        os._exit(0)
if __name__ == '__main__':
    main = Main()
    # TODO: Implement keyboard interrupt
    while True:
        if not main.auth:
            main.auth = main.get_password()
        else:
            # TODO: Get process with Matrix Keyboard
            if main.process == 1 and main.pir_state:
                main.process1()
            elif main.process == 2 and main.pir_state:
                main.process2()
            else:
                main.get_process()
            
            if (sum(main.get_time()) >= sum(main.sunset_time) or sum(main.get_time()) <= sum(main.sunrise_time)):
                main.turn_on()
            else:
                main.turn_off()
                
            if cv2.waitKey(1) & 0xFF == ord('q'):
                print("Broken")
                break
        
    del main