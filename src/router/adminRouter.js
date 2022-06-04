const koaRouter = require('koa-router')

const {
  adminCheck,
  login,
  addCategory,
  deleteCategory,
  patchCategory
} = require('../controller/adminController')
const adminToken = require('../middleware/adminToken')

const router = new koaRouter({
  prefix: '/admin',
})

router.post('/login', adminCheck, login)
router.post('/category', adminToken, addCategory)
router.delete('/category', adminToken, deleteCategory)
router.patch('/category', adminToken, patchCategory)

module.exports = router