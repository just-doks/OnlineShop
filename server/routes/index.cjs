const Router = require('express')
const router = new Router()
const deviceRouter = require('./deviceRouter.cjs')
const typeRouter = require('./typeRouter.cjs')
const brandRouter = require('./brandRouter.cjs')
const userRouter = require('./userRouter.cjs')
const orderRouter = require('./orderRouter.cjs')

router.use('/users', userRouter)
router.use('/types', typeRouter)
router.use('/brands', brandRouter)
router.use('/devices', deviceRouter)
router.use('/orders', orderRouter)

module.exports = router