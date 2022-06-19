const {
  getCollection: getCollectionSer,
  deleteCollection: deleteCollectionSer,
  addCollection: addCollectionSer
} = require('../service/collectionService')


const getCollection = async (ctx) => {
  const { id } = ctx.user
  ctx.body = await getCollectionSer(id)
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