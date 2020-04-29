const Mysql = require('./mysql');
const Redis = require('./redis');

module.exports = {
  query: Mysql.query,
  setKey: Redis.setKey,
  getKey: Redis.getKey,
  setExpire: Redis.setExpire
}