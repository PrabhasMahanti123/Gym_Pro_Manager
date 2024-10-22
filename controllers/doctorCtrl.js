
const doctorModel = require('../models/doctorModels')
const getDoctorInfoController = async(req, res) => {
    try {
        const doctor = await doctorModel.findOne({userId: req.body.userId})
        res.status(200).send({
            success: true,
            message: "doctor data fetch success",
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in fetching details',
            error
        })
    }
}

const updateProfileController = async(req, res) => {
    try {
        const  doctor = await doctorModel.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({
            success: true,
            message: "doctor profile update success",
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error profile update issue',
            error
        })
    }
}

const getDoctorByIdController = async(req, res)  => {
    try {
        const doctor = await doctorModel.findOne({_id:req.body.doctorId})
        res.status(200).send({
            success: true,
            message: "Single doc info",
            data: doctor,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in Single Doctor',
            error
        })
    }
} 


module.exports = {getDoctorInfoController, updateProfileController, getDoctorByIdController}