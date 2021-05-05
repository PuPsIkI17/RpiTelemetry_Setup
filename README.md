## Setup
1. sudo apt install git-all
2. git clone https://github.com/PuPsIkI17/RpiTelemetry_Setup
3. cd Licenta
4. bash setup.py
(It may need a restart)

## RUN
node js/index.js --topic rpi_telemetry --root-ca certs/Amazon-root-CA-1.pem --cert certs/certificate.pem.crt --key certs/private.pem.key --endpoint age8f9ux9o2e3-ats.iot.us-east-1.amazonaws.com
