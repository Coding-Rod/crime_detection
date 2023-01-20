# GPIO library
import Jetson.GPIO as GPIO
import sys

# Handles time
import time 
 
# Pin Definition
led_pin = 35
but_pin = 11

# Interruption
def terminal(channel):
  print("Program ended")
  GPIO.output(led_pin, GPIO.LOW)
  GPIO.cleanup()
  sys.exit()
  # raise SystemExit


# Set up the GPIO channel
GPIO.setmode(GPIO.BOARD) 
GPIO.setup(led_pin, GPIO.OUT, initial=GPIO.HIGH) 
GPIO.setup(but_pin, GPIO.IN)

# Interruption setup
GPIO.add_event_detect(but_pin, GPIO.FALLING, callback=terminal, bouncetime=10)
print("Press CTRL+C when you want the LED to stop blinking") 
 
# Blink the LED
try: 
  while True: 
    GPIO.output(led_pin, GPIO.HIGH) 
    print("LED is ON")
    time.sleep(2) 
    GPIO.output(led_pin, GPIO.LOW)
    print("LED is OFF")
    time.sleep(2) 
except KeyboardInterrupt:
    GPIO.output(led_pin, GPIO.LOW)
    print("LED is OFF")
finally:
    GPIO.cleanup()
    raise SystemExit
  