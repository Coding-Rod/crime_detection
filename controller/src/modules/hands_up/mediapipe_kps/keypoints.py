import mediapipe as mp
from statistics import mean
import sys
sys.path.append('..')
from ..point import Point
import cv2
class Keypoints:
    def __init__(self):
        self.mp_pose = mp.solutions.pose
        self.mp_drawing = mp.solutions.drawing_utils 
        self.mp_drawing_styles = mp.solutions.drawing_styles

    def return_keypoints(self, img):
        # Run MediaPipe Pose and draw pose landmarks.
        with self.mp_pose.Pose(static_image_mode=True, min_detection_confidence=0.5, model_complexity=2) as pose:
            # Convert the BGR image to RGB and process it with MediaPipe Pose.
            results = pose.process(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))

            # Print nose landmark.
            image_height, image_width, _ = img.shape

            # print(results)
            # print(image_height, image_width)

            # Setting points
            try:
                center = Point(
                    mean((
                        results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_SHOULDER].x * image_width,
                        results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_SHOULDER].x * image_width
                    )),
                    min(
                        image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_SHOULDER].y * image_height,
                        image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_SHOULDER].y * image_height
                    )
                )
            except AttributeError:
                return {
                    "center": None,
                    "shoulder": None,
                    "elbow": None,
                    "index": None
                }
            shoulder = {
                "left": Point(
                    results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_SHOULDER].x * image_width,
                    image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_SHOULDER].y * image_height
                ),
                "right": Point(
                    results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_SHOULDER].x * image_width,
                    image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_SHOULDER].y * image_height
                )
            }

            elbow = {
                "left": Point(
                    results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_ELBOW].x * image_width,
                    image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_ELBOW].y * image_height
                ),
                "right": Point(
                    results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_ELBOW].x * image_width,
                    image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_ELBOW].y * image_height
                )
            }

            index = {
                "left": Point(
                    results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_INDEX].x * image_width,
                    image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.LEFT_INDEX].y * image_height
                ),
                "right": Point(
                    results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_INDEX].x * image_width,
                    image_height - results.pose_landmarks.landmark[self.mp_pose.PoseLandmark.RIGHT_INDEX].y * image_height
                )
            }

            # Standarizing left and right

            if shoulder['left'].x > shoulder['right'].x:
                shoulder['left'], shoulder['right'] = shoulder['right'], shoulder['left']

            if elbow['left'].x > elbow['right'].x:
                elbow['left'], elbow['right'] = elbow['right'], elbow['left']

            if index['left'].x > index['right'].x:
                index['left'], index['right'] = index['right'], index['left']

            # Printing keypoints before hands_up
            # print(f"center: {center}")
            # print(f"shoulder left: {shoulder['left']}")
            # print(f"shoulder right: {shoulder['right']}")
            # print(f"elbow left: {elbow['left']}")
            # print(f"elbow right: {elbow['right']}")
            # print(f"index left: {index['left']}")
            # print(f"index right: {index['right']}")

            # Verify hands_up
            # # print(f"Hands up? {hands_up(center, shoulder, elbow, index)}")

            # Printing angles

            # print(f"elbow left: {elbow['left'].angle()}")
            # print(f"elbow right: {elbow['right'].angle()}")
            # print(f"index left: {index['left'].angle()}")
            # print(f"index right: {index['right'].angle()}")

            return {
                "center": center,
                "shoulder": shoulder,
                "elbow": elbow,
                "index": index
            }
            # Draw pose landmarks.
            # print(f'Pose landmarks of {image}:')
            # annotated_image = img.copy()
            # self.mp_drawing.draw_landmarks(
            #     annotated_image,
            #     results.pose_landmarks,
            #     self.mp_pose.POSE_CONNECTIONS,
            #     landmark_drawing_spec=self.mp_drawing_styles.get_default_pose_landmarks_style())