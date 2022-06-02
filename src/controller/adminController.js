const jwt = require('jsonwebtoken')
const {
  getAdminByName,
  getAdminByPassword,
} = require('../service/adminService')
const {
  ADMIN_DOES_NOT_EXIST,
  PASSWORD_IS_INCORRECT,
} = require('../constants/errTypes')

const { PRIVATE_KEY } = require('../app/config')

const adminCheck = async (ctx, next) => {
  const { name, password } = ctx.request.body
  const nameAdmin = await getAdminByName(name)
  if (!nameAdmin.length) {
    return ctx.app.emit('error', new Error(ADMIN_DOES_NOT_EXIST), ctx)
  }
  const passwordAdmin = await getAdminByPassword(name, password)
  if (!passwordAdmin.length) {
    return ctx.app.emit('error', new Error(PASSWORD_IS_INCORRECT), ctx)
  }
  ctx.admin = passwordAdmin[0]
  await next()
}

const login = async (ctx) => {
  const { id, type, name, password } = ctx.admin
  const token = jwt.sign({ id, type, name }, PRIVATE_KEY, {
    algorithm: 'RS256', // 加密算法
    expiresIn: 60 * 60 * 24 * 7, // 过期时间
  })

  ctx.body = {
    id,
    type,
    name,
    token,
  }
}

module.exports = {
  adminCheck,
  login,
}
