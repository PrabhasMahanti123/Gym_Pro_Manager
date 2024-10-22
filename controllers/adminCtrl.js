const doctorModel = require('../models/doctorModels')
const userModel = require('../models/userModels');
const availableSlotModel = require('../models/availableSlots');  // Import the model
const slotModel = require('../models/SlotsModels')
const moment = require('moment')

const getAllUsersController = async(req, res)  => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message: 'users data',
            data: users
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Internal Server Error",
            success: false,
            error
        })
        
    }
}

const changeAccountStatusController = async(req, res)  => {
    try {
        const {doctorId, status} = req.body
        const doctor = await doctorModel.findByIdAndUpdate(doctorId,{status})
        const user = await userModel.findOne({_id:doctor.userId})
        const notification = user.notification
        notification.push({
            type:'doctor-account-request-updated',
            message:`Your Doctor Account Request Has ${status}`,
            onclickPath: '/notification'
        })
        user.isDoctor = status === 'approved' ? true :  false
        await user.save()
        res.status(200).send({
            success: true,
            message: 'Account status updated',
            data: doctor
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in account status',
            error
        })
        
    }
}

const createSlotController = async (req, res) => {
    try {
      // Create a new available slot entry
      const newSlot = new availableSlotModel({ ...req.body });
  
      // Save the new slot to the database
      await newSlot.save();
  
      // Fetch all users who are not admins
      const users = await userModel.find({ isAdmin: false });
      const formattedDate = moment(newSlot.date).format('DD-MM-YYYY');

      // Update notifications for each user
      for (const user of users) {
        user.notification.push({
          type: 'slot-created',
          message: `New slot has been created on ${formattedDate}`,
          onclickPath: '/notification',
        });
        await user.save(); // Save each user after updating notifications
      }
  
      res.status(200).send({
        success: true,
        message: 'Slot created successfully',
        data: newSlot,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Error while creating slot',
        error,
      });
    }
  };
  

 const getAllPeopleController =async(req, res) => {
    try {
        const { date } = req.body; // Expect date in 'DD-MM-YYYY' format
        const formattedDate = moment(date, 'DD-MM-YYYY').toISOString(); // Format the date properly
        
        // Find all slots for the given date
        const slots = await slotModel.find({ date: formattedDate }).populate('userId'); // Assuming userId is referenced
        
        if (!slots.length) {
            return res.status(200).send({
                success: true,
                message: 'No users found for this slot date',
                data: []
            });
        }

        // Extract users from the slots
        const users = slots.map(slot => slot.userId);

        res.status(200).send({
            success: true,
            message: 'Users data for the selected slot date',
            data: users
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while fetching users for this slot date',
            error
        });
    }
 }

 // Block User Controller
const blockUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        await userModel.findByIdAndUpdate(userId, { isBlocked: true });
        res.status(200).send({
            success: true,
            message: 'User blocked successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while blocking user',
            error,
        });
    }
};

// Unblock User Controller
const unblockUserController = async (req, res) => {
    try {
        const userId = req.params.id;
        await userModel.findByIdAndUpdate(userId, { isBlocked: false });
        res.status(200).send({
            success: true,
            message: 'User unblocked successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while unblocking user',
            error,
        });
    }
};



// controllers/slotController.js
const getAllSlotController = async (req, res) => {
    try {
        const { date } = req.query; // Get date from query parameters

        // If a date is provided, filter slots by that date
        const query = date ? { date } : {};

        const slots = await slotModel.find(query).populate('userId', 'name email'); // Populate user details if needed

        res.status(200).send({
            success: true,
            message: 'Slots fetched successfully',
            data: slots
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error fetching slots',
            error
        });
    }
};

// Exporting the controller



 
module.exports = {getAllUsersController, changeAccountStatusController, createSlotController, getAllPeopleController, unblockUserController, blockUserController, getAllSlotController}