const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv') // env环境变量加载
const PRIVATE_KEY = fs.readFileSync(path.join(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.join(__dirname, './keys/public.key'))
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

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY