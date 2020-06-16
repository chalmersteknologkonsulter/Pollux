import os
import platform

systemPlatform = platform.system()

if systemPlatform == "Linux":
	
	# Confirm that we are running as root
	if os.geteuid() != 0:
	    exit("You need to have root privileges to run this script.\nPlease try again, this time using 'sudo'. Exiting.")

	# Install dependencies
	os.system("apt update")
	os.system("apt install php nginx python3-pip certbot python3-certbot-nginx -y")
	os.system("pip3 install mysql-connector-python crossplane")
	import mysql.connector 

	# Install Wordpress CLI
	os.system("wget https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar")
	os.system("chmod +x wp-cli.phar")
	os.system("sudo mv wp-cli.phar /usr/local/bin/wp")

	# Check that wp cli is working as expected
	os.system("wp --info")


	print("Enter new sitename (nospaces): ")
	host = input();
	print("Enter mysql root password: ")
	sql_password = input();
	print("Enter new wp-username: ")
	wp_user = input();
	print("Enter new wp-password: ")
	wp_password = input();
	print("Enter new wp-password recovery email: ")
	wp_email = input();

	# Connect to database
	mydb = mysql.connector.connect(
	  host="localhost",
	  user="root",
	  password=sql_password
	)
	mycursor = mydb.cursor()
 
	# Configure database
	databaseName = "wp_" + host

	mycursor.execute("CREATE DATABASE " + databaseName + ";")
	print("Database created")
	mycursor.execute("CREATE USER 'wp-" + wp_user + "'@'localhost' identified by '" + wp_password + "';")
	print("User created")
	mycursor.execute("GRANT ALL PRIVILEGES ON " + databaseName + ".* TO 'wp-" + wp_user + "'@'localhost';")
	print("Privileges granted")
	mycursor.execute("FLUSH PRIVILEGES;")


	os.system("sudo -u www-data wp core download --path=/var/www/" + host)
	os.system("cd /var/www/" + host)
	os.system("sudo -u www-data wp config create --dbname=" + databaseName + " --dbuser=wp-" + wp_user + " --dbpass=" + wp_password + " --path='/var/www/" + host + "'")

	# Get nginx config file
	nginxConfigFileName = "/var/www/" + host + "/nginx.conf"
	nginxConfigFile = open(nginxConfigFileName, "a")

	# Default nginx config
	#  To be implemented https://www.digitalocean.com/community/tools/nginx?domains.0.server.domain=testh.ctk.se&domains.0.server.path=%2Fvar%2Fwww%2Ftesth&domains.0.https.letsEncryptEmail=info%40test.co&domains.0.php.wordPressRules=true
	nginxConfigFile.write("server{\n")
	nginxConfigFile.write("    listen                  443 ssl http2;\n")
	nginxConfigFile.write("    listen                  [::]:443 ssl http2;\n")
	nginxConfigFile.write("    server_name             " + host + ".ctk.se;\n")
	nginxConfigFile.write("    set                     $base /var/www/" + host + ";\n")
	nginxConfigFile.write("    root                    $base/public;\n")
	nginxConfigFile.write("\n")
	nginxConfigFile.write("\n")
	nginxConfigFile.write("    # security\n")
	nginxConfigFile.write("    include                 nginxconfig.io/security.conf;\n")
	nginxConfigFile.write("\n")
	nginxConfigFile.write("    # index.php\n")
	nginxConfigFile.write("    index                   index.php;\n")
	nginxConfigFile.write("# additional config\n")
	nginxConfigFile.write("    include nginxconfig.io/general.conf;\n")
	nginxConfigFile.write("    include nginxconfig.io/wordpress.conf;\n")
	nginxConfigFile.write("\n")
	nginxConfigFile.write("    # handle .php\n")
	nginxConfigFile.write(r"    location ~ \.php$ {\n")
	nginxConfigFile.write("        include nginxconfig.io/php_fastcgi.conf;\n")
	nginxConfigFile.write("    }\n")
	nginxConfigFile.write("}\n")

	nginxConfigFile.close()

	# Link site nicely to nginx.
	os.system("sudo ln -s /var/www/" + host + "/nginx.conf /etc/nginx/sites-available/" + host + ".ctk.se")
	os.system("sudo ln -s /etc/nginx/sites-available/" + host + ".ctk.se /etc/nginx/sites-enabled/" + host + ".ctk.se")

	# Add site to fastpass proxy
	os.system("sudo nginx -s reload")

	# Certificate
	os.system("sudo certbot -d " + host + ".ctk.se --nginx -n --agree-tos --email " + wp_email)

	# Chown for updates
	os.system("sudo chown -R www-data:www-data /var/www/" + host + "/")

	print("Now all thats left to do it to either add the ipadress of this server to you host file in the model \"ip.nu.mb.er $" + host + ".ctk.se\".")
	print("Or even better ask the local CIO to add an 'A' record for " + host + ".ctk.se.")

else:
	# No reason to set up Wordpress on a non Linux system
	print("Sorry, your operating system is not supported.")
