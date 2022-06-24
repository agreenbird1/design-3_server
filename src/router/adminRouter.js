const koaRouter = require('koa-router')

const {
  adminCheck,
  login,
  addCategory,
  deleteCategory,
  patchCategory,
  getCategory,
  getAllAdmin,
  patchAdmin
} = require('../controller/adminController')
const adminToken = require('../middleware/adminToken')

const router = new koaRouter({
  prefix: '/admin',
})

router.post('/login', adminCheck, login)
router.post('/category', adminToken, addCategory)
router.delete('/category', adminToken, deleteCategory)
router.patch('/category', adminToken, patchCategory)
router.patch('/', adminToken, patchAdmin)
router.get('/category', adminToken, getCategory)
router.get('/', adminToken, getAllAdmin)

module.exports = router