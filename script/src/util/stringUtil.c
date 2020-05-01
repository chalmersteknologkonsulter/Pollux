//
// Created by Leith on 2020/04/29.
//

#include <stdlib.h>
#include <string.h>
#include <math.h>
#include "stringUtil.h"

//Concatenate two 'strings'
char* concat(const char *s1, const char *s2) {
    const size_t len1 = strlen(s1);
    const size_t len2 = strlen(s2);
    char *result = malloc(len1 + len2 + 1); // +1 for the null-terminator
    // in real code you would check for errors in malloc here
    memcpy(result, s1, len1);
    memcpy(result + len1, s2, len2 + 1); // +1 to copy the null-terminator
    return result;
}

//Check two 'strings' for equality
bool* stringEquals(const char *s1, const char *s2) {
    bool* ret = false;
    if (strcmp(s1, s2) == 0) {
        ret = true;
    }
    return ret;
}

//Get the string length of an int
int getintLength(int num) {
    int n, len = 0;
    n = num;
    while (n != 0) {
        len++;
        n /= 10;
    }
    return len;
}

//Get the string that represents a 'string'
void intToString(char str[], int num) {
    int i, rem, len = getintLength(num), n;

    for (i = 0; i < len; i++) {
        rem = num % 10;
        num = num / 10;
        str[len - (i + 1)] = rem + '0';
    }
    str[len] = '\0';
}

//Parse an int into a 'string'
//int stringToInt(char str[]) {
//    int len = strlen(str);
//    int i, num = 0;
//
//    for (i = 0; i < len; i++)
//    {
//        num = num + ((str[len - (i + 1)] - '0') * pow(10, i));
//    }
//
//   return num;
//}