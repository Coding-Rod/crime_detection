import os
import cv2

# Path to the folder containing the videos
video_folder = "videos"
output_folder = "output"

# Create output folder if it doesn't exist
os.makedirs(output_folder, exist_ok=True)

# Frame extraction parameters
frame_width = 224
frame_height = 224
num_frames = 30
every_n_frame = 2
output_fps = 15  # Frames per second for the output video

def extract_and_create_video(video_path, output_video_path, num_frames=30, every_n_frame=2):
    """Extract every nth frame from a video and write them into a new .mp4 file."""
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    extracted_frame_count = 0
    
    # Get the original frame rate of the video (we use it to write the output video)
    original_fps = cap.get(cv2.CAP_PROP_FPS)
    
    # Create a VideoWriter object to write the output video in the same format as the input
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_video_path, fourcc, output_fps, (frame_width, frame_height))

    while extracted_frame_count < num_frames:
        ret, frame = cap.read()
        if not ret:
            break

        # Only process every nth frame
        if frame_count % every_n_frame == 0:
            # Resize the frame to the target size
            resized_frame = cv2.resize(frame, (frame_width, frame_height))
            # Write the resized frame to the output video
            out.write(resized_frame)
            extracted_frame_count += 1

        frame_count += 1

    # Release the video capture and writer objects
    cap.release()
    out.release()

# Process all videos in the folder
for video_file in os.listdir(video_folder):
    if video_file.endswith(".mp4"):  # Process only MP4 files
        video_path = os.path.join(video_folder, video_file)
        video_name = os.path.splitext(video_file)[0]

        # Create output file path for the resulting .mp4 video
        output_video_path = os.path.join(output_folder, f"{video_name}_processed.mp4")
        
        # Extract frames and create a new video
        extract_and_create_video(video_path, output_video_path, num_frames=num_frames, every_n_frame=every_n_frame)
        print(f"Processed {video_file} and saved to {output_video_path}")

print("Video processing completed.")
