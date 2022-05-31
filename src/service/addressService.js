const connection = require('../app/database')

const addAddress = async (address) => {
  let { user_id, mobile, receiver, value } = address
  const statement = `INSERT INTO address (user_id, mobile, receiver, value) VALUES (?, ?, ?, ?);`
  const result = await connection.execute(statement, [
    user_id,
    mobile,
    receiver,
    value,
  ])
  return result
}

const updateAddress = async (address) => {
  let { id, mobile, receiver, value } = address
  const statement = `UPDATE address SET mobile = ? , receiver = ? , value = ? WHERE id = ?;`
  const result = await connection.execute(statement, [
    mobile,
    receiver,
    value,
    id,
  ])
  return result
}

const deleteAddress = async (id) => {
  const statement = 'DELETE FROM address WHERE id = ?'
  const result = await connection.execute(statement, [id])
  return result
}

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
}
