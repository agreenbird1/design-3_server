const connection = require('../app/database')

const addAddress = async (address) => {
  let { user_id, mobile, receiver, value, isDefault } = address
  const statement = `INSERT INTO address (user_id, mobile, receiver, value, isDefault) VALUES (?, ?, ?, ?, ?);`
  if (isDefault === '1') {
    await updateDefaultAddress(user_id)
  }
  const result = await connection.execute(statement, [
    user_id,
    mobile,
    receiver,
    value,
    isDefault,
  ])
  return result
}

const updateAddress = async (address) => {
  let { id, user_id, mobile, receiver, value, isDefault } = address
  const statement = `UPDATE address SET mobile = ? , receiver = ? , value = ?, isDefault = ? WHERE id = ?;`
  if (isDefault === '1') {
    await updateDefaultAddress(user_id)
  }
  const result = await connection.execute(statement, [
    mobile,
    receiver,
    value,
    isDefault,
    id,
  ])
  return result
}

const updateDefaultAddress = async (user_id) => {
  const statement = `UPDATE address SET isDefault = 0 WHERE user_id = ? AND isDefault = 1;`
  await connection.execute(statement, [user_id])
}

const deleteAddress = async (id) => {
  const statement = 'DELETE FROM address WHERE id = ?'
  const result = await connection.execute(statement, [id])
  return result
}

const getAddress = async (user_id) => {
  const statement = 'SELECT * FROM address WHERE user_id = ?'
  const result = await connection.execute(statement, [user_id])
  return result
}

module.exports = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
}
