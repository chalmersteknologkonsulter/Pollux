//
// Created by Leith on 2020/04/29.
//

#include <stdio.h>
#include "util/hostUtil.h"
#include "util/stringUtil.h"
#include "manager/executionManager.h"

int main(int argc, char *argv[]) {
    //Identify host OS Platform
    const char *hostOS = get_platform_name();
    int *hostOSId = get_platform_id();

    //State identified platform
    char *hostIdString[getintLength(hostOSId)+1];
    intToString(*hostIdString, hostOSId);
    puts(concat(concat( "Host Platform identified as ", hostOS), concat(" with ID ", *hostIdString)));

    //Install React Application and template on host system
    executeInstallation(hostOSId);

    return 0;
}
