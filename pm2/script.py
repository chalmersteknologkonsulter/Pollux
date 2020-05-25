import os

os.system("sudo apt update")
os.system("sudo apt install nodejs")
os.system("sudo apt install npm")
os.system("sudo npm i -g pm2")
print("\nTo start your express app, go to your app directory and type: \"sudo pm2 start FILE_NAME.js\"\n")