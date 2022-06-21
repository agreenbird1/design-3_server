const koaRouter = require('koa-router')

const adminToken = require('../middleware/adminToken')
const authToken = require('../middleware/authToken')
const {
  addProduct,
  getProduct,
  getPicture,
  patchProduct,
  deleteProduct,
  getProductByCategory,
  getProductByKeyWords,
  getProductBySubCategory,
  getProductById,
  getProductByCollect
} = require('../controller/productController')

const router = new koaRouter({
  prefix: '/product',
})

router.get("/apro", getProductById)
router.get("/recommend", getProductByCollect)
router.get("/", getProduct)
router.get("/associate", getProductByKeyWords)
router.get("/category/:category_id", getProductByCategory)
router.get("/subcategory", getProductBySubCategory)
router.get("/:filename", getPicture)
router.post("/", adminToken, addProduct)
router.patch("/", adminToken, patchProduct)
router.delete("/", adminToken, deleteProduct)


module.exports = router