const koaRouter = require('koa-router')

const {
  createUser,
  isExist,
  authCheck,
  login,
  getUserAvatar,
  updateUser,
  addAddress,
  updateAddress,
} = require('../controller/userController')
const authToken = require('../middleware/authToken')

const router = new koaRouter({
  prefix: '/user',
})

router.post('/', isExist, createUser) // 创建用户
router.post('/update', authToken, updateUser) // 修改用户信息
router.post('/login', authCheck, login) // 用户登陆
router.post('/address/add', authToken, addAddress) // 添加收货地址
router.post('/address/update', authToken, updateAddress) // 添加收货地址
router.get('/:userId/avatar', getUserAvatar)

module.exports = router
