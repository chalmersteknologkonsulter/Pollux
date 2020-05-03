#! /usr/bin/bash

# By Omar Diriye 1/5/2020

# load functions from function.sh
source ./react-native-scripts/functions.sh

echo ""
echo "Choose a CLI type and a project name to create your React Native project"
echo ""
read -p "CLI type (E for Expo, R for React): " CLI_TYPE

# if CLI type input is incorrect
while ! [ "$CLI_TYPE" == "E" ] && ! [ "$CLI_TYPE" == "R" ]
do
    read -p "CLI type incorrect! Please choose a valid CLI type (E for Expo, R for React): " CLI_TYPE
done

read -p "Project name: " PROJECT_NAME

echo ""

# install node and npm
sudo apt update
sudo apt install nodejs
sudo apt install npm

echo ""

if [ "$CLI_TYPE" == "E" ]
then
    EXPO $PROJECT_NAME
elif [ "$CLI_TYPE" == "R" ]
then
    REACT $PROJECT_NAME
fi