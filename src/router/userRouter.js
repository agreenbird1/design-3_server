const koaRouter = require('koa-router')

const {
  createUser,
  isExist,
  authCheck,
  login
} = require('../controller/userController')

const router = new koaRouter({
  prefix: '/user'
})

router.post('/', isExist, createUser) // 创建用户
router.post('/login', authCheck, login) // 用户登陆
router.post('/upload/:userId',)

module.exports = router