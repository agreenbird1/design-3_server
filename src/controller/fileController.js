const {
  saveAvatar: saveAvatarSer,
  getAvatar: getAvatarSer,
  deleteAvatar: deleteAvatarSer,
} = require('../service/fileService')
const {
  uploadAvatarByUserId: uploadAvatarByUserIdSer,
} = require('../service/userService')
const { APP_DEV } = require('../app/config')

const saveAvatar = async (ctx) => {
  const { filename, mimetype, size } = ctx.req.file
  console.log(ctx.req.file)
  const { id } = ctx.user
  // 首先查看该用户是否已经有了头像
  const avatar = await getAvatarSer(id)
  // // 如果有，先删除
  if (avatar[0].length) {
    await deleteAvatarSer(id)
  }
  const result = await saveAvatarSer(filename, mimetype, size, id)
  ctx.body = 'http://' + APP_DEV + '/user/' + id + '/avatar'
}

module.exports = {
  saveAvatar,
}
