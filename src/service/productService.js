const connection = require('../app/database')

const addProduct = async (product) => {
  let { name, price, description, put, category_id, property, inventory } = product
  const statement = `INSERT INTO product (name, price,description, put, category_id, property, inventory) VALUES (?, ?, ?, ?, ?, ?, ?);`
  const result = await connection.execute(statement, [
    name, price, description, put, category_id, property, inventory
  ])
  return result[0]
}

const getProduct = async () => {
  const statement = `
    SELECT p.*, GROUP_CONCAT(pi.filename) pics
    from product p
    join picture pi
    on p.id = pi.product_id
    GROUP BY
    p.id
  `
  const products = await connection.execute(statement)
  return products[0]
}

const getPicture = async (filename) => {
  const statement = `
    SELECT * from picture where filename = ?;
  `
  const products = await connection.execute(statement, [filename])
  return products[0][0]
}

module.exports = {
  addProduct,
  getProduct,
  getPicture
}