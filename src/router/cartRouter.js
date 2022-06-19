const koaRouter = require('koa-router')

const authToken = require('../middleware/authToken')

const {
  addCart,
  updateCart,
  deleteCart,
  getCart,
} = require('../controller/cartController')

const router = new koaRouter({
  prefix: '/cart',
})

router.post('/', authToken, addCart)
router.get('/', authToken, getCart)
router.patch('/', authToken, updateCart)
router.delete('/', authToken, deleteCart)

module.exports = router