import os
import psutil
import platform
import time


#cpu_freq -> Ghz
print("{:.2f}".format(psutil.cpu_freq()[0] / 1000))
#cpu usage -> percentages
print(psutil.cpu_percent(2))

memory = psutil.virtual_memory()
#memory size -> gb 
print(memory.total >> 30)
#memory usage -> percentages
print(memory[2])

#total disk space Mb
print("{:.2f}".format(psutil.disk_usage('/')[0]/1000000))
#disk used space
print(psutil.disk_usage('/')[3])


#network_usage -> Mb
network_info = psutil.net_io_counters() 
network = network_info.bytes_sent + network_info.bytes_recv
print("{:.2f}".format(network / 1000000))


print(psutil.sensors_temperatures())
print(psutil.sensors_fans())

print(psutil.boot_time())
#device info
#my_system = platform.uname()
 
#print(f"System: {my_system.system}")
#print(f"Node Name: {my_system.node}")
#print(f"Release: {my_system.release}")
#print(f"Version: {my_system.version}")
#print(f"Machine: {my_system.machine}")
#print(f"Processor: {my_system.processor}")