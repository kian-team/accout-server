const mysql = require('mysql');
const { MysqlConfig: config } = require('../config');

// let config = {
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'koa_demo',
//   port: 3306,
//   multipleStatements: true
// }

let pool = mysql.createPool(config);

let query = (sql, values) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err)
          } else {
            resolve(rows);
          }
          connection.release()
        })
      }
    })
  })
}

module.exports = {
  query
}