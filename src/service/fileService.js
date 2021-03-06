const connection = require('../app/database')

const saveAvatar = async (filename, mimetype, size, userId) => {
  const statement = `INSERT INTO avatar(filename, mimetype, size, user_id) VALUES(?, ?, ?, ?);`
  const result = await connection.execute(statement, [filename, mimetype, size, userId])
  return result[0]
}

const getAvatar = async (userId) => {
  const statement = `SELECT * FROM avatar WHERE user_id = ?;`
  const result = await connection.execute(statement, [userId])
  return result
}

const deleteAvatar = async (userId) => {
  const statement = `DELETE FROM avatar WHERE user_id = ?;`
  const result = await connection.execute(statement, [userId])
  return result
}

const storeProductPic = (product_id, pics) => {
  const statement = `INSERT INTO picture(filename, mimetype, product_id) VALUES(?, ?, ?);`
  pics.forEach(async (pic) => {
    const { filename, mimetype } = pic
    await connection.execute(statement, [filename, mimetype, product_id])
  })
}

module.exports = {
  saveAvatar,
  getAvatar,
  deleteAvatar,
  storeProductPic
}

