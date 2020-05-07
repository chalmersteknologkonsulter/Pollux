import os

#TODO: Read application name from argument
applicationName = "test123"

if os.geteuid() != 0:
    exit("You need to have root privileges to run this script.\nPlease try again, this time using 'sudo'. Exiting.")

os.system("apt update")
os.system("apt install -y nodejs npm")
os.system("npm install -g serve")
os.system("npx create-react-app " + applicationName +" \cd " + applicationName + " \n npm start")
