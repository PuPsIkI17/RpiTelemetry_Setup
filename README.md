## Setup
1. copy the Rpi.tar.xz archive to your device
2. tar xf Rpi.tar.xz 
3. cd Rpi
4. bash setup.py

## RUN
./run.sh  (or)
node js/index.js --topic rpi_telemetry --root-ca certs/Amazon-root-CA-1.pem --cert certs/certificate.pem.crt --key certs/private.pem.key --endpoint age8f9ux9o2e3-ats.iot.us-east-1.amazonaws.com


## EC2 instance (testing)
Amazon Machine Image  **Raspberry_downloaded - ami-21750f5b** or **Raspberry_EC2**
Instance Type 	**t2.micro**

### Installing stress
sudo yum -y install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
sudo yum install stress -y
