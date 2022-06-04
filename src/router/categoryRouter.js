const koaRouter = require('koa-router')

const {
  addCategory,
  deleteCategory,
  patchCategory,
  getCategory
} = require('../controller/categoryController')
const adminToken = require('../middleware/adminToken')

const router = new koaRouter({
  prefix: '/category',
})

router.post('/', adminToken, addCategory)
router.delete('/', adminToken, deleteCategory)
router.patch('/', adminToken, patchCategory)
router.get('/', adminToken, getCategory)

module.exports = router