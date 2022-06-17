const jwt = require('jsonwebtoken')
const {
  getAdminByName,
  getAdminByPassword,
  addCategory: addCategorySer,
  deleteCategory: deleteCategorySer,
  patchCategory: patchCategorySer,
  getCategory: getCategorySer,
  categoryExist,
} = require('../service/adminService')
const {
  ADMIN_DOES_NOT_EXIST,
  PASSWORD_IS_INCORRECT,
  CATEGORY_IS_ALREADY_EXIST
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

const addCategory = async (ctx) => {
  let category = ctx.request.body
  // 添加分类！分类必须不存在才可添加
  const isExist = await categoryExist(category)
  if (isExist.length) {
    return ctx.app.emit('error', new Error(CATEGORY_IS_ALREADY_EXIST), ctx)
  }
  const result = await addCategorySer(category)
  ctx.body = 'ok'
}

const deleteCategory = async (ctx) => {
  let { id } = ctx.request.body
  const result = await deleteCategorySer(id)
  ctx.body = 'ok'
}

const patchCategory = async (ctx) => {
  let category = ctx.request.body
  // 修改分类！分类必须不存在才可添加
  const isExist = await categoryExist(category)
  if (isExist.length) {
    return ctx.app.emit('error', new Error(CATEGORY_IS_ALREADY_EXIST), ctx)
  }
  const result = await patchCategorySer(category)
  ctx.body = 'ok'
}

const getCategory = async (ctx) => {
  const result = await getCategorySer()
  ctx.body = result
}

module.exports = {
  adminCheck,
  login,
  addCategory,
  deleteCategory,
  patchCategory,
  getCategory
}
