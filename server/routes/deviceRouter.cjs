const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController.cjs')
const checkRole = require('../middleware/checkRoleMiddleware.cjs')

router.get('/', deviceController.getAll)
router.post('/', checkRole('ADMIN'), deviceController.create)
router.get('/:id', deviceController.getOne)
router.put('/:id', checkRole('ADMIN'), deviceController.change)
router.delete('/:id', checkRole('ADMIN'), deviceController.remove)

module.exports = router