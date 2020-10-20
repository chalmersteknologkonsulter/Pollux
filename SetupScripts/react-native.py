import os
import functions as f
import platform


def expo(project_name):
    if (platform.system() == 'Windows'):
        os.system("npm install -g expo-cli")
    else:    
        os.system("sudo npm install -g expo-cli")

    os.system("expo init " + project_name)
    os.system("cd " + project_name + " && npm start")

def react(projectName, platformName):

        os.system("sudo npm install -g react-native-cli")
        os.system("sudo apt install openjdk-8-jdk")

        os.system("STRING=\"export ANDROID_HOME=$HOME/Android/Sdk" +
        "\nexport PATH=$PATH:$ANDROID_HOME/emulator" +
        "\nexport PATH=$PATH:$ANDROID_HOME/tools" +
        "\nexport PATH=$PATH:$ANDROID_HOME/tools/bin" +
        "\nexport PATH=$PATH:$ANDROID_HOME/platform-tools\" && " +
        "echo echo -e $STRING >> \"$HOME/.bash_profile\" && " +
        "source $HOME/.bash_profile")

install = input("\nDo you want to install React Native? y/n \n")

if (install == "y"):
    print("\n Choose a CLI type and a project name to create your React Native project\n")

    cli_type = input("\n CLI type: \n 1. Expo \n 2. React \n ")

    # if CLI type input is incorrect
    while ((cli_type != "1") and (cli_type != "2")):
        cli_type = input("CLI type incorrect! Please choose a valid CLI type. Insert 1 for Expo, or 2 for React. ")

    project_name = input("Poject name: ")
    print("")

    ################ LINUX  ###################

    if (platform.system() == "Linux"):
        # update package then install node and npm
        os.system("sudo apt update")
        os.system("sudo apt install nodejs")
        os.system("sudo apt install npm")
        print("")

    if (cli_type == "1"):
        expo(project_name)
    else:
        dev_platform_name = "Android Studio"
        download_source = "https://developer.android.com/studio"

     ################ MACOS  ###################

    if (platform.system() == "Darwin"):
        dev_platform = input("Do you want to React Native for iOS or Android? \n 1. iOS \n 2. Android \n  ")
        if (dev_platform == "1"):
            dev_platform_name = "Xcode"
            download_source = "https://apps.apple.com/us/app/xcode/id497799835?mt=12"

        asInstalled = input("To use React CLI, you need to install " + dev_platform_name + ". \nIs it already installed? y/n ")

        if (asInstalled == "y"):
            react(project_name, dev_platform_name)
        else:
            print("\n You can download from " + download_source + "\n")


    ################ WINDOWS  ###################

     # must be run as an adminstrator
    if (platform.system() == "Windows"):
        os.system("choco install -y nodejs.install python2 jdk8")
        os.system("react-native init $1")
        os.system("cd $1 && react-native run-android")


