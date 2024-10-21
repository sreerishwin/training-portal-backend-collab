const TraineeAssessment = require('../models/traineeAssessment')

const create_tAssessment = async(data) => {
    return await TraineeAssessment.create(data);
}
const getall_tAssessments = async() => {
    return await TraineeAssessment.findAll()
}
const get_tAssessmentByTraineeId = async(traineeId) => {
    return await TraineeAssessment.findAll({
        where: { 
            trainee_id: traineeId,
    }})
}
const get_tAssessmentById = async(id) => {
    return await TraineeAssessment.findByPk(id)
}
const update_tAssessment = async(id,data) => {
    return await TraineeAssessment.update(data,{
        where:{
            id:id
        }
    })
}
const remove_tAssessment = async(id) => {
    return await TraineeAssessment.destroy({
        where:{
            id:id
        }
    })
}
module.exports={
    create_tAssessment,
    get_tAssessmentByTraineeId,
    getall_tAssessments,
    get_tAssessmentById,
    update_tAssessment,
    remove_tAssessment
}