const koaRouter = require('koa-router')

const authToken = require('../middleware/authToken')
const {
  getCollection,
  deleteCollection,
  addCollection
} = require('../controller/collectionController')

const router = new koaRouter({
  prefix: '/collection',
})

router.get("/", authToken, getCollection)
router.delete("/", authToken, deleteCollection)
router.post("/", authToken, addCollection)

module.exports = router