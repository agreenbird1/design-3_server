const {
  createUser: createUserSer,
  getUser: getUserSer
} = require('../service/userService')
const {
  USER_ALREADY_EXIST
} = require('../constants/errTypes')

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

module.exports = {
  createUser,
  isExist
}