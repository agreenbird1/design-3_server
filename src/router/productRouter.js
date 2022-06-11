const koaRouter = require('koa-router')

const adminToken = require('../middleware/adminToken')
const {
  addProduct,
  getProduct,
  getPicture,
  patchProduct,
  deleteProduct,
  getProductByCategory
} = require('../controller/productController')

const router = new koaRouter({
  prefix: '/product',
})

router.post("/", adminToken, addProduct)
router.patch("/", adminToken, patchProduct)
router.delete("/", adminToken, deleteProduct)
router.get("/", adminToken, getProduct)
router.get("/category/:category_id", adminToken, getProductByCategory)
router.get("/:filename", getPicture)

module.exports = router