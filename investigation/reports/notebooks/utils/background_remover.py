import cv2
import time
import numpy as np

class BackgroundRemover:
    learning_time = 5
    threshold = 30
    def __init__(self):
        self.start_time = time.time()
        self.static_background = None
        self.process_background = None

    def learn_background(self, frame, stop_learning=False):
        if self.static_background is None:
            self.static_background = frame.copy().astype(float)

        if self.process_background is None:
            self.process_background = frame.copy().astype(float)
    
        if not stop_learning:
            alpha = 0.1  # Smoothing factor, this control the speed of learning
            cv2.accumulateWeighted(frame, self.process_background, alpha)
        else:
            self.process_background = frame.copy().astype(float)

    def set_static_background(self):
        self.static_background = self.process_background.copy().astype(float)

    def remove_background(self, frame):
        background = self.static_background.astype(dtype=np.uint8)
        diff = cv2.absdiff(frame, background)
        b, g, r = cv2.split(diff)
        _, b_mask = cv2.threshold(b, self.threshold, 255, cv2.THRESH_BINARY)
        _, g_mask = cv2.threshold(g, self.threshold, 255, cv2.THRESH_BINARY)
        _, r_mask = cv2.threshold(r, self.threshold, 255, cv2.THRESH_BINARY)
        mask = cv2.bitwise_or(cv2.bitwise_or(b_mask, g_mask), r_mask)
        result = cv2.bitwise_and(frame, frame, mask=mask)
        
        def change_black_to_white(img):
            img[np.where((img == [0,0,0]).all(axis=2))] = [255,255,255]
            return img
        
        return change_black_to_white(result)

if __name__ == "__main__":
    cap = cv2.VideoCapture('http://...')
    background_remover = BackgroundRemover()

    while True:
        ret, frame = cap.read()
        
        if ret:
            cv2.imshow('Original', frame)
            # if time.time() - background_remover.start_time <= background_remover.learning_time:
            #     print("Learning...")
            #     background_remover.learn_background(frame)
            #     continue
            # elif background_remover.static_background is None:
            #     background_remover.set_static_background()
            #     print("Static background set")
            #     print(f"Background learned in {time.time() - background_remover.start_time} seconds")

            # result_frame = background_remover.remove_background(frame)
            # cv2.imshow('Background Removal', result_frame)

        if cv2.waitKey(1) == 27:  # ESC key
            break
        else:
            break

    cap.release()
    cv2.destroyAllWindows()