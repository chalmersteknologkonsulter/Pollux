import os
import platform

#install the application generator as a global npm package 
cmd1 = "sudo npm install -g express-generator"
print(cmd1)
run_cmd1 = os.system(cmd1)

#launch the application generator
#os.system("express")
#print(run_cmd1)
#trial2 = os.system("express -h")
#print(trial2)

app_name = input("What is the name of your app?")
#print(app_name)

cmd2 = "express --view=pug " + app_name
print(cmd2)
run_cmd2 = os.system(cmd2)
#print(run_cmd2)

run_cmd3 = os.chdir(app_name)
# varify the path using getcwd() 
cwd = os.getcwd() 
# print the current directory 
print("Current working directory is:", cwd)

cmd4 = "npm install"
print(cmd4)
run_cmd4 = os.system(cmd4)
#print(run_cmd4)

# os_type = input("""
# Which os are you using? (Type the corresponding number)
#1. Windows
#2. MacOS/Linux
#""")
# pr windows faaire pr MacOs/linux
os_type = platform.system()
print(os_type)
if (os_type == "Linux" or os_type == "Darwin"):
  cmd5 = "DEBUG=" + app_name + ":* npm start"
elif (os_type == "Windows"):
  cmd5 = "SET DEBUG=" + app_name + ":* & npm start"

print(cmd5)
run_cmd5 = os.system(cmd5)
#print(run_cmd5)