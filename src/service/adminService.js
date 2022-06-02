const connection = require('../app/database')
const encryptByMd5 = require('../utils/encryptByMd5')

const getAdminByName = async (name) => {
  const statement = `SELECT * FROM admin WHERE name = ?;`
  const result = await connection.execute(statement, [name])
  return result[0]
}

const getAdminByPassword = async (name, password) => {
  const statement = `SELECT * FROM admin WHERE name = ? AND password = ?;`
  const result = await connection.execute(statement, [name, password])
  return result[0]
}

module.exports = {
  getAdminByName,
  getAdminByPassword
}