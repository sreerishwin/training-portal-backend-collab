const Trainer = require('../models/trainer')

const createTrainer = async(trainerData) => {
    try {
        return await Trainer.create(trainerData);
    }catch(err) {
        console.log("Create Trainer Service error", err);
        throw new Error("Couldn't create User");
    }
}
const getallTrainer = async() =>{
    return await Trainer.findAll();
}
const getTrainerById = async(trainerId) =>{
    return await Trainer.findByPk(trainerId);
}
const updateTrainer = async(trainerId, updateData)=>{
    return await Trainer.update(updateData,{
        where:{
            id:trainerId
        }
    });
}
const removeTrainer = async(trainerId) =>{
    return await Trainer.destroy({
        where:{
            id:trainerId
        }
    })
}

module.exports = {
    createTrainer,
    getallTrainer,
    getTrainerById,
    updateTrainer,
    removeTrainer
}