import os
import platform

install_express = input("Would like to build an express server? Y/n ")

if (install_express == "n" or install_express == "N"):
  print("Bye!")
  exit()
else:
  os_type = platform.system()
  print(os_type)

  # install node

  ################ UNIX  ###################
  npm_installed = input("Do you have npm installed on your computer? Y/n ")
  if (npm_installed == "n" or npm_installed == "N"):
    if (os_type == "Linux" or os_type == "Darwin"): 
      os.system("sudo apt-get install node")
    elif (os_type == "Darwin"):
      os.system("brew install node")


  ################ Windows  ###################

    elif (os_type == "Windows"):
      os.system("Download node.js via : https://nodejs.org/en/download/")
      

  #install the application generator as a global npm package
  os.system("sudo npm install -g express-generator")

  app_name = input(" Create a name for your app: ")
  os.system("express --view=pug " + app_name)

  run_cmd3 = os.chdir(app_name)
  # varify the path using getcwd()
  cwd = os.getcwd()
  # print the current directory
  print("Current working directory is:", cwd)

  cmd = "cat appTemplate.js >> " + app_name
  print(cmd)
  os.system(cmd)

  cmd4 = "npm install"
  print(cmd4)
  run_cmd4 = os.system(cmd4)

  if (os_type == "Linux" or os_type == "Darwin"):
    cmd5 = "DEBUG=" + app_name + ":* npm start"
  elif (os_type == "Windows"):
    cmd5 = "SET DEBUG=" + app_name + ":* & npm start"

  print(cmd5)
  run_cmd5 = os.system(cmd5)
