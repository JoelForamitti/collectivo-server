# Collectivo-Server

A test implementation for https://github.com/MILA-Wien/collectivo-directus

## Local development

- Create .env file with `cp .env.example .env`
- Run `docker network create proxiable` (used by nginx in production)
- Run `docker compose up -d`

## Production system

Set up a reverse proxy (e.g. with https://www.linode.com/docs/guides/using-nginx-proxy-manager/)

Nginx for Keycloak needs (https://stackoverflow.com/questions/56126864)
```
proxy_buffer_size   128k;
proxy_buffers   4 256k;
proxy_busy_buffers_size   256k;
```
