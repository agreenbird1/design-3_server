const koaRouter = require('koa-router')

const { adminCheck, login } = require('../controller/adminController')

const router = new koaRouter({
  prefix: '/admin',
})

router.post('/login', adminCheck, login)

module.exports = router
