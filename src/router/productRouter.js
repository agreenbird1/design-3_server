const koaRouter = require('koa-router')

const adminToken = require('../middleware/adminToken')
const { addProduct } = require('../controller/productController')

const router = new koaRouter({
  prefix: '/product',
})

router.post("/", adminToken, addProduct)

module.exports = router