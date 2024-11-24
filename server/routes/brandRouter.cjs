const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController.cjs')
const checkRole = require('../middleware/checkRoleMiddleware.cjs')

router.get('/',brandController.getAll)
router.post('/', checkRole('ADMIN'), brandController.create)
router.put('/', checkRole('ADMIN'), brandController.update)
router.delete('/', checkRole('ADMIN'), brandController.delete)

router.get('/:id',brandController.getOne)
router.put('/:id', checkRole('ADMIN'), brandController.updateByID)
router.delete('/:id', checkRole('ADMIN'), brandController.deleteByID)

module.exports = router