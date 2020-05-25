#A simple script to update the wordpress database to reflect a change in hostname
#Run this after changing the hostname / IP of a wordpress server
import os
import platform

systemPlatform = platform.system()

#Prompt for current host name
# Usually defined in nginx config.
print("Enter new hostname: ")
host = input()

#Prompt for db ascociated with said wp hostname
# Find in $app_root/wp-config.php
print("Enter db name for current host: ")
dbName = input()

#Prompt for mysql root password
print("Enter mysql root password: ")
sqlPassword = input()

# Get MySQL Connection
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  passwd=sqlPassword,
  database=dbName
)
# Connect to DB
mycursor = mydb.cursor()

# sqlCommand="mysql -u root -p" + sqlPassword + " wp_mtw -e"



#Determine what the old URL was and save to variable
# OLD_URL=$(mysql -u root -p$SQL_PASSWORD $DB_NAME -e 'select option_value from $DB_NAMEoptions where option_id = 1;' | grep http)
mycursor.execute("select option_value from " + dbName + "options where option_id = 1;")

oldUrl="null"

myresult = mycursor.fetchall()
for row in myresult:
  if("http" in row):
  	oldUrl = row;

#SQL statements to update database to new hostname
mycursor.execute("UPDATE " + dbName + "options SET option_value = replace(option_value, '" + oldUrl "', 'http://" + host + "') WHERE option_name = 'home' OR option_name = 'siteurl';"
mycursor.execute("UPDATE " + dbName + "posts SET guid = replace(guid, '" + oldUrl + "','http://" + host + "');"
mycursor.execute("UPDATE " + dbName + "posts SET post_content = replace(post_content, '" + oldUrl + "', 'http://" + host + "');"
mycursor.execute("UPDATE " + dbName + "postmeta SET meta_value = replace(meta_value,'" + oldUrl + "', 'http://" + host + "');"


mydb.close()

# $SQL_COMMAND "UPDATE $DB_NAMEoptions SET option_value = replace(option_value, '$OLD_URL', 'http://$HOST') WHERE option_name = 'home' OR option_name = 'siteurl';"
# $SQL_COMMAND "UPDATE $DB_NAMEposts SET guid = replace(guid, '$OLD_URL','http://$HOST');"
# $SQL_COMMAND "UPDATE $DB_NAMEposts SET post_content = replace(post_content, '$OLD_URL', 'http://$HOST');"
# $SQL_COMMAND "UPDATE $DB_NAMEpostmeta SET meta_value = replace(meta_value,'$OLD_URL','http://$HOST');"

