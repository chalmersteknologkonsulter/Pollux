import os
import platform
import installDocker as idoc


def run():
    containerName = input(" Create a name for your container: ")
    password = input(" Create a password for your PSQL: ")
    os.system("docker run --name " + containerName + " -e POSTGRES_PASSWORD=[your_password] -d postgres")

    # Access container bash terminal
    os.system("docker exec -it " + containerName + " /bin/bash")

isInstalled = input("\n Do you have docker already installed on your machine?  Y/n \n")

if isInstalled == 'N' or isInstalled == 'n':
    idoc.install("dockerPSQL.py")

else:
    run()