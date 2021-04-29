import serial
import time

ser = serial.Serial('/dev/ttyACM0', baudrate=3000000)

ser.write(b'1111\x10\x00\x00\x10') # Sets the Pico to max speed
num_reads = 200

start = time.time()

for i in range(num_reads):
	ser.read(10)

finish = time.time()

print('time=', finish-start)
print('freq=', num_reads / (finish-start))
