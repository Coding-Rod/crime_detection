from PyQt5 import QtCore, QtGui, QtWidgets
from cryptography.fernet import Fernet

class Ui_MainWindow(object):
    password = ''
    asterisks = ''
    def __init__(self, MainWindow) -> None:
        self.MainWindow = MainWindow
        self.MainWindow.setObjectName("MainWindow")
        self.MainWindow.resize(650, 280)
        file = open('./security/pass.txt', 'rb')
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
    
    def validatePassword(self) -> None:
        """ Validate the password shows a warning QMessageBox if the password is wrong."""
        if len(self.password) == 4:
            with open('./security/key.key', 'rb') as file:
                key = file.read()
                fernet = Fernet(key)
                password = fernet.decrypt(self.__encrypted_password)
                if self.password == password.decode():
                    # TODO: Implement stop for the alarm
                    print('Password correct')
                    self.password = ''
                    self.asterisks = ''
                    self.retranslateUi()
                else:
                    QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password incorrect')
        else:
            QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password must be 4 numbers')

    def changePassword(self) -> None:
        """ Change the password with a QInputDialog."""
        text, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Enter the new password:')
        
        if ok:
            if len(text) == 4:
                with open('./security/key.key', 'rb') as file:
                    key = file.read()
                    fernet = Fernet(key)
                    encrypted_password = fernet.encrypt(text.encode())
                    with open('./security/pass.txt', 'wb') as file:
                        file.write(encrypted_password)
                    self.__encrypted_password = encrypted_password
            else:
                QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', 'Password must be 4 numbers')
        

    def setupUi(self):
        self.centralwidget = QtWidgets.QWidget(self.MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        
        self.pushButton1 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton1.setGeometry(QtCore.QRect(30, 20, 100, 50))
        self.pushButton1.setObjectName("pushButton1")        
        self.pushButton1.clicked.connect(lambda: self.concatenatePassword('1'))
        self.pushButton1.setStyleSheet(self.buttonStyle)
        self.pushButton2 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton2.setGeometry(QtCore.QRect(140, 20, 100, 50))
        self.pushButton2.setObjectName("pushButton2")
        self.pushButton2.clicked.connect(lambda: self.concatenatePassword('2'))
        self.pushButton2.setStyleSheet(self.buttonStyle)
        self.pushButton3 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton3.setGeometry(QtCore.QRect(250, 20, 100, 50))
        self.pushButton3.setObjectName("pushButton3")
        self.pushButton3.clicked.connect(lambda: self.concatenatePassword('3'))
        self.pushButton3.setStyleSheet(self.buttonStyle)
        
        self.pushButton4 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton4.setGeometry(QtCore.QRect(30, 80, 100, 50))
        self.pushButton4.setObjectName("pushButton4")
        self.pushButton4.clicked.connect(lambda: self.concatenatePassword('4'))
        self.pushButton4.setStyleSheet(self.buttonStyle)
        self.pushButton5 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton5.setGeometry(QtCore.QRect(140, 80, 100, 50))
        self.pushButton5.setObjectName("pushButton5")
        self.pushButton5.clicked.connect(lambda: self.concatenatePassword('5'))
        self.pushButton5.setStyleSheet(self.buttonStyle)
        self.pushButton6 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton6.setGeometry(QtCore.QRect(250, 80, 100, 50))
        self.pushButton6.setObjectName("pushButton6")
        self.pushButton6.clicked.connect(lambda: self.concatenatePassword('6'))
        self.pushButton6.setStyleSheet(self.buttonStyle)
        
        self.pushButton7 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton7.setGeometry(QtCore.QRect(30, 140, 100, 50))
        self.pushButton7.setObjectName("pushButton7")
        self.pushButton7.clicked.connect(lambda: self.concatenatePassword('7'))
        self.pushButton7.setStyleSheet(self.buttonStyle)
        self.pushButton8 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton8.setGeometry(QtCore.QRect(140, 140, 100, 50))
        self.pushButton8.setObjectName("pushButton8")
        self.pushButton8.clicked.connect(lambda: self.concatenatePassword('8'))
        self.pushButton8.setStyleSheet(self.buttonStyle)
        self.pushButton9 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton9.setGeometry(QtCore.QRect(250, 140, 100, 50))
        self.pushButton9.setObjectName("pushButton9")
        self.pushButton9.clicked.connect(lambda: self.concatenatePassword('9'))
        self.pushButton9.setStyleSheet(self.buttonStyle)
        
        self.pushBackButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushBackButton.setGeometry(QtCore.QRect(30, 200, 100, 50))
        self.pushBackButton.setObjectName("pushBackButton")
        self.pushBackButton.clicked.connect(self.backspace)
        self.pushBackButton.setStyleSheet(self.buttonStyle)
        
        self.pushButton0 = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton0.setGeometry(QtCore.QRect(140, 200, 100, 50))
        self.pushButton0.setObjectName("pushButton0")
        self.pushButton0.clicked.connect(lambda: self.concatenatePassword('0'))
        self.pushButton0.setStyleSheet(self.buttonStyle)
        
        self.pushEnterButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushEnterButton.setGeometry(QtCore.QRect(250, 200, 100, 50))
        self.pushEnterButton.setObjectName("pushEnterButton")
        self.pushEnterButton.clicked.connect(self.validatePassword)
        self.pushEnterButton.setStyleSheet(self.buttonStyle)
        
        self.pushhangePasswordButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushhangePasswordButton.setGeometry(QtCore.QRect(370, 225, 110, 25))
        self.pushhangePasswordButton.setObjectName("pushSettingsButton")
        self.pushhangePasswordButton.clicked.connect(self.changePassword)
        self.pushhangePasswordButton.setStyleSheet(self.hyperlinkStyle)
        # TODO: Add functionality to this button
        
        self.lineEdit = QtWidgets.QLineEdit(self.centralwidget)
        self.lineEdit.setGeometry(QtCore.QRect(370, 20, 250, 50))
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

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
