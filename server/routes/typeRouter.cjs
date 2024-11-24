const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController.cjs')
const checkRole = require('../middleware/checkRoleMiddleware.cjs')

router.get('/', typeController.getAll)
router.post('/', checkRole('ADMIN'), typeController.create)
router.put('/', checkRole('ADMIN'), typeController.update)
router.delete('/', checkRole('ADMIN'), typeController.delete)

router.get('/:id', typeController.getOne)
router.put('/:id', checkRole('ADMIN'), typeController.updateByID)
router.delete('/:id', checkRole('ADMIN'), typeController.deleteByID)

module.exports = router