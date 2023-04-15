from roboflow import Roboflow

rf = Roboflow(api_key="wSbYaczzLzELee2lx4ed")
project = rf.workspace("crime-detection-zbmr9").project("knifes-and-guns")
model = project.version(6).model

# infer on a local image
print(model.predict("sample.jpg", confidence=40, overlap=30).json())

# visualize your prediction
# model.predict("your_image.jpg", confidence=40, overlap=30).save("prediction.jpg")

# infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True, confidence=40, overlap=30).json())