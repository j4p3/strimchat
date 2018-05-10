import Sequelize from 'sequelize';

const DB_USER = process.env.STRIMPACK_DB_USER;
const DB_PASSWORD = process.env.STRIMPACK_DB_PASSWORD;
const DB_NAME = process.env.STRIMPACK_DB_NAME;
const DB_HOST = process.env.STRIMPACK_DB_HOST;
const DB_PORT = process.env.STRIMPACK_DB_PORT;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const User = db.define('user');

const Message = db.define('message', {
  author: Sequelize.STRING,
  content: Sequelize.TEXT,
  echoes: Sequelize.INTEGER,
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  timestamps: true,
  underscored: true
});

export { db, Message };
