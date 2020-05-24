import os
import platform

systemPlatform = platform.system()

if systemPlatform == "Linux":

	# Confirm if we should partake in this section of the instalation
	print("Would you like to setup a React application template? (Y/n): ")
	confirmation = raw_input()
	if (confirmation == "n") or (confirmation == "N"):
		exit("Skipping")

	# Confirm that we are running as root
	if os.geteuid() != 0:
	    exit("You need to have root privileges to run this script.\nPlease try again, this time using 'sudo'. Exiting.")

	# Get the name of the application and convert to lower case (React does not allow upper case characters)
	print("What is the name of the application template?: ")
	applicationName = raw_input().lower()


	# Install necessary components, create folder template and run new server
	os.system("apt update")
	os.system("apt install -y nodejs npm")
	os.system("npm install -g serve")
	os.system("npx create-react-app " + applicationName )
	#TODO: run server
		#+" && cd " + applicationName + " && npm start")

	print("Thank you, your " + applicationName + " application template is now prepared!")


elif systemPlatform == "Windows":
	# ctypes is to check admin privileges on Windows
	import ctypes

	# Confirm if we should partake in this section of the instalation
	print("Would you like to setup a React application template? (Y/n): ")
	confirmation = input()
	if (confirmation == "n") or (confirmation == "N"):
		exit("Skipping")

	# Confirm that we are running as root
	# isAdmin = ctypes.windll.shell32.IsUserAnAdmin() != 0
	if (ctypes.windll.shell32.IsUserAnAdmin() == 0):
	    exit("You need to run this script as Administrator.\nPlease try again. Exiting.")

	# Install necessary components, create folder template and run new server
	# Get the name of the application and convert to lower case (React does not allow upper case characters)
	print("What is the name of the application template?: ")
	applicationName = input().lower()

	# Install Chocolatey Node Package Manager
	os.system("@\"%SystemRoot%\\System32\\WindowsPowerShell\\v1.0\\powershell.exe\" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command \"[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))\" && SET \"PATH=%PATH%;%ALLUSERSPROFILE%\\chocolatey\\bin\"");

	#####TODO: RELOAD REQUIRED HERE? :/
	# Install NodeJS (And npm / npx)
	os.system("cinst nodejs install -y");

	#####TODO: RELOAD REQUIRED HERE? :/
	# Install necessary components, create folder template
	os.system("npx create-react-app " + applicationName )

elif systemPlatform == "Darwin":
	exit("OSX is not yet supported")
