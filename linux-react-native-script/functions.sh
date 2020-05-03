# expo cli
function EXPO() {
 sudo npm install -g expo-cli
 expo init $1
 cd $1
 npm start
}

# react cli, this assumes android studio is already installed
function REACT() {
    sudo npm install -g react-native-cli
    sudo apt install openjdk-8-jdk

    STRING="export ANDROID_HOME=$HOME/Android/Sdk
    \nexport PATH=$PATH:$ANDROID_HOME/emulator
    \nexport PATH=$PATH:$ANDROID_HOME/tools
    \nexport PATH=$PATH:$ANDROID_HOME/tools/bin
    \nexport PATH=$PATH:$ANDROID_HOME/platform-tools"

    echo -e $STRING >> "$HOME/.bash_profile"
    source $HOME/.bash_profile

    react-native init $1
    cd $1
    react-native run-android
}