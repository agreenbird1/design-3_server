const dotenv = require('dotenv') // env环境变量加载
dotenv.config()


module.exports = {
  APP_PORT,
  APP_DEV,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env