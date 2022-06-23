const koaRouter = require('koa-router')
const authToken = require('../middleware/authToken')
const adminToken = require('../middleware/adminToken')
const {
  addOrder,
  getOrder,
  patchOrder,
  deleteOrder,
  getAllOrder
} = require('../controller/orderController')

const router = new koaRouter({
  prefix: '/order',
})


router.post("/", authToken, addOrder)
router.get("/", authToken, getOrder)
router.get("/all", adminToken, getAllOrder)
router.patch("/", authToken, patchOrder)
router.delete("/", adminToken, deleteOrder)

module.exports = router