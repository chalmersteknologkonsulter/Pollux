import os
import platform
import installDocker as idoc


def run():
    containerName = input(" Create a name for your container: ")
	password = input(" Create a password for your PSQL: ")

	cmd1 = "docker run --name " + containerName + " -e POSTGRES_PASSWORD=[your_password] -d postgres"

    # Access container bash terminal
    cmd2 = "docker exec -it " + container_name + " /bin/bash"
    run_cmd2 = os.system(cmd2)




isInstalled = input("\n Do you have docker already installed on your machine?  Y/n \n")

if isInstalled == 'N' or isInstalled == 'n':
    idoc.install("dockerPSQL.py")

else:
    run()