# GPIO library
import Jetson.GPIO as GPIO
 
# Handles time
import time 
 
# Pin Definition
button_pin = 36
 
# Set up the GPIO channel
GPIO.setmode(GPIO.BOARD) 
GPIO.setup(button_pin, GPIO.IN) 
 
print("Press CTRL+C when you want the LED to stop blinking") 
 
# Blink the LED
while True: 
  print(f"Button state: {GPIO.input(button_pin)}")
  time.sleep(1) 