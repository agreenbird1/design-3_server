const multer = require('koa-multer')
const {
  AVATAR_PATH
} = require('../constants/filePaths')

const avatarUpload = multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar') // 发送请求中对应的字段名
module.exports = {
  avatarHandler
}