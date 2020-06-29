install:
	@echo install npm dependencies
	npm install
	@echo done

default: build

build: build-dist

build-dist: 
	@echo build for production 
	npm run build
	@echo done

clean:
	@echo remove build folders
	rm -rf dist dev .cache
	@echo done

clean-all: clean
	rm -rf node_modules
 

local-start:
	npm run dev