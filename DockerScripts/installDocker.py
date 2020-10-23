import os
import platform


def install(whichScript):
	osType = platform.system()

	if osType == 'Windows':
		print("Please install docker from the docker hub: https://hub.docker.com/editions/community/docker-ce-desktop-windows/")
		print(" Docker installed! ")
		os.system("python3 " + whichScript)

	elif osType == 'Darwin':
		os.system("brew update")
		os.system("brew install docker")
		print(" Docker installed! ")
		os.system("python3 " + whichScript)

	elif osType == 'Linux':
		os.system("sudo apt-get remove docker docker-engine docker.io containerd runc")
		os.system("sudo apt-get update")
		os.system("sudo apt-get install docker-ce docker-ce-cli containerd.io")
		print(" Docker installed! ")
		os.system("python3 " + whichScript)











#### Instaling through repo. Maybe useful for the future. ####

#     cmd8 = "sudo apt-get update"
#     cmd9 = "sudo apt-get install \
# apt-transport-https \
# ca-certificates \
# curl \
# gnupg-agent \
# software-properties-common"
#     cmd10 = "curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -"
#     fingerprint = input("Please insert the last 8 character of the fingerprint with no spaces:")
#     cmd11 = "sudo apt-key fingerprint " + fingerprint
