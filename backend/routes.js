const router = require('express').Router()
const authController = require ('./controllers/auth-controller')
const activateController = require('./controllers/activate-controller')
const authmiddleware = require('./middleware/auth-middleware')

router.post('/api/send-otp', authController.sendOtp);
router.post('/api/verify-otp', authController.verifyOtp)
router.post('/api/activate',authmiddleware,activateController.activate)


module.exports = router;