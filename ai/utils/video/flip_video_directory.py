# This code will flip all videos in a directory and save them to a new directory

import os
import cv2
from tqdm import tqdm

PATH = "/media/rodri/Files/Datasets/Evaluation videos"

def video_generator(path: str) -> str:
    """ This function will yield all the videos in a directory

    Args:
        path (str): The path to the directory

    Yields:
        str: The filename of the video
    """
    for filename in os.listdir(path):
        if filename.endswith(".webm"):
            yield filename
            
def flip_video(path: str, filename: str, output_extension: str = 'mp4') -> None:
    """ This function will flip a video and save it to a new directory

    Args:
        path (str): The path to the directory
        filename (str): The filename of the video
        output_extension (str, optional): The extension of the output video. Defaults to 'mp4'.
    """
    video = cv2.VideoCapture(os.path.join(path, filename))
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(video.get(cv2.CAP_PROP_FPS))/2
    codec = cv2.VideoWriter_fourcc(*'mp4v')
    output_path = os.path.join(path, 'flipped_videos')
    os.makedirs(output_path, exist_ok=True)
    output_filename = os.path.splitext(filename)[0] + '_flipped.' + output_extension
    output_video = cv2.VideoWriter(os.path.join(output_path, output_filename), codec, fps, (width, height))
    while True:
        ret, frame = video.read()
        if not ret:
            break
        flipped_frame = cv2.flip(frame, 0)
        output_video.write(flipped_frame)
    video.release()
    output_video.release()
    cv2.destroyAllWindows()
    
def main():
    # Total videos is equal to the number of .webm files in the directory
    for filename in tqdm(video_generator(PATH), desc='Flipping videos', total=len([name for name in os.listdir(PATH) if name.endswith(".webm")])):
        flip_video(PATH, filename)
        
if __name__ == '__main__':
    main()
    