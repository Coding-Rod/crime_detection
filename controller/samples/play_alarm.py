import sys
from PyQt5.QtCore import Qt, QThread
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QLabel, QPushButton
from playsound import playsound
from pathlib import Path

class PlaySoundThread(QThread):
    """Thread to play the alarm sound."""
    
    def __init__(self):
        super().__init__()
        self.is_playing = False
        self.stop_thread = False
        
    def run(self):
        self.is_playing = True
        while not self.stop_thread:
            playsound(f'{Path(__file__).parent}/assets/alarm.mp3')
        self.is_playing = False
        
    def stop(self):
        self.stop_thread = True


class MainWindow(QWidget):
    """Main window of the application."""
    
    def __init__(self):
        super().__init__()
        self.init_ui()
        self.sound_thread = None
        
    def init_ui(self):
        """Initialize the user interface."""
        self.setWindowTitle('Alarm')
        self.setGeometry(100, 100, 300, 200)
        self.setWindowFlags(Qt.WindowStaysOnTopHint)
        
        # Create the label
        self.label = QLabel('Alarm is not active')
        
        # Create the buttons
        self.start_button = QPushButton('Start')
        self.start_button.clicked.connect(self.start_sound)
        self.stop_button = QPushButton('Stop')
        self.stop_button.clicked.connect(self.stop_sound)
        self.stop_button.setEnabled(False)
        
        # Create the layout
        layout = QVBoxLayout()
        layout.addWidget(self.label)
        button_layout = QHBoxLayout()
        button_layout.addWidget(self.start_button)
        button_layout.addWidget(self.stop_button)
        layout.addLayout(button_layout)
        
        # Set the layout
        self.setLayout(layout)
        
    def start_sound(self):
        """Start the alarm sound."""
        if not self.sound_thread or not self.sound_thread.is_playing:
            self.label.setText('Alarm is active')
            self.start_button.setEnabled(False)
            self.stop_button.setEnabled(True)
            self.sound_thread = PlaySoundThread()
            self.sound_thread.start()
        
    def stop_sound(self):
        """Stop the alarm sound."""
        if self.sound_thread and self.sound_thread.is_playing:
            self.label.setText('Alarm is not active')
            self.start_button.setEnabled(True)
            self.stop_button.setEnabled(False)
            self.sound_thread.stop()
            self.sound_thread = None

        
if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())

