const Router = require('express')
const router = new Router();
const controller = require('../controllers/productController')


router.post('/create_product', controller.create_product)
router.put('/change_product', controller.change_product)
router.delete('/delete_product', controller.delete_product)
// router.post('/create_category', controller.create_category)
router.get('/popular', controller.getPopular)
router.get('/:category', controller.getCategory)
router.get('/:category/:id', controller.getProduct)

module.exports = router;