#!/bin/bash

#A simple script to update the wordpress database to reflect a change in hostname
#Run this after changing the hostname / IP of a wordpress server

#Prompt for current host name
# Usually defined in nginx config.
read -s "Enter new hostname: " HOST
#Prompt for db ascociated with said wp hostname
# Find in $app_root/wp-config.php
read -s "Enter db name for current host." DB_NAME
#Prompt for mysql root password
read -s -p "Enter mysql root password: " SQL_PASSWORD

SQL_COMMAND="mysql -u root -p$SQL_PASSWORD wp_mtw -e"

#Determine what the old URL was and save to variable
OLD_URL=$(mysql -u root -p$SQL_PASSWORD $DB_NAME -e 'select option_value from $DB_NAMEoptions where option_id = 1;' | grep http)
HOST=$(HOST)

#SQL statements to update database to new hostname
$SQL_COMMAND "UPDATE $DB_NAMEoptions SET option_value = replace(option_value, '$OLD_URL', 'http://$HOST') WHERE option_name = 'home' OR option_name = 'siteurl';"
$SQL_COMMAND "UPDATE $DB_NAMEposts SET guid = replace(guid, '$OLD_URL','http://$HOST');"
$SQL_COMMAND "UPDATE $DB_NAMEposts SET post_content = replace(post_content, '$OLD_URL', 'http://$HOST');"
$SQL_COMMAND "UPDATE $DB_NAMEpostmeta SET meta_value = replace(meta_value,'$OLD_URL','http://$HOST');"

