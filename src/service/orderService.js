const connection = require('../app/database')
const { getProductById } = require('../service/productService')

const addOrder = async (user_id, product_ids, number, createAt) => {
  const statement = 'INSERT INTO `order` (user_id, product_ids,number, createAt) VALUES (?, ?, ?, ?);'
  const res = await connection.execute(statement, [user_id, product_ids, number, createAt])
  return res[0].insertId
}

const getOrder = async (order_id) => {
  const statement = 'SELECT * FROM `order` WHERE id = ?'
  const [[res]] = await connection.execute(statement, [order_id])
  const order = {
    id: res.id,
    number: res.number.split(','),
    createAt: res.createAt,
    state: res.state,
    products: res.product_ids.split(',')
  }
  const query = order.products.map(() => "?").join(',')
  const statement1 = `
    SELECT p.*, GROUP_CONCAT(pi.filename) pics
    from product p
    join picture pi
    on p.id = pi.product_id
    WHERE p.id in (${query})
    GROUP BY
    p.id
  `
  const [products] = await connection.execute(statement1, [...order.products])
  products.forEach(product => {
    product.pics = product.pics.split(',')
    product.pics.forEach((pic, idx) => {
      product.pics[idx] = `${APP_DEV}/product/${pic}`
    })
  })
  order.products = products
  return order
}

const getAllOrder = async (user_id) => {
  const statement = 'SELECT * FROM `order` WHERE user_id = ?'
  const [res] = await connection.execute(statement, [user_id])
  const orders = []
  for (let i = 0; i < res.length; i++) {
    orders.push(await getOrder(res[i].id))
  }
  return orders
}

const patchOrder = (order_id, address_id) => {
  const statement = 'UPDATE `order` SET address_id = ? , state = 1 where id = ?'
  connection.execute(statement, [address_id, order_id])
}

const deleteOrder = async (order_id) => {
  const statement = 'DELETE FROM order WHERE id = ?'
  await connection.execute(statement, [order_id])
}

module.exports = {
  addOrder,
  getOrder,
  patchOrder,
  getAllOrder
}