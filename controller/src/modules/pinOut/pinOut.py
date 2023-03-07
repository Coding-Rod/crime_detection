import RPi.GPIO as GPIO

class PinOut:
    gpio = GPIO if GPIO else None

    def __init__(self, input_pin: int, output_pins: list):
        ''' Initialize the GPIO pins. '''
        self.gpio.setmode(self.gpio.BOARD)
        self.gpio.setwarnings(False)
        self.input_pin = input_pin
        self.output_pins = output_pins
        
        self.gpio.setup(self.input_pin, self.gpio.IN)
        [self.gpio.setup(pin, self.gpio.OUT) for pin in self.output_pins]

    def readPin(self) -> bool:
        ''' Read the value of a pin. '''
        return self.gpio.input(self.input_pin)
        
    def writePin(self, values: tuple):
        ''' Write a value to multiple pins. '''
        [self.gpio.output(pin, value) for pin, value in zip(self.output_pins, values)]