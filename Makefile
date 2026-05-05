DOCKER=docker
COMPOSE=compose
UP=up
DOWN=down
BUILD=up --build
FREE=down -v

all:
	$(DOCKER) $(COMPOSE) $(UP)

build: 
	$(DOCKER) $(COMPOSE) $(BUILD)

down:
	$(DOCKER) $(COMPOSE) $(DOWN)

free:
	$(DOCKER) $(COMPOSE) $(FREE)

restart: free build

nuke:
	$(DOCKER) $(COMPOSE) $(FREE) --rmi all --remove-orphans
	$(DOCKER) system prune -a --volumes -f
