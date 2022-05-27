const koa = require('koa')
const useRoutes = require('../router')
const bodyParser = require('koa-bodyparser') // json数据格式解析
const errorHandler = require('./error')
require('./database')

const app = new koa()
app.useRoutes = useRoutes
app.use(bodyParser())
app.useRoutes()

// 错误处理
app.on('error', errorHandler)

module.exports = app