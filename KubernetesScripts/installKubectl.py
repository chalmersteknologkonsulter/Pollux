import os
import platform


# These commands are similar on both Linux and Darwin, 
# Therefor it makes sense to have the code written once.
def LinuxDarwin():
	os.system("chmod +x ./kubectl")
	os.system("sudo mv ./kubectl /usr/local/bin/kubectl")
	os.system("kubectl version --client")


platform = platform.system()

################ LINUX  ###################
if platform = "Linux":
	os.system("curl -LO \"https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl\"")
	LinuxDawin()

################ MACOS  ###################
if platform = "Darwin":
	os.system("curl -LO \"https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/darwin/amd64/kubectl\"")
	LinuxDarwin()

################ WINDOWS  ###################	
if plarform = "Windows":
	option = input(" Install using: \n 1. curl \n 2. PSGallery \n 3. Chocolatey/Scoop /n:")

	# CURL
	if option = "1":
		os.system("curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.19.0/bin/windows/amd64/kubectl.exe")
		print(" Add the binary in to your PATH. ")

	# PSGALLERY
	if option = "2":
		os.system("Install-Script -Name \'install-kubectl\' -Scope CurrentUser -Force")
		os.system("install-kubectl.ps1 [-DownloadLocation <path>]")
		os.system("kubectl version --client")

	# CHOCOLATEY/SCOOP
	if option = "3":
		os.system("choco install kubernetes-cli")
		os.system("kubectl version --client")

		exe = input(" Are you using cmd.exe? (Y/n): ")

		if exe = "n" or exe = "N":
			os.system("cd ~")

		else:
			os.system("cd \%USERPROFILE\%")

		os.system("mkdir .kube")
		os.system("cd .kube")
		os.system("New-Item config -type file")
		