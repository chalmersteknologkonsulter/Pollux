import os

os.system("sudo apt update")
os.system("sudo apt install nodejs")
os.system("sudo apt install npm")
os.system("sudo npm i -g pm2")

file_path = input("\nPlease enter the path to your startup file: ")
os.system("sudo pm2 start " + file_path)
