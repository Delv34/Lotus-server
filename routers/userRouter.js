const Router = require('express')
const router = new Router();
const controller = require('../controllers/userController')
const {check} = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')


router.post("/registration", controller.registration)
router.post("/registration2", controller.registration2)
router.post('/login', controller.login)
// router.get('/users', roleMiddleware(['USER']), controller.getUsers)
router.post('/getuser', controller.getUser)

module.exports = router;