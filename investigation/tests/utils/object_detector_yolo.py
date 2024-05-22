import cv2
import torch
import numpy as np
from yolov5.models.experimental import attempt_load
from yolov5.utils.general import non_max_suppression, scale_coords
from yolov5.utils.torch_utils import select_device

def detect_objects(image, weights, device='cpu', conf_threshold=0.5):
    # Load the YOLOv5 model
    model = attempt_load(weights, map_location=device)

    # Set the model to evaluation mode
    model.eval()

    # Convert the image to a numpy array
    img = np.array(image)

    # Convert the image from BGR to RGB
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

    # Resize the image to the input size of the model
    img = cv2.resize(img, (640, 640))

    # Convert the image to a PyTorch tensor
    img = torch.from_numpy(img).to(device).float()

    # Normalize the image
    img /= 255.0

    # Add a batch dimension to the image
    img = img.unsqueeze(0)

    # Run the image through the YOLOv5 model
    with torch.no_grad():
        outputs = model(img)

    # Get the detections from the model outputs
    detections = non_max_suppression(outputs, conf_threshold)

    # Draw the bounding boxes on the image
    if detections[0] is not None:
        detections[0][:, :4] = scale_coords(img.shape[2:], detections[0][:, :4], image.shape).round()

        for x1, y1, x2, y2, conf, cls in detections[0]:
            label = f'{model.names[int(cls)]} {conf:.2f}'
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 1)

    return image

if __name__ == '__main__':
    # Load the input image
    image = cv2.imread('/home/rodri/Documents/Weapon_detection/ai/tests/sample.jpg')

    # Call the detect_objects function to detect objects in the image
    result = detect_objects(image, '/home/rodri/Documents/Weapon_detection/ai/models/YoloV5_150_epochs.pt', device='cpu', conf_threshold=0.5)

    # Display the result image
    cv2.imshow('Result', result)
    cv2.waitKey(0)
    cv2.destroyAllWindows()