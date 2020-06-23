import os
import functions as f
import platform

install = raw_input("\nDo you want install React Native? (Y for Yes, N for No)\n")

if (install == "Y"):
    print("\nChoose a CLI type and a project name to create your React Native project\n")

    cli_type = raw_input("CLI type (E for Expo, R for React): ")

    # if CLI type input is incorrect
    while ((cli_type != "E") and (cli_type != "R")):
        cli_type = raw_input("CLI type incorrect! Please choose a valid CLI type (E for Expo, R for React): ")

    project_name = raw_input("Poject name: ")
    print("")

    if (platform.system() == "Linux"):
        # update package then install node and npm
        os.system("sudo apt update")
        os.system("sudo apt install nodejs")
        os.system("sudo apt install npm")
        print("")

    if (cli_type == "E"):
        f.expo(project_name)
    else:
        dev_platform_name = "Android Studio"
        download_source = "https://developer.android.com/studio"

        if (platform.system() == "Darwin"):
            dev_platform = raw_input("Do you want to React Native for iOS or Android? (I for iOS, A for Android): ")
            if (dev_platform == "I"):
                dev_platform_name = "Xcode"
                download_source = "https://apps.apple.com/us/app/xcode/id497799835?mt=12"
            
        installed = raw_input("To use React CLI, you need to install " + dev_platform_name + ". \nIs it already installed (Y for yes, N for no)? ")

        if (installed == "Y"):
            f.react(project_name, dev_platform_name)
        else:
            print("\nYou can download from " + download_source + "\n")
