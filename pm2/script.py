import os

os.system("sudo apt update")
os.system("sudo apt install nodejs")
os.system("sudo apt install npm")
os.system("sudo npm i -g pm2")

file_path = raw_put("Please enter your startup file path")
os.system("sudo pm2 start " + file_path)
