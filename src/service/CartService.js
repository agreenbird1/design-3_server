const connection = require('../app/database')

const addCart = async (id, product) => {
  let { product_id, number } = product
  const carts = await getCart(id)
  const cur_product = carts.find(p => p.product_id === product.product_id)
  // 已经存在当前商品
  if (cur_product) {
    await updateCart(id, {
      product_id,
      number: cur_product.number + number
    })
  }
  else {
    const statement = `INSERT INTO cart (user_id, product_id,number) VALUES (?, ?, ?);`
    const result = await connection.execute(statement, [
      id, product_id, number
    ])
  }
}

const updateCart = async (id, product) => {
  let { product_id, number } = product
  const statement = `UPDATE cart SET number = ? WHERE user_id = ? AND product_id = ?;`
  const result = await connection.execute(statement, [
    number, id, product_id,
  ])
}


const deleteCart = async (id, product_id) => {
  const statement = 'DELETE FROM cart WHERE user_id = ? AND product_id = ?;'
  await connection.execute(statement, [id, product_id])
}

const getCart = async (user_id) => {
  const statement = `
    SELECT p.*, c.number,GROUP_CONCAT(pi.filename) pics
    FROM product p, cart c, picture pi
    WHERE  p.id = pi.product_id AND p.id in (SELECT product_id FROM cart WHERE user_id = ?)
    GROUP BY p.id
  `
  const [product] = await connection.execute(statement, [user_id])
  return product
}

module.exports = {
  addCart,
  updateCart,
  deleteCart,
  getCart,
}
