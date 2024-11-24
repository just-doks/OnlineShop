const checkRole = require('../middleware/checkRoleMiddleware.cjs')

const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController.cjs')
const authMiddleware = require('../middleware/authMiddleware.cjs')

router.get('/', checkRole('ADMIN'), userController.getAll)
router.put('/', authMiddleware, userController.update)
router.delete('/', checkRole('ADMIN'), userController.delete)

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.post('/admin', checkRole('ADMIN'), userController.create)

module.exports = router