# Strimchat

*Chat server for strimpack service.*

Runs a plain node server managing websocket connections from chat clients, broadcasting new messages & saving to db.

Written with ECMAwhatever and transpiled for node.

## npm commands:

* start: runs auto-restarting development server via babel-node
* sync: drops DB & updates schema to fit model definition
* build: builds bundles for distribution
* serve: runs node server from build files

## config

### .env
Expects env vars:
NODE_ENV
DB_USER
DB_PASSWORD
DB_NAME
DB_HOST
DB_PORT

## made with:

* node
* babel
* websockets
* postgres/sequelize