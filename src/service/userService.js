const connection = require('../app/database')
const encryptByMd5 = require('../utils/encryptByMd5')

/**
 *
 * @param {Object} user - 新键用户
 * @returns 插入数据库后的信息
 */
const createUser = async (user) => {
  let { username, password, gender, mobile } = user
  // 对密码进行加密
  password = encryptByMd5(password)
  console.log(password.length)
  const statement = `INSERT INTO user (username, password, gender, mobile) VALUES (?, ?, ?, ?);`
  const result = await connection.execute(statement, [username, password, gender, mobile])

  return result
}

/**
 * 根据用户名（unique）查找用户信息
 * @param {String} name - 用户名
 * @returns 用户信息
 */
const getUser = async (name) => {
  const statement = `SELECT * FROM user WHERE username = ?;`
  const result = await connection.execute(statement, [name])
  return result
}

module.exports = {
  createUser,
  getUser
}