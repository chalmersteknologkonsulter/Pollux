import os
import functions as f

install = raw_input("\nDo you want install React Native? (Y for Yes, N for No)\n")

if (install == "Y"):
    print("\nChoose a CLI type and a project name to create your React Native project\n")

    cli_type = raw_input("CLI type (E for Expo, R for React): ")

    # if CLI type input is incorrect
    while ((cli_type != "E") and (cli_type != "R")):
        cli_type = raw_input("CLI type incorrect! Please choose a valid CLI type (E for Expo, R for React): ")

    project_name = raw_input("Poject name: ")
    print("")

    # update package then install node and npm
    os.system("sudo apt update")
    os.system("sudo apt install nodejs")
    os.system("sudo apt install npm")
    print("")

    if (cli_type == "E"):
        f.expo(project_name)
    else:
        installed = raw_input("To use React CLI, you need to install Android Studio. \nIs it already installed (Y for yes, N for no)? ")
        if (installed == "Y"):
            f.react(project_name)
        else:
            print("\nYou can download from https://developer.android.com/studio\n")