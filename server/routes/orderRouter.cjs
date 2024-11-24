const authMiddleware = require('../middleware/authMiddleware.cjs')
const checkRole = require('../middleware/checkRoleMiddleware.cjs')
const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController.cjs')

router.post('/', authMiddleware, orderController.create) 
router.get('/', checkRole('ADMIN'), orderController.getOrders)

router.get('/order/:id', checkRole('ADMIN'), orderController.getOneOrder)
router.delete('/order/:id', checkRole('ADMIN'), orderController.remove)

router.get('/items', checkRole('ADMIN'), orderController.getItems)
router.get('/items/:orderId', checkRole('ADMIN'), orderController.getOrderItems)


module.exports = router