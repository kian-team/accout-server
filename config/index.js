const path = require('path')

module.exports = {
  port: '5555',
  secret: 'secret',
  publicDir: path.resolve(__dirname, '../public'),
  staticPath: path.resolve(__dirname, '../static'),
  logPath: path.resolve(__dirname, '../logs/koa-template.log'),
  mongoDB: {
    database: 'mall',
    username: 'root',
    password: 'root',
    host: '127.0.0.1',
    port: 27017
  },
  MysqlConfig: {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'koa_demo',
    port: 3306,
    multipleStatements: true
  }
}