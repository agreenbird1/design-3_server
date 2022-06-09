const { addProduct: addProductSer } = require('../service/productService')

const addProduct = async (ctx) => {
  const product = ctx.request.body
  const result = await addProductSer(product)
  ctx.body = result.insertId
}

module.exports = {
  addProduct
}