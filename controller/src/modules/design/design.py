from PyQt5 import QtWidgets

from ..security.security import Security

class DesignMethods(Security):
    password = ''
    asterisks = ''
    def __init__(self):
        super().__init__()
        
    def concatenatePasswordUI(self, number: str) -> None:
        """ Concatenate the number to the password.

        Args:
            number (str): The number to concatenate to the password.
        """
        if len(self.password) < 4:
            self.password += number
            self.asterisks += '*'
            self.retranslateUi()
            
    def backspaceUI(self) -> None:
        """ Remove the last number from the password."""
        if len(self.password) > 0:
            self.password = self.password[:-1]
            self.asterisks = self.asterisks[:-1]
            self.retranslateUi()
    
    def validatePasswordUI(self) -> None:
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

    def changePasswordUI(self) -> None:
        """ Verify the password with a QInputDialog and change the password if the password is correct.
        Shows a warning QMessageBox if the password is wrong.
        Shows a warning QMessageBox if the password is not 4 numbers.
        Shows a warning QMessageBox if the password is not a number.
        Shows a warning QMessageBox if the passwords do not match.
        """
        try:
            text, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Enter the previous password:')
            if ok:
                assert self.verifyPassword(text), 'Password incorrect'
                text, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Enter the new password:')
                if ok:
                    self.validatePassword(text)
                    text2, ok = QtWidgets.QInputDialog.getText(self.MainWindow, 'Change password', 'Confirm the new password:')
                    if ok:
                        assert text == text2, 'Passwords do not match'
                        self.changePassword(text)
                        QtWidgets.QMessageBox.information(self.MainWindow, 'Success', 'Password changed')
                        self.password = ''
        except AssertionError as error:
            QtWidgets.QMessageBox.warning(self.MainWindow, 'Error', str(error))
    
    