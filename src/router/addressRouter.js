const koaRouter = require('koa-router')

const authToken = require('../middleware/authToken')
const {
  addAddress,
  updateAddress,
  deleteAddress,
} = require('../controller/addressController')

const router = new koaRouter({
  prefix: '/address',
})

router.post('/', authToken, addAddress) // 添加收货地址
router.patch('/', authToken, updateAddress) // 更新收货地址
router.delete('/', authToken, deleteAddress) // 删除收货地址

module.exports = router
