#!/bin/bash

#Install a new wordpress.
#Ensure wp cli is installed.
#Ensure php is installed
#Ensure mysql is installed

echo "Enter new sitename (nospaces): "
read HOST
echo "Enter mysql root password: "
read -s SQL_PASSWORD
echo "Enter new wp-username : "
read WP_USER
echo "Enter new wp-password "
read -s WP_PASSWORD
echo "Enter new wp-password recovery email "
read WP_EMAIL



SQL_COMMAND="mysql -u root -p$SQL_PASSWORD -e"
$SQL_COMMAND "CREATE DATABASE wp_$HOST;"
$SQL_COMMAND "CREATE USER 'wp-$HOST'@'localhost' identified by '$WP_PASSWORD';"
$SQL_COMMAND "GRANT ALL PRIVILEGES ON wp_$HOST.* TO 'wp-$WP_USER'@'localhost';"
$SQL_COMMAND "FLUSH PRIVILEGES;"

wp core download --path=/var/www/$HOST
cd /var/www/$HOST
wp config create --dbname=wp_$HOST --dbuser=wp-$WP_USER --dbpass=$WP_PASSWORD


#Default nginx config
echo "server{													" >> /var/www/$HOST/nginx.conf
echo "    server_name $HOST.ctk.se;								" >> /var/www/$HOST/nginx.conf
echo "    index index.php;										" >> /var/www/$HOST/nginx.conf
echo "    root /var/www/$HOST;									" >> /var/www/$HOST/nginx.conf
echo "															" >> /var/www/$HOST/nginx.conf
echo "    client_max_body_size 32m;								" >> /var/www/$HOST/nginx.conf
echo "															" >> /var/www/$HOST/nginx.conf
echo "    location / {											" >> /var/www/$HOST/nginx.conf
echo "        try_files \$uri \$uri/ /index.php\$is_args\$args;	" >> /var/www/$HOST/nginx.conf
echo "    }														" >> /var/www/$HOST/nginx.conf
echo "															" >> /var/www/$HOST/nginx.conf
echo "        location ~ \.php\$ {								" >> /var/www/$HOST/nginx.conf
echo "        include snippets/fastcgi-php.conf;				" >> /var/www/$HOST/nginx.conf
echo "        fastcgi_pass unix:/run/php/php7.3-fpm.sock;		" >> /var/www/$HOST/nginx.conf
echo "    }														" >> /var/www/$HOST/nginx.conf
echo "															" >> /var/www/$HOST/nginx.conf
echo "    listen 80;											" >> /var/www/$HOST/nginx.conf
echo "															" >> /var/www/$HOST/nginx.conf
echo "}															" >> /var/www/$HOST/nginx.conf

#Link site nicely to nginx.
sudo ln -s /var/www/$HOST/nginx.conf /etc/nginx/sites-available/$HOST.ctk.se
sudo ln -s /etc/nginx/sites-available/$HOST.ctk.se /etc/nginx/sites-enabled/$HOST.ctk.se

# Add site to fastpass proxy
sudo nginx -s reload

#Certificate
sudo certbot -d $HOST.ctk.se --nginx -n

#Chow for updates
sudo chown -R www-data:www-data /var/www/$HOST/

echo "Now all thats left to do it to either add the ipadress of this server to you host file in the model "ip.nu.mb.er $HOST.ctk.se".
echo "Or even better ask the local CIO to add an 'A' record for $HOST.ctk.se."

