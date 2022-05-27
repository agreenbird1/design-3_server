const jwt = require('jsonwebtoken')

const {
  createUser: createUserSer,
  getUser: getUserSer,
  login: loginSer
} = require('../service/userService')
const {
  USER_ALREADY_EXIST
} = require('../constants/errTypes')
const encryptByMd5 = require('../utils/encryptByMd5')
const {
  PRIVATE_KEY
} = require('../app/config')

const createUser = async (ctx, next) => {
  const user = ctx.request.body
  const result = await createUserSer(user)

  ctx.body = {
    id: result[0].insertId
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
  const { id, username } = ctx.user
  console.log(ctx.user)
  const token = jwt.sign({ id, username }, PRIVATE_KEY, {
    algorithm: 'RS256', // 加密算法
    expiresIn: 60 * 60 * 24 * 7 // 过期时间
  })
  // 返回数据
  ctx.body = {
    id,
    username,
    token
  }
}

module.exports = {
  createUser,
  isExist,
  authCheck,
  login
}