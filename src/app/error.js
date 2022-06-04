// 处理错误，确定错误的message和状态码
const {
  AUTHORIZATION_FAILED,
  PASSWORD_IS_INCORRECT,
  USER_DOES_NOT_EXIST,
  USER_ALREADY_EXIST,
  UNAUTHORIZED,
  ADMIN_DOES_NOT_EXIST,
  CATEGORY_IS_ALREADY_EXIST
} = require('../constants/errTypes')

const errHandler = (error, ctx) => {
  let message, status
  switch (error.message) {
    case AUTHORIZATION_FAILED:
      message = '无效的token'
      status = 401
      break
    case PASSWORD_IS_INCORRECT:
      message = '密码错误'
      status = 400
      break
    case USER_DOES_NOT_EXIST:
      message = '用户不存在'
      status = 400
      break
    case ADMIN_DOES_NOT_EXIST:
      message = '管理员不存在'
      status = 400
      break
    case USER_ALREADY_EXIST:
      message = '用户已经存在'
      status = 409
      break
    case UNAUTHORIZED:
      message = '您没有权限~'
      status = 401
      break
    case CATEGORY_IS_ALREADY_EXIST:
      message = '分类已经存在！'
      status = 400
      break
    default:
      message = 'NOT FOUND'
      status = 404
      break
  }
  ctx.body = message
  ctx.status = status
}

module.exports = errHandler
