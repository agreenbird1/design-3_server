const koaRouter = require('koa-router')

const {
  saveAvatar
} = require('../controller/fileController')
const { avatarHandler } = require('../middleware/filemidwares')
const authToken = require('../middleware/authToken')


const router = new koaRouter({
  prefix: '/upload'
})
router.post('/avatar', authToken, avatarHandler, saveAvatar)

module.exports = router