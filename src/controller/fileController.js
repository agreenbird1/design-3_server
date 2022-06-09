const fs = require('fs')
const path = require('path')

const {
  saveAvatar: saveAvatarSer,
  getAvatar: getAvatarSer,
  deleteAvatar: deleteAvatarSer,
  storeProductPic: storeProductPicSer,
} = require('../service/fileService')
const {
  uploadAvatarByUserId: uploadAvatarByUserIdSer,
} = require('../service/userService')
const { APP_DEV } = require('../app/config')
const { request } = require('http')

const saveAvatar = async (ctx) => {
  const { filename, mimetype, size } = ctx.req.file
  const { id } = ctx.user
  // 首先查看该用户是否已经有了头像
  const avatar = await getAvatarSer(id)
  // // 如果有，先删除
  if (avatar[0].length) {
    fs.unlinkSync(
      path.join(__dirname, '../../uploads/avatar/' + avatar[0][0].filename)
    )
    await deleteAvatarSer(id)
  }
  const result = await saveAvatarSer(filename, mimetype, size, id)
  ctx.body = 'http://' + APP_DEV + '/user/' + id + '/avatar'
}

const saveProductPic = async (ctx) => {
  const { filename, mimetype } = ctx.req.file
  ctx.body = {
    filename, mimetype
  }

}

const deleteProductPic = async (ctx) => {
  fs.unlinkSync(
    path.join(__dirname, '../../uploads/picture/' + ctx.request.body.name)
  )
  ctx.body = 'ok'
}

const storeProductPic = async (ctx) => {
  const { id: product_id, pictures } = ctx.request.body
  await storeProductPicSer(product_id, pictures)
  ctx.body = 'ok'
}

module.exports = {
  saveAvatar,
  saveProductPic,
  deleteProductPic,
  storeProductPic
}
