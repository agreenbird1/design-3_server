const {
  addCategory: addCategorySer,
  deleteCategory: deleteCategorySer,
  patchCategory: patchCategorySer,
  getCategory: getCategorySer,
  categoryExist,
} = require('../service/categoryService')
const {
  CATEGORY_IS_ALREADY_EXIST
} = require('../constants/errTypes')



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
  addCategory,
  deleteCategory,
  patchCategory,
  getCategory
}
