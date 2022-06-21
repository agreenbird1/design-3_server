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

const getProductByCategory = async (category_id) => {
  const statement = `
    SELECT p.*, GROUP_CONCAT(pi.filename) pics
    from product p
    join picture pi
    on p.id = pi.product_id
    WHERE p.category_id = ?
    GROUP BY
    p.id
  `
  const products = await connection.execute(statement, [category_id])
  return products[0]
}

const getPicture = async (filename) => {
  const statement = `
    SELECT * from picture where filename = ?;
  `
  const products = await connection.execute(statement, [filename])
  return products[0][0]
}

const deleteProduct = async (id) => {
  const statement = 'DELETE FROM product WHERE id = ?'
  const result = await connection.execute(statement, [id])
  return result
}

const patchProduct = async (id, put) => {
  if (put === '1') put = '0'
  else put = '1'
  const statement = `UPDATE product SET put = ? WHERE id = ?;`
  const result = await connection.execute(statement, [put, id])
  return result
}

const getProductByKeyWords = async (keywords) => {
  const statement = `SELECT * from product where name like '%${keywords}%';`
  const products = await connection.execute(statement, [keywords])
  return products[0]
}

const getProductBySubCategory = async (subcategory) => {
  const idStatement = `SELECT id FROM category WHERE name = ?`
  const [[{ id }]] = await connection.execute(idStatement, [subcategory])
  const products = await getProductByCategory(id)
  return products
}

const getProductById = async (id) => {
  const statement = `
    SELECT p.*, GROUP_CONCAT(pi.filename) pics
    from product p
    join picture pi
    on p.id = pi.product_id
    WHERE p.id = ?
    GROUP BY
    p.id
  `
  const [[product]] = await connection.execute(statement, [id])
  return product
}

const  getProductByCollect = async ()=>{
  const statement = `
    SELECT t.*, GROUP_CONCAT(p.filename) pics
    from (SELECT p.*, count(*) num from product p
    join collection c
    on p.id = c.product_id
    GROUP BY c.product_id) t
    join picture p
    on t.id = p.product_id
    GROUP BY t.id
    ORDER BY num desc
  `
  const [products] = await connection.execute(statement)
  return products
}

module.exports = {
  addProduct,
  getProduct,
  getPicture,
  deleteProduct,
  patchProduct,
  getProductByCategory,
  getProductByKeyWords,
  getProductBySubCategory,
  getProductById,
  getProductByCollect
}