CONTAINER = asdf
PW = asdf
USER = asdf
DB = asdf
CUR_DIR = $(shell pwd)

all:
	append

append:
	rm -f ./sql/init/init.sql
	cat ./sql/clear.sql ./sql/schema.sql ./sql/views.sql ./sql/fixtures.sql ./sql/functions.sql >> ./sql/init/init.sql

clear:
	docker stop $(CONTAINER)  
	docker rm $(CONTAINER)

container: 
	docker run --name $(CONTAINER) -v $(CUR_DIR)/sql/init:/docker-entrypoint-initdb.d -e POSTGRES_USER=$(USER) -e POSTGRES_PASSWORD=$(PW) -e POSTGRES_DB=$(DB) -p 5432:5432 -d postgres:9.5
	docker ps