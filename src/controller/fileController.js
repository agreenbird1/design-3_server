const {
  saveAvatar: saveAvatarSer,
} = require('../service/fileService')
const {
  uploadAvatarByUserId: uploadAvatarByUserIdSer
} = require('../service/userService')

const saveAvatar = async (ctx) => {
  const { filename, mimetype, size } = ctx.req.file
  const { id } = ctx.user
  const result = await saveAvatarSer(filename, mimetype, size, id)
  // 还需要保存图片信息到用户表
  await uploadAvatarByUserIdSer(id, filename)
  ctx.body = result
}

module.exports = {
  saveAvatar
}