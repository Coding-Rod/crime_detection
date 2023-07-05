import cv2
import numpy as np
import yaml
from image_preprocessing import ImagePreprocessor

places = {
    "inside cidimec": "/media/rodri/Files/Datasets/Evaluation videos/Images/Result/I_CIDIMEC.jpg",
    "outside cidimec": "/media/rodri/Files/Datasets/Evaluation videos/Images/Result/O_CIDIMEC.jpg",
    "inside house": "/media/rodri/Files/Datasets/Evaluation videos/Images/Result/I_House.jpg",
    "outside house": "/media/rodri/Files/Datasets/Evaluation videos/Images/Result/O_House.jpg",
}


with open("config.yml", 'r') as ymlfile:
    cfg = yaml.safe_load(ymlfile)
    
if __name__ == '__main__':
    key = list(places.keys())[int(input("Choose a place to calibrate: \n" + "\n".join([f"{i+1}: {k}" for i, k in enumerate(places.keys())]) + "\nSelect a number: "))-1] 
    image_path = places[key]
    
    imagePreprocessor = ImagePreprocessor(cfg)
    
    cv2.namedWindow("Calibration")

    # Create trackbars for every attribute
    cv2.createTrackbar("Desired Width", "Calibration", imagePreprocessor.desired_width, 1000, imagePreprocessor.set_desired_width)
    cv2.createTrackbar("Desired Height", "Calibration", imagePreprocessor.desired_height, 1000, imagePreprocessor.set_desired_height)
    cv2.createTrackbar("Alpha", "Calibration", int(imagePreprocessor.alpha * 100), 255, imagePreprocessor.set_alpha)
    cv2.createTrackbar("Beta", "Calibration", int(imagePreprocessor.beta), 127, imagePreprocessor.set_beta)
    
    cv2.imshow("Calibration", np.zeros((1, 500, 3), np.uint8))
    
    frame = cv2.imread(image_path)

    while True:
        
        
        cv2.imshow('Input', frame)

        image = imagePreprocessor.pipeline(frame,
            imagePreprocessor.resize_image,
            imagePreprocessor.change_contrast_and_brightness,
        )
        
        cv2.imshow('Preprocessed', image)
        c = cv2.waitKey(1)
        if c == 27: # ESC
            break

    cv2.destroyAllWindows()
    
    cfg = imagePreprocessor.get_params()
    # Save changes into existing configuration file .yaml
    with open('config/'+key+'.yml', 'w') as f:
        yaml.dump(cfg, f)
        print("Changes saved into config/"+key+".yml file")
