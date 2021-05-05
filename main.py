import os
import psutil
import uuid  
import platform
#from device_detector import DeviceDetector

#id
print (':'.join(['{:02x}'.format((uuid.getnode() >> ele) & 0xff)
for ele in range(0,8*6,8)][::-1]))

#cpu usage
print(psutil.cpu_percent(2))

memory = psutil.virtual_memory()
#memory size in gb 
print(memory.total >> 30)
#memory usage
print(memory[2])


#print(psutil.net_io_counters(2).bytes_sent + psutil.net_io_counters(2).bytes_recv)

#device info
#my_system = platform.uname()
 
#print(f"System: {my_system.system}")
#print(f"Node Name: {my_system.node}")
#print(f"Release: {my_system.release}")
#print(f"Version: {my_system.version}")
#print(f"Machine: {my_system.machine}")
#print(f"Processor: {my_system.processor}")