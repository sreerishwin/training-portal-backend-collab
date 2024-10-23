const express = require('express');
const Trainer = require('../models/trainer');
const trainerService = require('../services/trainerService');
const assessmentService = require('../services/assessmentService')
const User = require('../models/User');
const { successResponse, errorResponse, noResponse } = require('../functions/response');
const UserService = require('../services/UserService');

const create_trainer = async(req,res) => {
    try {
        const mailId = req.body.email
        const user = await User.findOne({
            where:{
                email : mailId
            }
        })
        if (user) {
            const trainer = await trainerService.createTrainer({ ...req.body, userId: user.id });
            return successResponse(res, trainer)
        }
        return errorResponse(res,"Email is not registered.",400);
        // res.status(201).json(trainer);
    } catch (err) {
        console.log(err)
        return errorResponse(res,err.message,500,"Couldn't create trainer")
    }
}
const show_trainers_by_count = async(req,res)=> {
    try{
        const trainerCount = await Trainer.count();
        return successResponse(res,{count: trainerCount});
        // res.status(200).json({count:trainerCount});
    }catch(err){
        return errorResponse(res,err.message,500,"Trainer not found")
    }
}
const show_assessments_by_id = async(req,res)=>{
    try{
        const assess= await assessmentService.getAssessmentByTrainerId(id)
        return successResponse(res,assess);
    }catch{
        return errorResponse(res,err.message,500,"Trainer not found")
    }
}
// const create_assess_and_trainee_assess = async(req,res)=>{
//     const { title, description, duration, status } = req.body;
//     try{
//         const assess = await Assessment.create({
//             assessment_name: title,
//             description: description,
//             duration: duration,
//             status:status,
//             created_by: req.params.id
//         });
//         await trainee_assessment.create({
            
//         })
//         return successResponse(res);
//     //  res.status(200).json({ message: "Assessment Created"});
//     }catch{
//         return errorResponse(res,err.message,500)
//     }
// }
const show_trainers =  async (req, res) => {
    try {
        const trainers = await trainerService.getallTrainer();
        return successResponse(res,trainers);
        // res.json(trainers);
    } catch (err) {
        return errorResponse(res,err.message,500,"Trainers not found")
    }
}
const show_trainers_by_id =  async (req, res) => {
    try {
        const trainer = await trainerService.getTrainerById(req.params.id);
        if (trainer) return successResponse(res,trainer);
        else res.status(404).json({ error: 'Trainer not found' });
    } catch (err) {
        return errorResponse(res,err.message,500,"Trainer not found")
        // res.status(500).json({ error: err.message });
    }
}
const edit_trainer =  async (req, res) => {
    try {
        const trainer = await trainerService.updateTrainer(req.params.id, req.body);
        return successResponse(res,trainer);
    } catch (err) {
        return errorResponse(res,err.message,500,"Trainer not found")
        // res.status(500).json({ error: err.message });
    }
}
const remove_trainer = async(req,res)=>{
    try{
        const trainerId = req.params.id;
        const trainer = await trainerService.getTrainerById(trainerId);
        if (trainer){
            if (trainer.status == 'Active' || trainer.status == 'active'){
                trainer.status = 'Deleted';
                await trainer.save();
                return successResponse(res,trainer);
            }else{
                res.send("Trainer not active");
            }
        }else{
            return noResponse(res);
        }

    }catch(err){
        return errorResponse(res,err.message,500,"Trainer not found")
    }
}
module.exports = {
    create_trainer,
    show_trainers_by_count,
    show_assessments_by_id,
    // create_assess_and_trainee_assess,
    show_trainers,
    show_trainers_by_id,
    edit_trainer,
    remove_trainer
};