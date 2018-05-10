const { Client } = require('pg');
import { Message } from './db';

const DB_USER = process.env.STRIMPACK_DB_USER;
const DB_PASSWORD = process.env.STRIMPACK_DB_PASSWORD;
const DB_NAME = process.env.STRIMPACK_DB_NAME;
const DB_HOST = process.env.STRIMPACK_DB_HOST;
const DB_PORT = process.env.STRIMPACK_DB_PORT;

const initializeClient = () => {
  return new Client({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    database: DB_NAME,
    port: DB_PORT,
  });
}

const delay = (duration) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

const connect = async (client) => {
  console.log('\x1b[32m%s\x1b[0m', 'DB creating connection');
  await delay(5000);
  return client.connect().then(() => client).catch((e) => {
    console.log('\x1b[31m%s\x1b[0m', 'DB awaiting connection');
    return connect(initializeClient());
  });
}

connect(initializeClient()).then((pg) => {
  console.log('\x1b[32m%s\x1b[0m', 'DB connection established.');
  return Message.sync();
}).then(() => {
  console.log('\x1b[32m%s\x1b[0m', 'Table synced: Message')
  process.exit(0);
  return;
}).catch((e) => {
  console.log(e);
  console.log('\x1b[31m%s\x1b[0m', 'DB sync failed, exiting');
  return;
});

