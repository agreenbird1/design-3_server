const koaRouter = require('koa-router')

const {
  saveAvatar
} = require('../controller/fileController')
const { avatarHandler } = require('../middleware/filemidwares')


const router = new koaRouter({
  prefix: '/upload'
})

router.post('/avatar', avatarHandler, saveAvatar)

module.exports = router