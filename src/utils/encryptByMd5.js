const crypto = require('crypto')

const encryptByMd5 = (password) => {
  // 控制输出的长度
  const md5 = crypto.createHash('md5', {
    outputLength: 16
  })
  return md5.update(password).digest('base64')
}

module.exports = encryptByMd5