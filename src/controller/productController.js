const fs = require('fs')

const { addProduct: addProductSer, getProduct: getProductSer, getPicture: getPictureSer } = require('../service/productService')
const { APP_DEV } = require('../app/config')
const { PRODUCT_PATH } = require('../constants/filePaths')

const addProduct = async (ctx) => {
  const product = ctx.request.body
  const result = await addProductSer(product)
  ctx.body = result.insertId
}

const getProduct = async (ctx) => {
  const products = await getProductSer()
  products.forEach(product => {
    product.pics = product.pics.split(',')
    product.pics.forEach((pic, idx) => {
      product.pics[idx] = `${APP_DEV}/product/${pic}`
    })
  })
  ctx.body = products
}

const getPicture = async (ctx) => {
  const { filename } = ctx.params
  const result = await getPictureSer(filename)
   //设置响应格式，方便展示图片内容
   ctx.response.set('content-type', result.mimetype)
   ctx.body = fs.createReadStream(`${PRODUCT_PATH}/${result.filename}`)
}

module.exports = {
  addProduct,
  getProduct,
  getPicture
}