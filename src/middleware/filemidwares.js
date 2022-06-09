const multer = require('koa-multer')
const {
  AVATAR_PATH,
  PRODUCT_PATH
} = require('../constants/filePaths')

const avatarUpload = multer({
  dest: AVATAR_PATH
})
const productUpload = multer({
  dest: PRODUCT_PATH
})
const avatarHandler = avatarUpload.single('avatar') // 发送请求中对应的字段名
const productHandler = productUpload.single('file') // 发送请求中对应的字段名
module.exports = {
  avatarHandler,
  productHandler
}