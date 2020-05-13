import os
import functions as f


def nextScript():
    nextScript = "python3 docker_mysql.py"
    run_nextScript = os.system(nextScript)


print("\nChoose a CLI type and a project name to create your React Native project\n")

cli_type = input("CLI type (E for Expo, R for React): ")

# if CLI type input is incorrect
while ((cli_type != "E") and (cli_type != "R")):
    cli_type = input("CLI type incorrect! Please choose a valid CLI type (E for Expo, R for React): ")

project_name = input("Poject name: ")
print("")

# update package then install node and npm
os.system("sudo apt update")
os.system("sudo apt install nodejs")
os.system("sudo apt install npm")
print("")

if (cli_type == "E"):
    f.expo(project_name)
    nextScript()
else:
    installed = input("To use React CLI, you need to install Android Studio. \nIs it already installed (Y for yes, N for no)? ")
    if (installed == "Y"):
        f.react(project_name)
        nextScript()
    else:
        print("\n You can download from https://developer.android.com/studio\n")
        nextScript()
