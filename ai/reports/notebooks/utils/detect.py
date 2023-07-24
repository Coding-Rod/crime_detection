import numpy as np
import subprocess
from collections import deque
import base64
import json
import cv2

class Detect:
    curl_command = 'curl --silent -d "@-" "http://localhost:9001/weapons-28-jun/4?api_key=7rRyq2IXnl3yEIKk7GCw"'
    momentum_thresholds = 0.85, 0.7
    confidence_thresholds = 0.6, 0.4
    queues = [deque(maxlen=8), deque(maxlen=8)]
    constant = 0.5
        
    def filter_gigant_bounding_boxes(self, bounding_boxes: list, threshold: float = 0.7, image_shape: tuple = (640, 640, 3)) -> list:
        """ This function is used to filter bounding boxes that are too big
        
        Args:
            bounding_boxes (list): List of bounding boxes
            threshold (float, optional): Threshold to filter bounding boxes. Defaults to 0.8.
            image_shape (tuple, optional): Image shape. Defaults to (640, 640, 3).
        Returns:
            list: List of bounding boxes
        """
        try:
            return list(filter(lambda x: x['xmax'] - x['xmin'] < image_shape[0] * threshold and x['ymax'] - x['ymin'] < image_shape[1] * threshold, bounding_boxes))
        except (ValueError, KeyError):
            return bounding_boxes
        
    def filter_confidence(self, class_name: tuple, bounding_boxes: list, thresholds: tuple= (0.8, 0.8)) -> list:
        """ This function is used to filter bounding boxes which confidence is lower than threshold
        
        Args:
            class_name (tuple): Class name, could be Gun or Knife
            bounding_boxes (list): List of bounding boxes
            threshold (tuple, optional): Thresholds to filter bounding boxes. Defaults to (0.8, 0.8).
        
        Returns:
            list: List of bounding boxes
        """
        try:
            return list(filter(lambda x: x['confidence'] >= thresholds[class_name.index(x['class'])], bounding_boxes))
        except (ValueError, KeyError):
            return bounding_boxes
    
    def momentum(self, class_name: int, confidence: float, threshold: float, queue: deque, constant: float = 0.9, verbose: bool = False) -> tuple:
        """ Momentum is a measure of how many frames in a row a given class has been, it considers a queue of the last 10 frames and returns the most frequent class in the queue, consudering a pondered sum of the last 10 frames. Each frame has a weight of a constant value between 0 and 1, where the first frame has the lowest weight confidense multiplied by the constant power to n, where n is the frame index, and the last frame has the highest weight confidense multiplied by the constant power to 0.

        Args:
            class_name (int): Class name, could be 0 or 1, where 0 is no class and 1 is class.
            confidence (float): Confidence of the class, between 0 and 1.

        Returns:
            int: Class name, could be 0 or 1, where 0 is no class and 1 is class.
        """
        momentum = 0
        queue.append((class_name, confidence))
        
        for i,j in enumerate(queue):
            momentum += j[0] * (j[1] * constant ** i)

        if verbose:
            print("Queue: ", queue, end=" ")
            print("Momentum: ", momentum, end=" ")

        return momentum >= threshold, queue
    
    def detection(self, frame: np.ndarray, show: bool=False) -> tuple:
        """ This function is used to detect weapons in a frame

        Args:
            frame (np.ndarray): The frame to be processed
            show (bool, optional): Show the frame with bounding boxes. Defaults to False.

        Returns:
            tuple: Return two values: A boolean value that determines if detection is correct and a list of bounding boxes detected in the last frame
        """
        predictions = None

        if show:
            cv2.imshow("Frame", frame)
            cv2.waitKey(1)

        # Convert the frame to base64
        _, img_encoded = cv2.imencode(".jpg", frame)
        base64_data = base64.b64encode(img_encoded).decode("utf-8")

        # Run the curl command and pass the base64 data as input
        process = subprocess.Popen(self.curl_command, stdin=subprocess.PIPE, stdout=subprocess.PIPE, shell=True)
        stdout, _ = process.communicate(input=base64_data.encode('utf-8'))

        # Decode the response
        response = stdout.decode('utf-8')

        try:        
            # Getting predictions
            bounding_boxes_text = response.split('predictions": ')[1].split('],')[0] + ']'
            
            # Converting to list
            bounding_boxes = json.loads(bounding_boxes_text)
            
            # Filter gigant bounding boxes
            bounding_boxes = self.filter_gigant_bounding_boxes(bounding_boxes)
            
            # Filter confidence
            bounding_boxes = self.filter_confidence(('Gun', 'Knife'), bounding_boxes, self.confidence_thresholds)
            
            bounding_boxes = bounding_boxes or [{'class': None, 'confidence': 0}]
            
            # Check momentums
            for i, threshold in enumerate(self.momentum_thresholds):
                for bounding_box in bounding_boxes:
                    class_name = bounding_box['class']
                    confidence = bounding_box['confidence']
                    momentum_result, self.queues[i] = self.momentum(1 if class_name else 0, float(confidence), float(threshold), self.queues[i], self.constant, verbose=False)
                    
                    # print("Class: ", class_name, end=' ')
                    # print("Momentum: ", momentum_result)
                    
                    if momentum_result:
                        # print("Weapon detected")
                        self.queues[0].clear()
                        self.queues[1].clear()
                        return True, bounding_boxes
                else:
                    return False, bounding_boxes
            
            
        except IndexError:
            return False, []
        finally:
            # if predictions:
            #     print("Response: ", response)
            #     print("Bounding boxes: ", bounding_boxes)
            if show:
                cv2.destroyAllWindows()