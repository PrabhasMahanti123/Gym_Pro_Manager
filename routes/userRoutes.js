const express = require('express')
const { loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, bookAppointmentController, bookingAvailabilityController, userAppointmentController, bookslotController, slotAvailabilityController, getAllAvailableSlotsController} = require('../controllers/userCtrl');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router()
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/getUserData', authMiddleware, authController)
router.post('/apply-doctor', authMiddleware, applyDoctorController)

router.post('/get-all-notification', authMiddleware, getAllNotificationController)
router.post('/delete-all-notification', authMiddleware, deleteAllNotificationController)
router.post('/book-appointment', authMiddleware, bookAppointmentController)
router.post('/booking-availability', authMiddleware, bookingAvailabilityController)
router.post('/user-appointments', authMiddleware, userAppointmentController)
router.post('/book-slot', authMiddleware,  bookslotController)
router.post('/slot-availability', authMiddleware,  slotAvailabilityController)
router.get('/getAllSlots', authMiddleware, getAllAvailableSlotsController);
module.exports = router;