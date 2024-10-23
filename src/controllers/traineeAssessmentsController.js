const t_assessments = require('../models/traineeAssessment');
const { successResponse, errorResponse, noResponse } = require('../functions/response');
const tAssessmentService = require('../services/traineeassessmentService')

const create_tAssessment = async (req, res) => {
    try {
        // const { assessment_name, description, duration, asessment_type, created_by, due_date, trainees } = req.body;
        const t_assessment = await tAssessmentService.create_tAssessment({...req.body, status: 'todo' });
        // res.status(201).json(t_assessment);
        return successResponse(res,t_assessment);
    } catch (err) {
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}
const show_tAssessments_count = async(req,res)=> {
    try{
        const t_assessmentCount = await t_assessments.count();
        return successResponse(res,t_assessmentCount);
        // res.status(200).json({count:t_assessmentCount});
    }catch(err){
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}
const show_tAssessments = async(req,res) => {
    try{
        const t_assessment = await tAssessmentService.getall_tAssessments();
        return successResponse(res,t_assessment);
        // res.status(201).json(t_assessment);
    } catch(err){
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}
const statistics =  async(req,res) =>{
    try{
        const completedAssessments = await t_assessments.findAll({
            where:{
                status:'completed'
            },
        });
        const pendingAssessments = await t_assessments.findAll({
            where:{
                status:'hold'
            }
        });
        const todoAssessments = await t_assessments.findAll({
            where:{
                status:'todo'
            }
        });
        const inprogressAssessments = await t_assessments.findAll({
            where:{
                status:'in_progress'
            }
        });
        return successResponse(res,{ completedCount: completedAssessments.length,
            pendingCount:pendingAssessments.length,
            todoCount:todoAssessments.length,
            inprogressCount:inprogressAssessments.length
        });
        
    } catch(err){
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}
const show_tAssessment_byId = async(req,res) =>{
    try{
        const t_assessment = await tAssessmentService.get_tAssessmentById(req.params.id);
        if(t_assessment) return successResponse(res,t_assessment);
        else return noResponse(res);
    }catch(err){
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}
const update_tAssessment = async(req,res)=>{
    try{
        const t_assessment = await tAssessmentService.update_tAssessment(req.params.id,req.body);
        // res.json(t_assessment);
        return successResponse(res,t_assessment);
    }catch(err){
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}

const remove_tAssessment = async(req,res)=>{
    try{
        await tAssessmentService.remove_tAssessment(req.params.id);
        return successResponse(res);
        // res.json({message:'Trainee Assesssment deleted'});
    }catch(err){
        return errorResponse(res,err.message,500,"TraineeAssessment not found")
    }
}
module.exports = {
    create_tAssessment,
    show_tAssessments_count,
    show_tAssessments,
    statistics,
    show_tAssessment_byId,
    update_tAssessment,
    remove_tAssessment
}