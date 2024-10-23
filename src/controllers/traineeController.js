const { Op } = require("sequelize");
const Trainee = require("../models/trainee");
const t_assessment = require("../models/traineeAssessment");
const Assessment = require("../models/assessments");
const User = require("../models/User");
const traineeassessmentService = require("../services/traineeassessmentService");
const traineeService = require("../services/traineeService");
const trainerService = require("../services/trainerService");
const assessmentService = require("../services/assessmentService");
const {
  successResponse,
  errorResponse,
  noResponse,
} = require("../functions/response");

const create_trainee = async (req, res) => {
  try {
    const mailId = req.body.email
    const user = await User.findOne({
      where:{
        email:mailId
      }
    })
    if (user) {
      const trainee = await traineeService.createTrainee({...req.body,userId : user.id});
      return successResponse(res, trainee);
    }
    else {
      return errorResponse(res,"Email doesnt match.");

    }
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainer not found");
  }
};
const trainee_count = async (req, res) => {
  try {
    const traineeCount = await Trainee.count();
    return successResponse(res, { count: traineeCount });
    // res.status(200).json({count:traineeCount});
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainee not found");
  }
};
const show_trainees = async (req, res) => {
  try {
    const trainees = await traineeService.getallTrainees();
    return successResponse(res, trainees);
    // res.json(trainees);
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainee not found");
    // res.status(500).json({ error: err.message });
  }
};
const latest_trainee_count = async (req, res) => {
  try {
    const trainee = await traineeService.getTraineeByDate();

    return successResponse(res, { count: trainee.length });
    // res.json({ count: trainee.length });
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainee not found");
  }
};

const show_by_id = async (req, res) => {
  try {
    const trainee = await traineeService.getTraineeById(req.params.id);
    if (trainee) return successResponse(res, trainee);
    else return noResponse(res);
    // else res.status(404).json({ error: 'Trainee not found' });
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainee not found");
  }
};

// Get assessments assigned to a trainee
const getTraineeAssessments = async (req, res) => {
  try {
    const traineeId = req.params.traineeId;
    const tr_assessments =
      await traineeassessmentService.get_tAssessmentByTraineeId(traineeId);
    console.log("TR assessments", tr_assessments);
    const result = await Promise.all(
      tr_assessments.map(async (tr_assessment) => {
        // const assessment = await traineeService.getTraineeById(
        //   tr_assessment.assessment_id
        // );
        const assessment = await assessmentService.getAssessmentById(
          tr_assessment.assessment_id
        );
        console.log("Assessment", assessment);
        const trainer = await getTrainerById(assessment.created_by);
        const createdBy = trainer.name;
        console.log("CREATED BY", createdBy);
        return {
          ...tr_assessment.toJSON(),
          ...assessment.toJSON(),
          createdBy: createdBy,
          traineeStatus: tr_assessment.status,
        };
      })
    );
    console.log("RESULT", result);
    return successResponse(res, result);
    // return res.status(200).json(result);
  } catch (err) {
    console.log("_______________________________", err);
    return errorResponse(res, err.message, 500, "Trainee not found");
  }
};

async function getTrainerById(id) {
  console.log("ID", id);
  const trainer = await trainerService.getTrainerById(id);
  console.log("TRAINER", trainer);
  return trainer;
}
const update_trainee = async (req, res) => {
  try {
    const trainee = await traineeService.updateTrainee(req.params.id, req.body);
    return successResponse(res, trainee);
    // res.json(trainee);
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainee not found");
  }
};
const remove_trainee = async (req, res) => {
  try {
    const traineeId = req.params.id;
    const trainee = await traineeService.getTraineeById(traineeId);
    if (trainee) {
      if (trainee.status == "Active" || trainee.status == "active") {
        trainee.status = "Deleted";
        await trainee.save();
        return successResponse(res);
      } else {
        return errorResponse(res, err.message, 500, "Trainee not active");
      }
    } else {
      return noResponse(res);
    }
  } catch (err) {
    return errorResponse(res, err.message, 500, "Trainee not found");
  }
};
module.exports = {
  create_trainee,
  trainee_count,
  show_trainees,
  latest_trainee_count,
  show_by_id,
  getTraineeAssessments,
  update_trainee,
  remove_trainee,
};
