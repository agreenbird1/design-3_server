const connection = require('../app/database')

const addProduct = async (product) => {
  let { name, price, description, put, category_id, property, inventory } = product
  const statement = `INSERT INTO product (name, price,description, put, category_id, property, inventory) VALUES (?, ?, ?, ?, ?, ?, ?);`
  const result = await connection.execute(statement, [
    name, price, description, put, category_id, property, inventory
  ])
  return result[0]
}

module.exports = {
  addProduct
}