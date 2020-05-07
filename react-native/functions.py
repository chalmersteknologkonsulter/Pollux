import os

def expo(project_name):
    os.system("sudo npm install -g expo-cli")
    os.system("expo init " + project_name)
    os.system("cd " + project_name + " && npm start")

def react(project_name):
    #os.system("sudo npm install -g react-native-cli")
    #os.system("sudo apt install openjdk-8-jdk")
    os.system("STRING=\"export ANDROID_HOME=$HOME/Android/Sdk" +
    "\nexport PATH=$PATH:$ANDROID_HOME/emulator" +
    "\nexport PATH=$PATH:$ANDROID_HOME/tools" +
    "\nexport PATH=$PATH:$ANDROID_HOME/tools/bin" +
    "\nexport PATH=$PATH:$ANDROID_HOME/platform-tools\" && " +
    "echo echo -e $STRING >> \"$HOME/.bash_profile\" && " +
    "source $HOME/.bash_profile")

    os.system("react-native init $1")
    os.system("cd $1 && react-native run-android")