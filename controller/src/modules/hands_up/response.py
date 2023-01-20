from .mediapipe_kps.keypoints import Keypoints as mediapipe_keypoints
import numpy as np

class Response:
    
    def are_hands_up(self,frame):
        if self.keypoint_algorithm == "mediapipe":
            aux = mediapipe_keypoints()
            self.return_keypoints = aux.return_keypoints
        else:
            raise ValueError("Unknown algorithm")
        if self.keypoint_algorithm == "mediapipe":
            return self.results(**self.return_keypoints(frame))
    
    def results(self, center, shoulder, elbow, index):
        if center is None:
            return False
        # print(f"center: {center}")
        # print(f"shoulder left: {shoulder['left']}")
        # print(f"shoulder right: {shoulder['right']}")
        # print(f"elbow left: {elbow['left']}")
        # print(f"elbow right: {elbow['right']}")
        # print(f"index left: {index['left']}")
        # print(f"index right: {index['right']}")
        # x-axis
        shoulder['left'].x = shoulder['left'].x - center.x
        shoulder['right'].x = shoulder['right'].x - center.x
        elbow['left'].x = elbow['left'].x - center.x
        elbow['right'].x = elbow['right'].x - center.x
        index['left'].x = index['left'].x - center.x
        index['right'].x = index['right'].x - center.x

        # y-axis
        shoulder['left'].y = shoulder['left'].y - center.y
        shoulder['right'].y = shoulder['right'].y - center.y
        elbow['left'].y = elbow['left'].y - center.y
        elbow['right'].y = elbow['right'].y - center.y
        index['left'].y = index['left'].y - center.y
        index['right'].y = index['right'].y - center.y

        # center
        center.x, center.y = (0,0)
        
        # print("angles: ("
        #     +str(np.arctan2(
        #         abs((index['left'].x-elbow['left'].x)),
        #             (index['left'].y-elbow['left'].y)
        #     )*(180/np.pi))
        #     +","
        #     +str(np.arctan2(
        #         abs((index['right'].x-elbow['right'].x)),
        #             (index['right'].y-elbow['right'].y)
        #     )*(180/np.pi)
        #     )
        #     +")"   
        # )
        
        return ((
            elbow['left'].angle() < 180 and elbow['right'].angle() < 180 and
            index['left'].angle() < 180 and index['right'].angle() < 180
        )
        and (
            np.arctan2(
                abs((index['left'].x-elbow['left'].x)),
                    (index['left'].y-elbow['left'].y)
            )*(180/np.pi) < 30 and
            np.arctan2(
                abs((index['right'].x-elbow['right'].x)),
                    (index['right'].y-elbow['right'].y)
            )*(180/np.pi) < 30
        ))