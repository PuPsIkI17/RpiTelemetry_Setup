import os
import psutil
import platform

#cpu usage
print(psutil.cpu_percent(2))

memory = psutil.virtual_memory()
#memory size in gb 
print(memory.total >> 30)
#memory usage
print(memory[2])


print(psutil.net_io_counters().bytes_sent)

#device info
#my_system = platform.uname()
 
#print(f"System: {my_system.system}")
#print(f"Node Name: {my_system.node}")
#print(f"Release: {my_system.release}")
#print(f"Version: {my_system.version}")
#print(f"Machine: {my_system.machine}")
#print(f"Processor: {my_system.processor}")