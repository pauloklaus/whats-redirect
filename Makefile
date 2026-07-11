.DEFAULT_GOAL := help

NODE_IMAGE := node:24-alpine
DOCKER_VOLUME := -v "$(CURDIR):/app" -w /app
DOCKER_RUN := docker run --rm $(DOCKER_VOLUME) $(NODE_IMAGE)

.PHONY: help install dev build typecheck lint format icons test coverage

help:
	@echo "WhatsRedirect — available commands:"
	@echo ""
	@echo "  make install    Install npm dependencies (Docker, always runs npm install)"
	@echo "  make dev        Start development server (Docker, http://localhost:5173)"
	@echo "  make build      Production build (output: dist/)"
	@echo "  make typecheck  TypeScript check (vue-tsc)"
	@echo "  make lint       ESLint check"
	@echo "  make format     Prettier format (writes files)"
	@echo "  make test       Run unit tests (Vitest)"
	@echo "  make coverage   Run tests with coverage report (min. 80%)"
	@echo "  make icons      Regenerate PWA, favicon, and OG images from public/icons/icon.svg"
	@echo ""

node_modules: package.json package-lock.json
	@$(DOCKER_RUN) sh -c "npm install"

install:
	@$(DOCKER_RUN) sh -c "npm install"

dev: node_modules
	@docker run --rm -it \
		-p 5173:5173 \
		$(DOCKER_VOLUME) \
		$(NODE_IMAGE) \
		sh -c "npm run dev -- --host 0.0.0.0"

build: node_modules
	@$(DOCKER_RUN) sh -c "npm run build"

typecheck: node_modules
	@$(DOCKER_RUN) sh -c "npm run typecheck"

lint: node_modules
	@$(DOCKER_RUN) sh -c "npm run lint"

format: node_modules
	@$(DOCKER_RUN) sh -c "npm run format"

test: node_modules
	@$(DOCKER_RUN) sh -c "npm run test"

coverage: node_modules
	@$(DOCKER_RUN) sh -c "npm run test:coverage"

icons: node_modules
	@$(DOCKER_RUN) sh -c "apk add --no-cache fontconfig ttf-dejavu \
		&& fc-cache -f \
		&& npm run generate:icons"
