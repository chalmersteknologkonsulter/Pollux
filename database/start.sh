#!/bin/bash
docker stop msqldb
docker rm msqldb
echo "starting docker"
docker run --name msqldb -p3306:3306 -d ctkp/mysql
docker start msqldb
docker ps
chmod +rx test.sh
docker exec -d msqldb /test.sh
docker start msqldb
