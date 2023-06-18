import cv2
import numpy as np
from dotenv import load_dotenv
import os

class Parameters:
    # This class will contain all setters and getters for the parameters
    
    def set_desired_width(self, value):
        self.desired_width = value # Min: 0, Max: 1000
        
    def set_desired_height(self, value):
        self.desired_height = value # Min: 0, Max: 1000
        
    def set_clip_limit(self, value):
        self.clip_limit = value/100 # Min: 0, Max: 1
        
    def set_tile_grid_size_width(self, value):
        self.tile_grid_size_width = value # Min: 0, Max: 128
    
    def set_tile_grid_size_height(self, value):
        self.tile_grid_size_height = value # Min: 0, Max: 128
        
    def set_canny_threshold1(self, value):
        self.canny_threshold1 = value # Min: 0, Max: 255
        
    def set_canny_threshold2(self, value):
        self.canny_threshold2 = value # Min: 0, Max: 255
        
    def set_blue_color(self, value):
        self.color = (value, self.color[1], self.color[2])
        
    def set_green_color(self, value):
        self.color = (self.color[0], value, self.color[2])
        
    def set_red_color(self, value):
        self.color = (self.color[0], self.color[1], value)
        
    def set_lines_threshold(self, value):
        self.lines_threshold = value
        
    def set_lines_min_line_length(self, value):
        self.lines_min_line_length = value
        
    def set_lines_max_line_gap(self, value):
        self.lines_max_line_gap = value

class EdgePreprocessor(Parameters):
    load_dotenv()
    desired_width = int(os.getenv("DESIRED_WIDTH"))
    desired_height = int(os.getenv("DESIRED_HEIGHT"))
    clip_limit = float(os.getenv("CLIP_LIMIT"))
    tile_grid_size = tuple(map(int, os.getenv("TILE_GRID_SIZE").split(",")))
    canny_threshold1, canny_threshold2 = tuple(map(int, os.getenv("CANNY_THRESHOLD").split(",")))
    color = tuple(map(int, os.getenv("COLOR").split(",")))
    lines_threshold, lines_min_line_length, lines_max_line_gap = tuple(map(int, os.getenv("LINES").split(",")))

    def resize_image(self, image):
        return cv2.resize(image, (self.desired_width, self.desired_height))

    def convert_to_grayscale(self, image):
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    def perform_histogram_equalization(self, image):
        return cv2.equalizeHist(image)

    def apply_gaussian_blur(self, image):
        return cv2.GaussianBlur(image, (5, 5), 0)

    def apply_clahe(self, image):
        clahe = cv2.createCLAHE(clipLimit=self.clip_limit, tileGridSize=self.tile_grid_size)
        return clahe.apply(image)

    def normalize_image(self, image):
        return image / 255.0

    def detect_edges(self, image):
        edges = cv2.Canny(image, self.canny_threshold1, self.canny_threshold2)
        return edges

    def merge_with_original(self, original, edges):
        merged_image = cv2.bitwise_or(original, cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR))
        return merged_image

    def invert_image(self, image):
        return cv2.bitwise_not(image)

    def detect_lines(self, image):
        lines = cv2.HoughLinesP(
                    image, # Input edge image
                    1, # Distance resolution in pixels
                    np.pi/180, # Angle resolution in radians
                    threshold=self.lines_threshold, # Min number of votes for valid line
                    minLineLength=self.lines_min_line_length, # Min allowed length of line
                    maxLineGap=self.lines_max_line_gap # Max allowed gap between line for joining them
                    )
        
        # Iterate over points
        try:
            for points in lines:
                # Extracted points nested in the list
                x1,y1,x2,y2=points[0]
                # Draw the lines joing the points
                # On the original image
                cv2.line(image,(x1,y1),(x2,y2),(255,255,255),2)
        except TypeError:
            pass
            
        return image

    def dilate_image(self, image):
        return cv2.dilate(image, np.ones((2, 2), np.uint8), iterations=1)
    
    def pipeline(self, img, *args):
        self.edges = img

        for preprocessing_method in args:
            self.edges = preprocessing_method(self.edges)

        return self.get_preprocessed_image(img) + self.change_edges_color()

    def get_edges(self):
        return self.edges
    
    def get_preprocessed_image(self, image):
        """ Returns the preprocessed image with the original image, multiplying both images

        Args:
            image (np.ndarray): The original image (RGB) to be merged with the preprocessed image (grayscale)

        Raises:
            IOError: If the image is not in RGB format
        """
        if image.shape[2] != 3:
            raise IOError("The image must be in RGB format")

        edges = self.get_edges()
        # print(edges)
        # Use edges as mask to multiply the original image
        return cv2.bitwise_and(self.resize_image(image), cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB))

    def change_edges_color(self):
        """ Changes the color of the edges

        Args:
            color (tuple): The color to be applied to the edges 
        """
        edges = self.get_edges() # binary image
        # Convert the binary image to RGB
        bw_rgb = cv2.cvtColor(edges, cv2.COLOR_GRAY2RGB)
        
        # Invert the color of the edges
        bw = cv2.bitwise_not(bw_rgb)
        
        # Apply the color to the edges        
        return np.where(bw == (255, 255, 255), self.color, bw).astype(np.uint8)

