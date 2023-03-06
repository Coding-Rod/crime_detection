import numpy as np

from cryptography.fernet import Fernet

from PyQt5.QtCore import Qt, pyqtSlot, QThread
from PyQt5.QtGui import QImage, QPixmap
from PyQt5.QtWidgets import QApplication, QMainWindow, QLabel
from PyQt5 import QtCore, QtGui, QtWidgets

from modules.camera.camera import VideoStream
class VideoPlayer(QMainWindow):
    password = ''
    asterisks = ''
    def __init__(self):
        super().__init__()
        self.MainWindow = QMainWindow()
        self.setWindowTitle("Video Player")
        self.setGeometry(100, 100, 640, 300)

        self.image_label = QLabel(self)
        self.image_label.setGeometry(390, -5, 200, 200)

        # Video stream
        self.video_stream = VideoStream()
        self.video_thread = QThread()
        self.video_stream.moveToThread(self.video_thread)
        self.video_thread.started.connect(self.video_stream.start)
        self.video_stream.frame_signal.connect(self.display_frame)
        self.video_thread.start()
        
        # Window
        self.MainWindow.setObjectName("MainWindow")
        self.MainWindow.resize(650, 280)
        
        # Password
        file = open('./assets/pass.txt', 'rb')
        self.__encrypted_password = file.read()
        file.close()
        
        # Styles
        file = open('./styles/button.css', 'r')
        self.buttonStyle = file.read()
        file.close()
        file = open('./styles/line_edit.css', 'r')
        self.lineEditStyle = file.read()
        file.close()
        file = open('./styles/hyperlink.css', 'r')
        self.hyperlinkStyle = file.read()
        file.close()
        
        # Setup the UI
        self.setupUi()
        
    def concatenatePassword(self, number: str) -> None:
        """ Concatenate the number to the password.

        Args:
            number (str): The number to concatenate to the password.
        """
        if len(self.password) < 4:
            self.password += number
            self.asterisks += '*'
            self.retranslateUi()
            
    def backspace(self) -> None:
        """ Remove the last number from the password."""
        if len(self.password) > 0:
            self.password = self.password[:-1]
            self.asterisks = self.asterisks[:-1]
            self.retranslateUi()
    
    def verifyPassword(self, password: str) -> bool:
        """ Verify the password.

        Args:
            password (str): The password to verify.

        Returns:
            bool: True if the password is correct, False otherwise.
        """
        with open('./assets/key.key', 'rb') as file:
            key = file.read()
            fernet = Fernet(key)
            encrypted_password = fernet.decrypt(self.__encrypted_password)
            return password == encrypted_password.decode()
    
    def validatePassword(self) -> None:
        """ Validate the password shows a warning QMessageBox if the password is wrong."""
        if len(self.password) == 4:
            if self.verifyPassword(self.password):
                # TODO: Implement the rest of the code
                print('Password correct')
            else:
                QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password incorrect')
        else:
            QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password must be 4 numbers')
        self.password = ''
        self.asterisks = ''
        self.retranslateUi()

    def changePassword(self) -> None:
        """ Verify the password with a QInputDialog and change the password if the password is correct.
        Shows a warning QMessageBox if the password is wrong.
        Shows a warning QMessageBox if the password is not 4 numbers.
        Shows a warning QMessageBox if the password is not a number.
        Shows a warning QMessageBox if the passwords do not match.
        """
        text, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Enter the previous password:')
        
        if ok:
            if self.verifyPassword(text):
                text, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Enter the new password:')
                if ok:
                    if text.isdigit():
                        if len(text) == 4:
                            text2, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Confirm the new password:')
                            if ok:
                                if text == text2:
                                    with open('./assets/key.key', 'rb') as file:
                                        key = file.read()
                                        fernet = Fernet(key)
                                        encrypted_password = fernet.encrypt(text.encode())
                                        with open('./assets/pass.txt', 'wb') as file:
                                            file.write(encrypted_password)
                                            QtWidgets.QMessageBox.information(self.MainWindow, 'Success', 'Password changed successfully')
                                        self.__encrypted_password = encrypted_password
                                        self.password = ''
                                else:
                                    QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Passwords do not match')
                        else:
                            QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password must be 4 numbers')
                    else:
                        QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password must be a number')     
            else:
                QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password incorrect')
                
    def setupUi(self):
        self.centralwidget = QtWidgets.QWidget(self.MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        
        self.pushButton1 = QtWidgets.QPushButton(self)
        self.pushButton1.setGeometry(QtCore.QRect(30, 20, 100, 50))
        self.pushButton1.setObjectName("pushButton1")        
        self.pushButton1.clicked.connect(lambda: self.concatenatePassword('1'))
        self.pushButton1.setStyleSheet(self.buttonStyle)
        self.pushButton2 = QtWidgets.QPushButton(self)
        self.pushButton2.setGeometry(QtCore.QRect(140, 20, 100, 50))
        self.pushButton2.setObjectName("pushButton2")
        self.pushButton2.clicked.connect(lambda: self.concatenatePassword('2'))
        self.pushButton2.setStyleSheet(self.buttonStyle)
        self.pushButton3 = QtWidgets.QPushButton(self)
        self.pushButton3.setGeometry(QtCore.QRect(250, 20, 100, 50))
        self.pushButton3.setObjectName("pushButton3")
        self.pushButton3.clicked.connect(lambda: self.concatenatePassword('3'))
        self.pushButton3.setStyleSheet(self.buttonStyle)
        
        self.pushButton4 = QtWidgets.QPushButton(self)
        self.pushButton4.setGeometry(QtCore.QRect(30, 80, 100, 50))
        self.pushButton4.setObjectName("pushButton4")
        self.pushButton4.clicked.connect(lambda: self.concatenatePassword('4'))
        self.pushButton4.setStyleSheet(self.buttonStyle)
        self.pushButton5 = QtWidgets.QPushButton(self)
        self.pushButton5.setGeometry(QtCore.QRect(140, 80, 100, 50))
        self.pushButton5.setObjectName("pushButton5")
        self.pushButton5.clicked.connect(lambda: self.concatenatePassword('5'))
        self.pushButton5.setStyleSheet(self.buttonStyle)
        self.pushButton6 = QtWidgets.QPushButton(self)
        self.pushButton6.setGeometry(QtCore.QRect(250, 80, 100, 50))
        self.pushButton6.setObjectName("pushButton6")
        self.pushButton6.clicked.connect(lambda: self.concatenatePassword('6'))
        self.pushButton6.setStyleSheet(self.buttonStyle)
        
        self.pushButton7 = QtWidgets.QPushButton(self)
        self.pushButton7.setGeometry(QtCore.QRect(30, 140, 100, 50))
        self.pushButton7.setObjectName("pushButton7")
        self.pushButton7.clicked.connect(lambda: self.concatenatePassword('7'))
        self.pushButton7.setStyleSheet(self.buttonStyle)
        self.pushButton8 = QtWidgets.QPushButton(self)
        self.pushButton8.setGeometry(QtCore.QRect(140, 140, 100, 50))
        self.pushButton8.setObjectName("pushButton8")
        self.pushButton8.clicked.connect(lambda: self.concatenatePassword('8'))
        self.pushButton8.setStyleSheet(self.buttonStyle)
        self.pushButton9 = QtWidgets.QPushButton(self)
        self.pushButton9.setGeometry(QtCore.QRect(250, 140, 100, 50))
        self.pushButton9.setObjectName("pushButton9")
        self.pushButton9.clicked.connect(lambda: self.concatenatePassword('9'))
        self.pushButton9.setStyleSheet(self.buttonStyle)
        
        self.pushBackButton = QtWidgets.QPushButton(self)
        self.pushBackButton.setGeometry(QtCore.QRect(30, 200, 100, 50))
        self.pushBackButton.setObjectName("pushBackButton")
        self.pushBackButton.clicked.connect(self.backspace)
        self.pushBackButton.setStyleSheet(self.buttonStyle)
        
        self.pushButton0 = QtWidgets.QPushButton(self)
        self.pushButton0.setGeometry(QtCore.QRect(140, 200, 100, 50))
        self.pushButton0.setObjectName("pushButton0")
        self.pushButton0.clicked.connect(lambda: self.concatenatePassword('0'))
        self.pushButton0.setStyleSheet(self.buttonStyle)
        
        self.pushEnterButton = QtWidgets.QPushButton(self)
        self.pushEnterButton.setGeometry(QtCore.QRect(250, 200, 100, 50))
        self.pushEnterButton.setObjectName("pushEnterButton")
        self.pushEnterButton.clicked.connect(self.validatePassword)
        self.pushEnterButton.setStyleSheet(self.buttonStyle)
        
        self.pushhangePasswordButton = QtWidgets.QPushButton(self)
        self.pushhangePasswordButton.setGeometry(QtCore.QRect(370, 225, 110, 25))
        self.pushhangePasswordButton.setObjectName("pushSettingsButton")
        self.pushhangePasswordButton.clicked.connect(self.changePassword)
        self.pushhangePasswordButton.setStyleSheet(self.hyperlinkStyle)
        # TODO: Add functionality to this button
        
        self.lineEdit = QtWidgets.QLineEdit(self)
        self.lineEdit.setGeometry(QtCore.QRect(370, 175, 250, 50))
        self.lineEdit.setObjectName("lineEdit")
        self.lineEdit.setStyleSheet(self.lineEditStyle)
        self.lineEdit.setReadOnly(True)
        self.lineEdit.setAlignment(QtCore.Qt.AlignCenter)
        self.lineEdit.setEchoMode(QtWidgets.QLineEdit.Password)
        self.lineEdit.setMaxLength(4)
        self.lineEdit.setPlaceholderText("Enter Password")
        self.lineEdit.setFont(QtGui.QFont("Ubuntu", 14))
        
        self.MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(self.MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 800, 22))
        self.menubar.setObjectName("menubar")
        self.MainWindow.setMenuBar(self.menubar)
        
        self.statusbar = QtWidgets.QStatusBar(self.MainWindow)
        self.statusbar.setObjectName("statusbar")
        self.MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi()
        QtCore.QMetaObject.connectSlotsByName(self.MainWindow)

    def retranslateUi(self):
        _translate = QtCore.QCoreApplication.translate
        self.MainWindow.setWindowTitle(_translate("MainWindow", "MainWindow"))
        self.pushButton1.setText(_translate("MainWindow", "1"))
        self.pushButton2.setText(_translate("MainWindow", "2"))
        self.pushButton3.setText(_translate("MainWindow", "3"))
        self.pushButton4.setText(_translate("MainWindow", "4"))
        self.pushButton5.setText(_translate("MainWindow", "5"))
        self.pushButton6.setText(_translate("MainWindow", "6"))
        self.pushButton7.setText(_translate("MainWindow", "7"))
        self.pushButton8.setText(_translate("MainWindow", "8"))
        self.pushButton9.setText(_translate("MainWindow", "9"))
        
        self.pushBackButton.setText(_translate("MainWindow", "Back"))
        self.pushButton0.setText(_translate("MainWindow", "0"))
        self.pushEnterButton.setText(_translate("MainWindow", "Enter"))
        self.pushhangePasswordButton.setText(_translate("MainWindow", "Change Password"))
        self.lineEdit.setText(_translate("MainWindow", self.asterisks))



    @pyqtSlot(np.ndarray)
    def display_frame(self, image):
        # Convert the frame to an RGB image and resize it to fit the label
        h, w, c = image.shape
        bytes_per_line = c * w
        q_image = QImage(image.data, w, h, bytes_per_line, QImage.Format_RGB888)
        pixmap = QPixmap.fromImage(q_image)
        pixmap = pixmap.scaled(self.image_label.width(), self.image_label.height(),aspectRatioMode=Qt.KeepAspectRatio)

        # Update the label with the pixmap
        self.image_label.setPixmap(pixmap)

    def closeEvent(self, event):
        self.video_stream.stop()
        self.video_thread.quit()
        self.video_thread.wait()
        event.accept()

if __name__ == "__main__":
    app = QApplication([])
    player = VideoPlayer()
    player.show()
    app.exec_()
