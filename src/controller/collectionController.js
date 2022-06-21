const {
  getCollection: getCollectionSer,
  deleteCollection: deleteCollectionSer,
  addCollection: addCollectionSer
} = require('../service/collectionService')


const getCollection = async (ctx) => {
  const { id } = ctx.user
  const products = await getCollectionSer(id)
  products.forEach(product => {
    product.pics = product.pics.split(',')
    product.pics.forEach((pic, idx) => {
      product.pics[idx] = `${APP_DEV}/product/${pic}`
    })
  })
  ctx.body = products
}

const deleteCollection = async (ctx) => {
  const { id } = ctx.user
  const product_id = ctx.request.body.product_id
  await deleteCollectionSer(id, product_id)
  ctx.body = 'ok'
}

const addCollection = async (ctx) => {
  const { id } = ctx.user
  const product_id = ctx.request.body.product_id
  await addCollectionSer(id, product_id)
  ctx.body = 'ok'
}


module.exports = {
  getCollection,
  deleteCollection,
  addCollection
}