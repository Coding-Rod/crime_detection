from datetime import datetime

class Time_now:
    def get_time(self) -> tuple:
        now = datetime.now()
        return (int(x) for x in now.strftime("%H:%M:%S").split(':'))