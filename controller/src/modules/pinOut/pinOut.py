try:
    import RPi.GPIO as GPIO
except ImportError:
    print('No GPIO module found. Using mock.')
    GPIO = None
class PinOut:
    gpio = GPIO if GPIO else None

    def __init__(self, input_pin: int, relay_pin: int, led_pins: list):
        ''' Initialize the GPIO pins. '''
        self.input_pin = input_pin
        self.relay_pin = relay_pin
        self.led_pins = led_pins
        
        try:
            self.gpio.setmode(self.gpio.BOARD)
            self.gpio.setwarnings(False)
            
            self.gpio.setup(self.input_pin, self.gpio.IN)
            [self.gpio.setup(pin, self.gpio.OUT) for pin in self.led_pins]
        except AttributeError:
            print('No GPIO module found. Using mock.')

    def read_pin(self) -> bool:
        ''' Read the value of a pin. '''
        try:
            return self.gpio.input(self.input_pin)
        except AttributeError:
            return True
        
    def write_rgb(self, red: bool, green: bool, blue: bool): 
        ''' Write a value to multiple pins. '''
        try:
            [self.gpio.output(pin, value) for pin, value in zip(self.led_pins, (red, green, blue))]
        except AttributeError:
            print('No GPIO module found. Using mock.')
        
    def write_relay(self, value: bool):
        """ Write a value to a relay pin.

        Args:
            value (bool): The value to write to the relay pin.
        """
        try:
            self.gpio.output(self.relay_pin, value)
        except AttributeError:
            print('No GPIO module found. Using mock.')