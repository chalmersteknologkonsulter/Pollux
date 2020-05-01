//
// Created by Leith on 2020/04/29.
//

#ifndef SCRIPT_STRINGUTIL_H
#define SCRIPT_STRINGUTIL_H

#include "stdbool.h"

char* concat(const char *s1, const char *s2);
bool* stringEquals(const char *s1, const char *s2);
int getintLength(int num);
void intToString(char str[], int num);
//int stringToInt(char str[]);

#endif //SCRIPT_STRINGUTIL_H
