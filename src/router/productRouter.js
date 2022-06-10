const koaRouter = require('koa-router')

const adminToken = require('../middleware/adminToken')
const { addProduct, getProduct,getPicture } = require('../controller/productController')

const router = new koaRouter({
  prefix: '/product',
})

router.post("/", adminToken, addProduct)
router.get("/", adminToken, getProduct)
router.get("/:filename", getPicture)

module.exports = router