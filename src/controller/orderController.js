const dayjs = require('dayjs')
const {
  addOrder: addOrderSer,
  getOrder: getOrderSer,
  patchOrder: patchOrderSer,
  deleteOrder: deleteOrderSer,
  getAllUserOrder: getAllUserOrderSer,
  getAllOrder: getAllOrderSer
} = require('../service/orderService')

const addOrder = async (ctx) => {
  const user_id = ctx.user.id
  const { product_ids, number } = ctx.request.body
  const createAt = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
  const order_id = await addOrderSer(user_id, product_ids.join(','), number.join(','), createAt)
  ctx.body = order_id
}

const getOrder = async (ctx) => {
  const { order_id } = ctx.request.query
  const user_id = ctx.user.id
  let order
  if (order_id) {
    order = await getOrderSer(order_id)
  } else {
    order = await getAllUserOrderSer(user_id)
  }
  ctx.body = order
}

const patchOrder = async (ctx) => {
  const { order_id, address_id } = ctx.request.body
  console.log(order_id, address_id)
  await patchOrderSer(order_id, address_id)
  ctx.body = 'ok'
}

const deleteOrder = async (ctx) => {
  const order_id = ctx.request.body.order_id
  await deleteOrderSer(order_id)
  ctx.body = 'ok'
}

const getAllOrder = async (ctx) => {
  const orders = await getAllOrderSer()
  ctx.body = orders
}

module.exports = {
  addOrder,
  getOrder,
  patchOrder,
  deleteOrder,
  getAllOrder
}
