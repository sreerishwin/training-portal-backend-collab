const Assessment = require("../models/assessments");
const TraineeAssessment = require("../models/traineeAssessment");

const createAssessments = async (assesmentData) => {
  return await Assessment.create(assesmentData);
};
const createTA = async (TAData) => {
  return await TraineeAssessment.create(TAData);
};
const getAssessmentByTrainerId = async (trainerId) => {
  return await Assessment.findAll({
    where: {
      created_by: trainerId,
    },
  });
};

const getTAwithAssessmentId = async (assessmentId) => {
//   const result = await TraineeAssessment.findAll({
//     where: {
//       assessment_id: assessmentId,
//     },
//   });
//   console.log("Result------------------------", result);
  return await TraineeAssessment.findAll({
    where: {
      assessment_id: assessmentId,
    },
  });
};

const getCompletedTA = async () => {
  await TraineeAssessment.findAll({
    where: {
      status: "completed",
    },
  });
};

const getallAssessments = async () => {
  return await Assessment.findAll();
};
const getAssessmentById = async (assessmentId) => {
  return await Assessment.findByPk(assessmentId);
};
const updateAssessment = async (assessmentId, updateData) => {
  return await Assessment.update(updateData, {
    where: {
      id: assessmentId,
    },
  });
};
const removeAssessment = async (assessmentId) => {
  return await Assessment.destroy({
    where: {
      id: assessmentId,
    },
  });
};

module.exports = {
  createAssessments,
  createTA,
  getTAwithAssessmentId,
  getallAssessments,
  getCompletedTA,
  getAssessmentByTrainerId,
  getAssessmentById,
  updateAssessment,
  removeAssessment,
};
