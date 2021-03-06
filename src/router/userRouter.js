const koaRouter = require('koa-router')

const {
  createUser,
  isExist,
  authCheck,
  login,
  getUserAvatar,
  updateUser,
  getUsers,
  forbidUser
} = require('../controller/userController')
const authToken = require('../middleware/authToken')
const adminToken = require('../middleware/adminToken')

const router = new koaRouter({
  prefix: '/user',
})

router.post('/', isExist, createUser) // 创建用户
router.get('/', adminToken, getUsers) // 获取所有用户
router.patch('/', adminToken, forbidUser) // 创建用户
router.post('/update', authToken, isExist, updateUser) // 修改用户信息
router.post('/login', authCheck, login) // 用户登陆

router.get('/:userId/avatar', getUserAvatar)

module.exports = router
