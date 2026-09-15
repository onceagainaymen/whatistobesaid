DOCKER=docker
COMPOSE=docker compose -f docker-compose.dev.yml
PROD_COMPOSE=docker compose -f docker-compose.prod.yml
UP=up
DOWN=down
BUILD=up --build
FREE=down -v
LIST=ps
LOGS=logs -f

all:
	$(COMPOSE) $(UP)

build:
	$(COMPOSE) $(BUILD)

status:
	@$(COMPOSE) $(LOGS)

list:
	@$(COMPOSE) $(LIST) --format "{{.Names}} {{.Status}}"

down:
	$(COMPOSE) $(DOWN)

free:
	$(COMPOSE) $(FREE)
	rm -rf ./app/.db_initialized
	rm -rf ./app/public/uploads/*

restart: free build

nuke:
	$(COMPOSE) $(FREE) --rmi all --remove-orphans
	$(DOCKER) system prune -a --volumes -f
	rm -rf ./app/public/uploads/*

prod:
	$(PROD_COMPOSE) up --build -d

prod-down:
	$(PROD_COMPOSE) $(DOWN)

prod-status:
	@$(PROD_COMPOSE) $(LOGS)

prod-free:
	$(PROD_COMPOSE) $(FREE)
	rm -rf ./app/.db_initialized
	rm -rf ./app/public/uploads/*
