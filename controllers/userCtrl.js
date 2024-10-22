const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const doctorModel = require('../models/doctorModels');
const appointmentModel = require('../models/appointmentModels');
const slotModel = require('../models/SlotsModels')
const moment = require('moment')
const availableSlotModel = require('../models/availableSlots');  // Import the model

const registerController  = async(req,res) => {
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){ 
            return res.status(200).send({message:'User already  exists',success:false})
        }
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password =  hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Register successfully',success:true})

    } catch(error){
        console.log(error);
        res.status(500).send({success: false, message: `Error in register controller ${error.message}`});

    }
}


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(200).send({message:'user not found',success:false})
        }
        if (user.isBlocked) {
            return res.status(200).send({
                message: 'You are blocked. Please contact support.',
                success: false
            });
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(200).send({message:'Invalid email or password',success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        res.status(200).send({message:'Login successfully',success:true,token})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: `Error in Login controller ${error.message}`})
    }
}

const authController = async(req, res) => {
    try {
        const user = await userModel.findById({_id:req.body.userId});
        user.password = undefined;
        if(!user){
            return res.status(200).send({message:'User not found',success:false})
        }
        else{
            res.status(200).send({success: true, data:user})
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'auth error', success:false, error})
        
    }
};

const applyDoctorController = async (req,res) =>{
    try {
        const newDoctor = await  doctorModel({...req.body, status:'pending'})
        await newDoctor.save()
        const adminUser =  await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-doctor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
            data:{
                doctorId:  newDoctor._id,
                name:  newDoctor.firstName + " " + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id,{notification})
        res.status(201).send({message:'Doctor Applied Successfully',success:true})
    } catch (error) {
        console.log(error)
        res.status(500).send({success:false, error, message: 'Error while Applying for doctor'})        
    }
}

const getAllNotificationController = async(req, res)  =>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updatedUser =  await user.save()
        res.status(200).send({
            success:true,
            message: "all notification marked as read",
            data:  updatedUser,

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false, error, message: 'Error in notifications'
        })
        
    }
}
const deleteAllNotificationController = async(req,res)  =>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        user.notification = []
        user.seennotification= []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success:true,
            message: "all notification deleted",
            data: updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'unable to delete',
            error
        })
        
    }
}




const bookAppointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString()
        req.body.time = moment(req.body.time, 'HH:mm').toISOString()
        req.body.status = "pending"
        const newAppointment = new appointmentModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({_id: req.body.doctorInfo.userId})
        user.notification.push({
            type:'New-appointment-request',
            message: `A new Appointment Request from ${req.body.userInfo.name}`,
            onClickPath: '/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message: 'Appointment Book Succesfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while Booking',
            error
        })
    }
}

const bookingAvailabilityController = async (req,res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YY').toISOString()
        const  fromTime = moment(req.body.time, 'HH:mm').subtract(1, 'hours').toISOString()
        const toTime = moment(req.body.time, 'HH:mm').add(1, 'hours').toISOString()
        const doctorId = req.body.doctorId
        const appointments = await appointmentModel.find({doctorId, date, time:{
            $gte: fromTime,
            $lte: toTime
        }})
        if(appointments.length > 0){
            return res.status(200).send({
                message: 'Appointments not Available at this time',
                success: true
            })
        }
        else{
            return res.status(200).send({
                message: 'Appointments Available at this time',
                success: true
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while checking',
            error
        })
    }
}

const userAppointmentController = async (req, res) => {
    try {
        const appointments = await slotModel.find({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: "user Appontments Fetch Successfully",
            data: appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in user Appointments',
            error
        })
    }
}
const bookslotController = async(req,res)  => {
    try {
        // Use date and time without ISO conversion
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const selectedTimeRange = req.body.time.split(' - ');
        req.body.time = [selectedTimeRange[0], selectedTimeRange[1]];

        const newSlot = new slotModel(req.body);
        await newSlot.save();

        res.status(200).send({
            success: true,
            message: 'Slot Booked Successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in slot booking',
            error
        });
    }
};

const slotAvailabilityController = async (req, res) => {
    try {
        // Parse the date and time range from the request body
        const date = moment(req.body.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const selectedTimeRange = req.body.time.split(' - '); // Split the range directly from the input
        const startTime = selectedTimeRange[0];
        const endTime = selectedTimeRange[1];
        const userId = req.body.userId;

        const userBookings = await slotModel.find({ userId, date });
        if (userBookings.length > 0) {
            return res.status(200).send({
                message: 'You have already booked a slot for this date.',
                success: false
            });
        }

        // Find existing slots booked on the same date and time
        const slots = await slotModel.find({
            date,
            time: {
                $elemMatch: { $gte: startTime, $lte: endTime } // Check overlap using the array
            }
        });
        const availablepeople = await availableSlotModel.findOne({date})
        const numberOfPeople = availablepeople.numOfPeople
        // Check if there are already bookings for the selected date and time
        if (slots.length >= numberOfPeople) {
            return res.status(200).send({
                message: 'Slot is not available at this time',
                success: false
            });
        } else {
            return res.status(200).send({
                message: 'Slot is available at this time',
                success: true
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while checking availability',
            error
        });
    }
};




const getAllAvailableSlotsController = async (req, res) => {
    try {
        const slots = await availableSlotModel.find({});
        res.status(200).send({
          success: true,
          message: 'Available slots data list',
          data: slots
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          message: 'Error while getting available slots',
          success: false,
          error
        });
      }
    
  };
module.exports = {loginController, registerController, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController, bookAppointmentController, bookingAvailabilityController, userAppointmentController, bookslotController, slotAvailabilityController, getAllAvailableSlotsController};