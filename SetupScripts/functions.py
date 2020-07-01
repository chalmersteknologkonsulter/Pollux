import os
import platform

def expo(project_name):
    os.system("npm install -g expo-cli")
    os.system("expo init " + project_name)
    os.system("cd " + project_name + " && npm start")

def react(project_name, dev_platform_name):

    # must be run as an adminstrator
    if (platform.system() == "Windows"):
        os.system("choco install -y nodejs.install python2 jdk8")
        os.system("npm install -g react-native-cli")
    elif (platform.system() == "Linux"):
        os.system("sudo npm install -g react-native-cli")
        os.system("sudo apt install openjdk-8-jdk")

        os.system("STRING=\"export ANDROID_HOME=$HOME/Android/Sdk" +
        "\nexport PATH=$PATH:$ANDROID_HOME/emulator" +
        "\nexport PATH=$PATH:$ANDROID_HOME/tools" +
        "\nexport PATH=$PATH:$ANDROID_HOME/tools/bin" +
        "\nexport PATH=$PATH:$ANDROID_HOME/platform-tools\" && " +
        "echo echo -e $STRING >> \"$HOME/.bash_profile\" && " +
        "source $HOME/.bash_profile")
    elif (platform.system() == "Darwin"):
        #install Homebrew
        os.system("/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)\"")

        os.system("brew install yarn")
        os.system("brew install node")
        os.system("brew install watchman")
        os.system("brew tap AdoptOpenJDK/openjdk")
        os.system("brew cask install adoptopenjdk8")
        os.system("sudo npm install -g react-native-cli")

        if (dev_platform_name == "Android Studio"):
            os.system("STRING=\"export ANDROID_HOME=$HOME/Android/Sdk" +
            "\nexport PATH=$PATH:$ANDROID_HOME/emulator" +
            "\nexport PATH=$PATH:$ANDROID_HOME/tools" +
            "\nexport PATH=$PATH:$ANDROID_HOME/tools/bin" +
            "\nexport PATH=$PATH:$ANDROID_HOME/platform-tools\" && " +
            "echo echo -e $STRING >> \"$HOME/.bash_profile\" && " +
            "source $HOME/.bash_profile")

    os.system("react-native init " + project_name)
    os.system("cd " + project_name)
    os.system("react-native run-android")
