## Setup
1. copy the Rpi.tar.xz archive to your device
2. tar xf Rpi.tar.xz 
3. cd Rpi
4. bash setup.py

## RUN
bash run.sh  (or)
node js/index.js --topic rpi_telemetry --root-ca certs/Amazon-root-CA-1.pem --cert certs/certificate.pem.crt --key certs/private.pem.key --endpoint age8f9ux9o2e3-ats.iot.us-east-1.amazonaws.com