if __name__ == '__main__':
    preprocessor = EdgePreprocessor()

    cv2.namedWindow("Calibration")

    # Create trackbars for every attribute
    cv2.createTrackbar("Desired Width", "Calibration", preprocessor.desired_width, 1000, preprocessor.set_desired_width)
    cv2.createTrackbar("Desired Height", "Calibration", preprocessor.desired_height, 1000, preprocessor.set_desired_height)
    cv2.createTrackbar("Clip Limit", "Calibration", int(preprocessor.clip_limit * 100), 1000, preprocessor.set_clip_limit)
    cv2.createTrackbar("Tile Grid Size Width", "Calibration", preprocessor.tile_grid_size[0], 128, preprocessor.set_tile_grid_size_width)
    cv2.createTrackbar("Tile Grid Size Height", "Calibration", preprocessor.tile_grid_size[1], 128, preprocessor.set_tile_grid_size_height)
    cv2.createTrackbar("Canny Threshold 1", "Calibration", preprocessor.canny_threshold1, 255, preprocessor.set_canny_threshold1)
    cv2.createTrackbar("Canny Threshold 2", "Calibration", preprocessor.canny_threshold2, 255, preprocessor.set_canny_threshold2)
    cv2.createTrackbar("Color Red Channel", "Calibration", preprocessor.color[0], 255, preprocessor.set_red_color)
    cv2.createTrackbar("Color Green Channel", "Calibration", preprocessor.color[1], 255, preprocessor.set_green_color)
    cv2.createTrackbar("Color Blue Channel", "Calibration", preprocessor.color[2], 255, preprocessor.set_blue_color)
    cv2.createTrackbar("Lines Threshold", "Calibration", preprocessor.lines_threshold, 255, preprocessor.set_lines_threshold)
    cv2.createTrackbar("Lines Min Line Length", "Calibration", preprocessor.lines_min_line_length, 255, preprocessor.set_lines_min_line_length)
    cv2.createTrackbar("Lines Max Line Gap", "Calibration", preprocessor.lines_max_line_gap, 255, preprocessor.set_lines_max_line_gap)
    
    cv2.imshow("Calibration", np.zeros((1, 512, 3), np.uint8))
    
    cap = cv2.VideoCapture(0)

    # Check if the webcam is opened correctly
    if not cap.isOpened():
        raise IOError("Cannot open webcam")

    while True:
        ret, frame = cap.read()
        
        cv2.imshow('Input', frame)

        result = preprocessor.pipeline(frame,
            preprocessor.resize_image,
            # preprocessor.apply_high_pass_filter,
            preprocessor.convert_to_grayscale,
            preprocessor.apply_clahe,
            # preprocessor.perform_histogram_equalization,
            preprocessor.detect_edges,
            preprocessor.detect_lines,
            preprocessor.dilate_image,
            preprocessor.invert_image,
        )
        # Inverted edges
        cv2.imshow('Edges', cv2.bitwise_not(preprocessor.get_edges()))
        
        # result = preprocessor.get_preprocessed_image_with_original(frame)
        cv2.imshow('Result', result)
        
        c = cv2.waitKey(1)
        if c == 27: # ESC
            break

    cap.release()
    cv2.destroyAllWindows()