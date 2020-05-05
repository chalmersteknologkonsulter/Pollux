#!/bin/bash
echo "setting sql things"
mysql -uroot -p123 -e 'ALTER USER "ctk" IDENTIFIED WITH mysql_native_password BY "123"' msqldb
mysql -uroot -p123 -e 'flush privileges' msqldb
