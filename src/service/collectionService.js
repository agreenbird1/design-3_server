const connection = require('../app/database')

const getCollection = async (id) => {
  const statement = `
    SELECT p.*, GROUP_CONCAT(pi.filename) pics
    from product p
    join picture pi
    on p.id = pi.product_id
    WHERE p.id in (SELECT product_id FROM collection WHERE user_id = ?)
    GROUP BY
    p.id
  `
  const products = await connection.execute(statement, [id])
  return products[0]
}

const deleteCollection = async (id, product_id) => {
  const statement = 'DELETE FROM collection WHERE user_id = ? and product_id = ?'
  await connection.execute(statement, [id, product_id])
}

const addCollection = async (id, product_id) => {
  const statement = `INSERT INTO collection (user_id, product_id) VALUES (?, ?);`
  await connection.execute(statement, [id, product_id])
}

module.exports = {
  deleteCollection,
  getCollection,
  addCollection
}