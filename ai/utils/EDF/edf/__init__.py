#TODO: Move files
from PyQt5 import QtCore, QtGui, QtWidgets
import sys
import os
import glob
from operator import itemgetter

from .os_script import Os_script as osp
from .tmp_script import Tmp_script as tsp

from PyQt5 import QtCore, QtGui, QtWidgets
class EDF:    
    def __init__(self,
                 input_folder='data', 
                 output_folder='public',
                 current_folder=os.path.join(os.path.dirname(os.path.realpath(__file__)),'..'),
                 checkpoint_directory=None,
                 image_extension="jpg"):
        # Current directory for the checkpoint_directory
        input_folder = os.path.join(current_folder,input_folder)
        output_folder = os.path.join(current_folder,output_folder)
        checkpoint_directory = os.path.join(current_folder,'tmp') if checkpoint_directory is None else checkpoint_directory
        # PyQt5
        self.app = QtWidgets.QApplication(sys.argv)
        self.main_window = QtWidgets.QMainWindow()
        self.main_window.show()
        
        # Imports
        self.osp = osp(input_folder=input_folder, output_folder=output_folder, current_folder=current_folder)
        self.tsp = tsp(checkpoint_directory)
        
        # Variables
        self.files = glob.glob(os.path.join(self.osp.getInputfolder(),f"*.{image_extension}"))
        self.files_moved = []
        self.files_discarted = []
        self.image_extension = image_extension

        # Routes
        self.current_folder = current_folder
        self.input_folder = input_folder
        self.output_folder = output_folder
        self.checkpoint_index = len(self.tsp.getCheckpoints())-1

        # State variables
        self.image_index = 0
        self.image = self.files[self.image_index]
        self.xml_exists = False
        
        # Style
        self.styles = {}
        for filename in glob.glob(os.path.join(self.current_folder, "edf", "style", "*.css")):
            with open(filename) as f:
                lines = f.readlines()
            self.styles[filename.split('/')[-1].split('.')[0]] = "".join(lines)
        # SetupUi
        self.tsp.create_checkpoint({
            "current_folder": self.current_folder,
            "input_folder": self.input_folder,
            "output_folder": self.output_folder,
            "files": self.files,
            "files_moved": self.files_moved,
            "files_discarted": self.files_discarted
        })
        self.setupUi()
        sys.exit(self.app.exec_())
    
    
    def setupUi(self):
        self.main_window.setObjectName("self.MainWindow")
        self.main_window.resize(640, 480)
        
        self.centralwidget = QtWidgets.QWidget(self.main_window)
        self.centralwidget.setObjectName("centralwidget")
        
        self.backButton = QtWidgets.QPushButton(self.centralwidget)
        self.backButton.setGeometry(QtCore.QRect(30, 60, 30, 180))
        self.backButton.setObjectName("backButton")
        self.backButton.clicked.connect(self.prevImage)
        self.backButton.setStyleSheet(self.styles["move_button"])

        self.imageButton = QtWidgets.QPushButton(self.centralwidget)
        self.imageButton.setGeometry(QtCore.QRect(60, 60, 250, 150))
        self.imageButton.setObjectName("imageButton")
        self.imageButton.setIconSize(QtCore.QSize(250, 180))
        self.imageButton.setStyleSheet(self.styles["image"])

        self.xml_badge = QtWidgets.QLabel(self.centralwidget)
        self.xml_badge.setObjectName("xml_badge")
        self.xml_badge.setText("xml")
        self.xml_badge.setGeometry(QtCore.QRect(260, 65, 35, 20))
        self.xml_badge.setStyleSheet(self.styles["xml_badge"])
        self.xml_badge.setGraphicsEffect(QtWidgets.QGraphicsDropShadowEffect(blurRadius=5, xOffset=3, yOffset=3))

        self.nextButton = QtWidgets.QPushButton(self.centralwidget)
        self.nextButton.setGeometry(QtCore.QRect(310, 60, 30, 180))
        self.nextButton.setObjectName("nextButton")
        self.nextButton.clicked.connect(self.nextImage)
        self.nextButton.setStyleSheet(self.styles["move_button"])
        
        self.rejectButton = QtWidgets.QPushButton(self.centralwidget)
        self.rejectButton.setGeometry(QtCore.QRect(60, 210, 121, 31))
        self.rejectButton.setObjectName("rejectButton")
        self.rejectButton.clicked.connect(self.rejectImage)
        self.rejectButton.setStyleSheet(self.styles["reject_button"])
        
        self.acceptButton = QtWidgets.QPushButton(self.centralwidget)
        self.acceptButton.setGeometry(QtCore.QRect(180, 210, 131, 31))
        self.acceptButton.setObjectName("acceptButton")
        self.acceptButton.clicked.connect(self.acceptImage)
        self.acceptButton.setStyleSheet(self.styles["accept_button"])
        
        self.pwd_lbl = QtWidgets.QLabel(self.centralwidget)
        self.pwd_lbl.setGeometry(QtCore.QRect(40, 310, 291, 17))
        self.pwd_lbl.setObjectName("pwd_lbl")
        
        self.card_1 = QtWidgets.QLabel(self.centralwidget)
        self.card_1.setGeometry(QtCore.QRect(380, 60, 201, 141))
        self.card_1.setObjectName("card_1")
        self.card_1.setStyleSheet(self.styles["card"])
        self.card_1.setGraphicsEffect(QtWidgets.QGraphicsDropShadowEffect(blurRadius=5, xOffset=3, yOffset=3))
        
        self.card_2 = QtWidgets.QLabel(self.centralwidget)
        self.card_2.setGeometry(QtCore.QRect(380, 210, 211, 151))
        self.card_2.setObjectName("card_2")
        self.card_2.setStyleSheet(self.styles["card"])
        self.card_2.setGraphicsEffect(QtWidgets.QGraphicsDropShadowEffect(blurRadius=5, xOffset=3, yOffset=3))
        
        self.in_lbl = QtWidgets.QLabel(self.centralwidget)
        self.in_lbl.setGeometry(QtCore.QRect(40, 350, 111, 17))
        self.in_lbl.setObjectName("in_lbl")
        
        self.out_lbl = QtWidgets.QLabel(self.centralwidget)
        self.out_lbl.setGeometry(QtCore.QRect(40, 380, 111, 17))
        self.out_lbl.setObjectName("out_lbl")
        
        self.tmp_lbl = QtWidgets.QLabel(self.centralwidget)
        self.tmp_lbl.setGeometry(QtCore.QRect(40, 410, 111, 17))
        self.tmp_lbl.setObjectName("tmp_lbl")
        
        self.lineEdit_input = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_input.setGeometry(QtCore.QRect(160, 350, 211, 20))
        self.lineEdit_input.setObjectName("lineEdit_input")
        
        self.lineEdit_output = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit_output.setGeometry(QtCore.QRect(160, 380, 211, 20))
        self.lineEdit_output.setObjectName("lineEdit_output")
        
        self.checkpoints_dropdown = QtWidgets.QComboBox(self.centralwidget)
        self.checkpoints_dropdown.setGeometry(QtCore.QRect(160, 410, 211, 20))
        self.checkpoints_dropdown.setObjectName("checkpoints_dropdown")
        self.checkpoints_dropdown.addItems([x.split('/')[-1] for x in self.tsp.getCheckpoints()])
        
        self.loadButton = QtWidgets.QPushButton(self.centralwidget)
        self.loadButton.setGeometry(QtCore.QRect(380, 410, 61, 21))
        self.loadButton.setObjectName("pushButton")
        self.loadButton.setStyleSheet(self.styles["load_button"])
        self.loadButton.clicked.connect(lambda: self.load_checkpoint(self.checkpoints_dropdown.currentIndex()))
        
        self.title_lbl = QtWidgets.QLabel(self.centralwidget)
        self.title_lbl.setGeometry(QtCore.QRect(0, 0, 641, 41))
        self.title_lbl.setObjectName("title_lbl")
        self.title_lbl.setStyleSheet(self.styles['title'])
        
        self.main_window.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(self.main_window)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 640, 22))
        self.menubar.setObjectName("menubar")
        
        self.main_window.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(self.main_window)
        self.statusbar.setObjectName("statusbar")
        self.main_window.setStatusBar(self.statusbar)

        self.retranslateUi()
        QtCore.QMetaObject.connectSlotsByName(self.main_window)

    def showDialog(title, message):
        msgBox = QMessageBox()
        msgBox.setIcon(QMessageBox.Warning)
        msgBox.setWindowTitle(title)
        msgBox.setText(message)
        msgBox.setStandardButtons(QMessageBox.Ok)
        msgBox.buttonClicked.connect(msgButtonClick)
        msgBox.exec()
        sys.exit()
    
    def acceptImage(self):
        destination = os.path.join(self.output_folder, self.image.split('/')[-1])
        self.osp.move_file(self.image, destination)
        self.osp.move_xml_file(self.image, destination, self.image_extension)
        self.files_moved.append((self.image, self.osp.has_xml_file(self.image, image_extension='jpg')))
        self.files.remove(self.image)
        self.image_index = 0 if self.image_index == 0 else self.image_index - 1
        self.retranslateUi()      
            
    def rejectImage(self):
        self.files_discarted.append(self.image)
        self.files.remove(self.image)
        self.image_index = 0 if self.image_index == 0 else self.image_index - 1
        self.retranslateUi()      

    def nextImage(self):
        self.image_index = self.image_index + 1
        self.image = self.files[self.image_index]
        self.retranslateUi()
        
    def prevImage(self):
        self.image_index = self.image_index - 1
        self.image = self.files[self.image_index]
        self.retranslateUi()
        
    def load_checkpoint(self, index):
        checkpoint = self.tsp.load_checkpoint(index)
        self.current_folder = checkpoint["current_folder"]
        self.input_folder = checkpoint["input_folder"]
        self.output_folder = checkpoint["output_folder"]
        self.files = checkpoint["files"]
        self.files_moved = checkpoint["files_moved"]
        self.files_discarted = checkpoint["files_discarted"]
        self.checkpoint_index = index
        self.retranslateUi()

    def retranslateUi(self):
        _translate = QtCore.QCoreApplication.translate
        try:
            self.image = self.files[self.image_index]
        except IndexError:
            showDialog("ERROR 404", "Image not found")
        self.xml_exists = self.osp.has_xml_file(path=self.image, image_extension=self.image_extension)
        self.xml_badge.setStyleSheet("QLabel {background-color: "+('green;' if self.xml_exists else 'red;')+"\nborder: 1px solid black;\ncolor: white;\npadding-left: 3px;\nfont-weight: 700;\nfont-size: 10px;\nborder-radius: 3px;}")
        self.tsp.save_checkpoint({
            "current_folder": self.current_folder,
            "input_folder": self.input_folder,
            "output_folder": self.output_folder,
            "files": self.files,
            "files_moved": self.files_moved,
            "files_discarted": self.files_discarted
        }, self.checkpoint_index)        
        self.main_window.setWindowTitle(_translate("self.MainWindow", "Easy Dataset Filter"))
        self.backButton.setText(_translate("self.MainWindow", "<"))
        self.nextButton.setText(_translate("self.MainWindow", ">"))
        self.rejectButton.setText(_translate("self.MainWindow", "Reject"))
        self.acceptButton.setText(_translate("self.MainWindow", "Accept"))
        self.pwd_lbl.setText(_translate("self.MainWindow", f"Current folder: {self.osp.getCurrentfolder()}"))
        
        self.card_1.setText(_translate("self.MainWindow", 
        f"File: {self.image_index+1}/{len(self.files)}\n"
        f"\n"
        f"Files moved: {len(self.files_moved)}\n"
        f"\n"
        f"Files discarted: {len(self.files_discarted)}"))
        
        self.card_2.setText(_translate("MainWindow", 
        f"FILES MOVED\n"
        f"\n"
        f"\n"
        f"\n"
        f"With xml: {sum(list(dict(self.files_moved).values()))}\n"
        f"\n"
        f"Without xml: {len(self.files_moved)-sum(list(dict(self.files_moved).values()))}"))
        
        self.in_lbl.setText(_translate("MainWindow", "Input folder:"))
        self.out_lbl.setText(_translate("MainWindow", "Output folder:"))
        self.tmp_lbl.setText(_translate("MainWindow", "Checkpoint file:"))
        self.lineEdit_input.setText(self.input_folder)
        self.lineEdit_output.setText(self.output_folder)
        self.loadButton.setText(_translate("MainWindow", "Load"))
        self.title_lbl.setText(_translate("MainWindow", "Easy Dataset Filter"))
        self.imageButton.setIcon(QtGui.QIcon(self.image))
        self.backButton.setDisabled(self.image_index == 0)
        self.nextButton.setDisabled(self.image_index == len(self.files) - 1)
    