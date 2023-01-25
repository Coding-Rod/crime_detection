from .packages.date_and_time import Time_now
from .packages.pir import Pir
from .packages.light import Light
class Controllers(Time_now, Pir, Light):
    pass