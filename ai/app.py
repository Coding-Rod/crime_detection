from flask import Flask, request, jsonify, send_file, after_this_request
import os
import cv2
import glob
import shutil
import time

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/upload/<folder_name>', methods=['POST'])
def upload_image(folder_name):
    # Create a folder for the specific path parameter if it doesn't exist
    folder_path = os.path.join(UPLOAD_FOLDER, folder_name)
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    
    # Check if the post request has the file part
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400
    
    file = request.files['file']
    
    # If the user does not select a file, the browser submits an empty file without a filename
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    # Save the file to the specified folder
    if file:
        # Generate the file name based on the number of existing images in the folder
        image_files = sorted(glob.glob(os.path.join(folder_path, '*.png')))
        file_number = len(image_files) + 1
        file_name = f'img{file_number}.png'
        
        file_path = os.path.join(folder_path, file_name)
        file.save(file_path)
        
        return jsonify({'message': 'File successfully uploaded'}), 200
@app.route('/convert_to_video/<folder_name>', methods=['GET'])
def convert_to_video(folder_name):
    folder_path = os.path.join(UPLOAD_FOLDER, folder_name)
    
    if not os.path.exists(folder_path):
        return jsonify({'error': 'Folder not found'}), 404

    # Collect all images from the folder
    image_files = sorted(glob.glob(os.path.join(folder_path, '*.png')))
    if not image_files:
        return jsonify({'error': 'No images found in the folder'}), 400

    # Read the first image to get the size
    first_image = cv2.imread(image_files[0])
    height, width, _ = first_image.shape
    video_path = os.path.join(folder_path, 'output_video.mp4')

    # Define the codec and create VideoWriter object
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video = cv2.VideoWriter(video_path, fourcc, 30.0, (width, height))

    for image_file in image_files:
        print(image_file)
        img = cv2.imread(image_file)
        
        # resize the image to the size of the first image
        img = cv2.resize(img, (width, height))
        
        for _ in range(15):  # Display each image for 15 frames (0.5 seconds)
            video.write(img)
    
    video.release()

    # Send the video file as a response
    @after_this_request
    def _(response):
        shutil.rmtree(folder_path)
        return response

    return send_file(video_path, as_attachment=True)
