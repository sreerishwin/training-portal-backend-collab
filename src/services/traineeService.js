const { Op } = require('sequelize');
const Trainee = require('../models/trainee')

const createTrainee = async(data) => {
    return await Trainee.create(data);
}
const getallTrainees = async() => {
    return await Trainee.findAll()
}
const getTraineeById = async(id) => {
    return await Trainee.findByPk(id)
}
const getTraineeByDate = async() => {
    const currDate = new Date();
    currDate.setDate(currDate.getDate()-10);
    return await Trainee.findAll({
        where:{
            joinedDate:{
                [Op.gte]:currDate,
            },
        },
    });
}
const updateTrainee = async(id,data) => {
    return await Trainee.update(data,{
        where:{
            id:id
        }
    })
}
const removeTrainee = async(id) => {
    return await Trainee.destroy({
        where:{
            id:id
        }
    })
}
module.exports={
    createTrainee,
    getallTrainees,
    getTraineeById,
    getTraineeByDate,
    updateTrainee,
    removeTrainee
}