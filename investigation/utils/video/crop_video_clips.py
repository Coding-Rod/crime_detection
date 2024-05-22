# This code will crop clips from all videos in a directory and save them to a new directory

import os
import cv2
from tqdm import tqdm

PATH = "/media/rodri/Files/Datasets/Evaluation videos/Merged"
SECONDS = 5

def video_generator(path: str) -> str:
    """ This function will yield all the videos in a directory

    Args:
        path (str): The path to the directory

    Yields:
        str: The filename of the video
    """
    for filename in os.listdir(path):
        if filename.endswith(".mp4"):
            yield filename
            
def crop_video(path: str, filename: str, output_extension: str = 'mp4') -> None:
    """ This function will crop clips from a video and save them to a new directory

    Args:
        path (str): The path to the directory
        filename (str): The filename of the video
        output_extension (str, optional): The extension of the output video. Defaults to 'mp4'.
    """
    video = cv2.VideoCapture(os.path.join(path, filename))
    width = int(video.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(video.get(cv2.CAP_PROP_FPS))//2
    codec = cv2.VideoWriter_fourcc(*'mp4v')
    output_path = os.path.join(path, 'cropped_videos')
    os.makedirs(output_path, exist_ok=True)
    output_filename = os.path.splitext(filename)[0] + '_cropped.' + output_extension
    output_video = cv2.VideoWriter(os.path.join(output_path, output_filename), codec, fps, (width, height))
    for _ in range(fps*SECONDS):
        ret, frame = video.read()
        if not ret:
            break
        output_video.write(frame)
    video.release()
    output_video.release()
    cv2.destroyAllWindows()
    
def main():
    # Total videos is equal to the number of .mp4 files in the directory
    for filename in tqdm(video_generator(PATH), desc='Cropping videos', total=len([name for name in os.listdir(PATH) if name.endswith(".mp4")])):
        crop_video(PATH, filename)
        
if __name__ == '__main__':
    main()