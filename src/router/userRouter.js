const koaRouter = require('koa-router')

const {
  createUser,
  isExist
} = require('../controller/userController')

const router = new koaRouter({
  prefix: '/user'
})

router.post('/', isExist, createUser) // 创建用户


module.exports = router