const express =  require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { getAllUsersController, changeAccountStatusController, createSlotController, getAllPeopleController, blockUserController, unblockUserController, getAllSlotController } = require('../controllers/adminCtrl');
const router =  express.Router();

router.get('/getAllUsers', authMiddleware, getAllUsersController)
router.post('/changeAccountStatus', authMiddleware, changeAccountStatusController)
router.post('/create-slot', authMiddleware,  createSlotController)
router.get('/getallpeople', authMiddleware,  getAllPeopleController)
router.put('/block/:id', blockUserController);
router.put('/unblock/:id', unblockUserController);
router.get('/getallslots', authMiddleware,   getAllSlotController);



module.exports = router;