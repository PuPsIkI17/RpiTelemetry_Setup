#!/bin/bash
pip_path=$(which pip)
sudo rm $pip_path
python dependencies/pip/get-pip.py 
pip_path=$(which pip)
sudo cp $pip_path /usr/bin/
pip install psutil
sudo cp -r dependencies/node-v14.16.1-linux-x64/{bin,include,lib,share} /usr/
cd ~
npm install aws-crt
npm install aws-iot-device-sdk-v2
cd -
npm install