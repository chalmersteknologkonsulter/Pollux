//
// Created by Leith on 2020/04/30.
//

#include "stdio.h"
#include <stdlib.h>
#include "executionManager.h"
#include <unistd.h>
#include "../util/stringUtil.h"

//TODO: Read application name from JSON file, or other input
char *applicationName = "ctk_template";

const char *linux_printTime = "echo \n date +'%a %b %e %H:%M:%S %Z %Y\n'";

void executeInstallation(int host) {
    switch (host) {
        case 1: //linux

            //Check if running as root
            if(geteuid() != 0) {
                puts("This script must be run as root");
                exit(-1);
            } else {
                system("echo 'Started'");
                system(linux_printTime);
            }

            //Prepare Linux commands
            const char *linux_updateApt = "apt update";
            const char *linux_installNodeJS = "apt install -y nodejs npm";
            const char *linux_installNpmServe = "npm install -g serve";
            const char *linux_initialiseReactApp = concat(concat(concat(concat("npx create-react-app ", applicationName), "\ncd "), applicationName), "\nnpm start");

            //update apt repositories
            puts("Updating apt repositories");
            system(linux_updateApt);

            //install React
            puts("Installing React");
            system(linux_installNodeJS);
            system(linux_installNpmServe);

            //initialise React app
            puts(concat("Initialising React application ", applicationName));
            system(linux_initialiseReactApp);

            //State finished
            system("echo '\nFinished'");
            system(linux_printTime);

            break;


        default:
            puts("\"Unknown system\" error!");
    }
}