const {
  addCart: addCartSer,
  updateCart: updateCartSer,
  deleteCart: deleteCartSer,
  getCart: getCartSer,
} = require('../service/CartService')

const addCart = async (ctx) => {
  const id = ctx.user.id
  const product = ctx.request.body
  await addCartSer(id, product)
  ctx.body = 'ok'
}

const updateCart = async (ctx) => {
  const id = ctx.user.id
  const product = ctx.request.body
  await updateCartSer(id, product)
  ctx.body = 'ok'
}

const deleteCart = async (ctx) => {
  const id = ctx.user.id
  const { product_id } = ctx.request.body
  const result = await deleteCartSer(id, product_id)
  ctx.body = 'ok'
}

const getCart = async (ctx) => {
  const { id } = ctx.user
  const products = await getCartSer(id)
  products.forEach(product => {
    product.pics = product.pics.split(',')
    product.pics.forEach((pic, idx) => {
      product.pics[idx] = `${APP_DEV}/product/${pic}`
    })
  })
  ctx.body = products
}

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getCart,
}
