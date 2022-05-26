const app = require('./src/app')
// 通过 dotenv 库加载的根目录的 .env 文件
// 然后全局配置导入
const { APP_PORT } = require('./src/app/config')
app.listen(APP_PORT, () => {
  console.log(`server listening on port ${APP_PORT}...`)
})