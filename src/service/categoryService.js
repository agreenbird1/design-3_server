const connection = require('../app/database')

const addCategory = async (category) => {
  let { name, value } = category
  const statement = `INSERT INTO category (name, value) VALUES (?, ?);`
  const result = await connection.execute(statement, [
    name, value
  ])
  return result
}

const categoryExist = async (category) => {
  let { name } = category
  const statement = `SELECT * FROM category WHERE name = ?;`
  const result = await connection.execute(statement, [name])
  return result[0]
}

const deleteCategory = async (id) => {
  const statement = 'DELETE FROM category WHERE id = ?'
  const result = await connection.execute(statement, [id])
  return result
}

const patchCategory = async (category) => {
  let { id, name, value } = category
  const statement = `UPDATE category SET name = ? , value = ? WHERE id = ?;`
  const result = await connection.execute(statement, [
    name, value, id
  ])
  return result
}

const getCategory = async () => {
  const statement = 'SELECT * FROM category;'
  const result = await connection.execute(statement)
  return result[0]
}

module.exports = {
  addCategory,
  categoryExist,
  deleteCategory,
  patchCategory,
  getCategory
}