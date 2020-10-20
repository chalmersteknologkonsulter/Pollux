import os
import platform


def nextScript():
    nextScript = "python react-native.py"
    run_nextScript = os.system(nextScript)


systemPlatform = platform.system()



################ LINUX  ###################

if systemPlatform == "Linux":

    # Confirm if we should partake in this section of the instalation
    print("Would you like to setup a React application template? (Y/n): ")
    confirmation = input()
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
    os.system("npx create-react-app " + applicationName)
    # TODO: run server
    #+" && cd " + applicationName + " && npm start")


 ################ WINDOWS  ###################

elif systemPlatform == "Windows":
    print("Windows is not yet supported")
    nextScript()

 ################ MACOS  ###################

elif systemPlatform == "Darwin":
     # Confirm if we should partake in this section of the instalation
    print("Would you like to setup a React application template? (Y/n): ")
    confirmation = input()
    if (confirmation == "n") or (confirmation == "N"):
        exit("Skipping")

    # Get the name of the application and convert to lower case (React does not allow upper case characters)
    print("What is the name of the application template?: ")
    applicationName = input().lower()

    # Install necessary components, create folder template and run new server
    os.system("brew update")
    os.system("brew doctor")
    os.system("export PATH=\"/usr/local/bin:$PATH\"")
    os.system("brew install node")
    os.system("npm install -g grunt-cli")
    os.system("npm install -g serve")
    os.system("npx create-react-app " + applicationName)

    # TODO: run server
    #+" && cd " + applicationName + " && npm start")
    nextScript()

print("Thank you, your " + applicationName + " application template is now prepared!")

nextScript = "python3 react-native.py"
run_nextScript = os.system(nextScript)
