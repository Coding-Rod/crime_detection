import fiftyone.zoo as foz

# Specify the classes you want to download
classes = ["person", "fork", "remote", "cell phone", "book", "toothbrush"]

# Download COCO dataset with specific classes
dataset = foz.load_zoo_dataset("coco-2017", classes=classes)
