import os
import platform
import installDocker as idoc


def run():
    container_name = input("\n Enter new container name: ")
    mysql_root_pass = input("\n Insert new root password for mysql: ")

    cmd1 = "docker run --name " + container_name + " --expose=3306 -e MYSQL_ROOT_PASSWORD=" + mysql_root_pass + " -d mysql/mysql-server:latest"

    run_cmd1 = os.system(cmd1)

    print("\n Your docker mysql container is created!\n\n - Run \"mysql --user=\'root\' --password=\'my-root-pass-mysql\'\" and then paste your SQL dump file.\n - After the first step, run \"exit\" twice to return to your directory.\n")

    # Access container bash terminal
    cmd2 = "docker exec -it " + container_name + " /bin/bash"
    run_cmd2 = os.system(cmd2)

    # # Access mysql from container bash terminal
    # cmd3 = "mysql --user=\"root\" --password=" + mysql_root_pass
    # run_cmd3 = os.system(cmd3)

isInstalled = input("\n Do you have docker already installed on your machine?  Y/n \n")

if isInstalled == 'N' or isInstalled == 'n':
    idoc.install("dockerMySQL.py")

else:
    run()
    #id.install("dockerMySQL.py")