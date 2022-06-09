const koaRouter = require('koa-router')

const { saveAvatar, saveProductPic,deleteProductPic,storeProductPic } = require('../controller/fileController')
const { avatarHandler, productHandler } = require('../middleware/filemidwares')
const adminToken = require('../middleware/adminToken')
const authToken = require('../middleware/authToken')

const router = new koaRouter({
  prefix: '/upload',
})
router.post('/avatar', authToken, avatarHandler, saveAvatar)
router.post('/product', productHandler, saveProductPic)
router.post('/picture',adminToken, storeProductPic)
router.delete('/product', deleteProductPic)

module.exports = router
