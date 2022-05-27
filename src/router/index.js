const fs = require('fs')

// 路由文件统一处理
const useRoutes = function () {
  // 读取当前目录下的文件，file为文件名
  fs.readdirSync(__dirname).forEach(file => {
    if (file !== 'index.js') {
      const router = require(`./${file}`)
      this.use(router.routes())
      this.use(router.allowedMethods())
    }
  })
}

module.exports = useRoutes