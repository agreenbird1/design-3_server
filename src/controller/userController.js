const fs = require('fs')
const jwt = require('jsonwebtoken')

const {
  createUser: createUserSer,
  getUser: getUserSer,
  login: loginSer,
  getUserAvatar: getUserAvatarSer,
  updateUser: updateUserSer,
  addAddress: addAddressSer,
  updateAddress: updateAddressSer,
  deleteAddress: deleteAddressSer,
} = require('../service/userService')
const { getAvatar: getAvatarSer } = require('../service/fileService')
const {
  USER_ALREADY_EXIST,
  PASSWORD_IS_INCORRECT,
  USER_DOES_NOT_EXIST,
} = require('../constants/errTypes')
const encryptByMd5 = require('../utils/encryptByMd5')
const { PRIVATE_KEY } = require('../app/config')
const { AVATAR_PATH } = require('../constants/filePaths')

const createUser = async (ctx, next) => {
  const user = ctx.request.body
  const result = await createUserSer(user)
  ctx.body = {
    id: result[0].insertId,
  }
}

const isExist = async (ctx, next) => {
  const { username } = ctx.request.body
  const result = await getUserSer(username)
  if (result[0].length) {
    // 触发错误事件捕获
    return ctx.app.emit('error', new Error(USER_ALREADY_EXIST), ctx)
  }
  await next()
}

// 用户是否存在、密码是否正确
const authCheck = async (ctx, next) => {
  let { username, password } = ctx.request.body
  // 验证密码仍需加密
  password = encryptByMd5(password)
  const result = await getUserSer(username)
  // 用户不存在
  if (!result[0].length) {
    // 触发错误事件捕获
    return ctx.app.emit('error', new Error(USER_DOES_NOT_EXIST), ctx)
  }
  const user = await loginSer(username, password)
  // 密码是否正确
  if (!user[0].length) {
    // 触发错误事件捕获
    return ctx.app.emit('error', new Error(PASSWORD_IS_INCORRECT), ctx)
  }
  ctx.user = user[0][0]
  await next()
}

// 之前的中间件校验完成，做jwt
const login = async (ctx) => {
  const { id, username, gender, mobile } = ctx.user
  const token = jwt.sign({ id, username }, PRIVATE_KEY, {
    algorithm: 'RS256', // 加密算法
    expiresIn: 60 * 60 * 24 * 7, // 过期时间
  })
  let [[avRes]] = await getAvatarSer(id)
  // 如果没有头像，则使用默认头像
  let avatar
  if (avRes) {
    avatar = 'http://localhost:8000/user/' + id + '/avatar'
  } else {
    avatar = 'http://localhost:8000/user/0/avatar'
  }
  // 返回数据
  ctx.body = {
    id,
    username,
    token,
    gender,
    mobile,
    avatar,
  }
}

const getUserAvatar = async (ctx) => {
  const { userId } = ctx.params
  const [[result]] = await getUserAvatarSer(userId)

  //设置响应格式，方便展示图片内容
  ctx.response.set('content-type', result.mimetype)
  ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`)
}

const updateUser = async (ctx) => {
  const user = ctx.request.body
  user.id = ctx.user.id
  const result = await updateUserSer(user)
  ctx.body = 'ok'
}

const addAddress = async (ctx) => {
  const address = ctx.request.body
  const result = await addAddressSer({
    user_id: ctx.user.id,
    mobile: address.mobile,
    receiver: address.receiver,
    value: address.value + '|' + address.detailAddress,
  })
  ctx.body = 'ok'
}

const updateAddress = async (ctx) => {
  const address = ctx.request.body
  const result = await updateAddressSer({
    id: address.id,
    mobile: address.mobile,
    receiver: address.receiver,
    value: address.value + '|' + address.detailAddress,
  })
  ctx.body = 'ok'
}

const deleteAddress = async (ctx) => {
  const { id } = ctx.request.body
  const result = await deleteAddressSer(id)
  ctx.body = 'ok'
}

module.exports = {
  createUser,
  isExist,
  authCheck,
  login,
  getUserAvatar,
  updateUser,
  addAddress,
  updateAddress,
  deleteAddress,
}
