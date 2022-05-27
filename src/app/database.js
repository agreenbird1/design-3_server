const mysql = require('mysql2')
const {
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require('./config')
const pool = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD
})

pool.getConnection((err, con) => {
  con.connect(err => {
    if (!err) console.log('数据库连接成功！')
  })
})

module.exports = pool.promise()