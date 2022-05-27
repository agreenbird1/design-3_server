const jwt = require('jsonwebtoken')
const {
  PUBLIC_KEY
} = require('../app/config')
const {
  AUTHORIZATION_FAILED
} = require('../constants/errTypes')

const authToken = async (ctx, next) => {
  // 未发送token时候
  if (!ctx.headers['authorization']) {
    const error = new Error(AUTHORIZATION_FAILED)
    // 直接返回return、防止服务器内部发生错误
    return ctx.app.emit('error', error, ctx)
  }
  const token = ctx.headers['authorization'].replace('Bearer ', '')
  // 解密、验证token
  try {
    const user = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
    ctx.user = user
    await next()
  } catch (e) {
    // token无效时候发出错误
    const error = new Error(AUTHORIZATION_FAILED)
    ctx.app.emit('error', error, ctx)
  }
}

module.exports = authToken