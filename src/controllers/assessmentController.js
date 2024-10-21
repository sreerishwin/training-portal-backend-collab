const assessments = require("../models/assessments");
const Trainer = require("../models/trainer");
const TraineeAssessment = require("../models/traineeAssessment");
const assessmentService = require("../services/assessmentService");
const {
  successResponse,
  errorResponse,
  noResponse,
} = require("../functions/response");

const create_assessment = async (req, res) => {
    try {
        const assessment = await assessmentService.createAssessments({ ...req.body, assessment_name: req.body.title });
        const traineeAssessment = await assessmentService.createTA({ ...req.body, assessment_id: assessment.id, status: req.body.traineeStatus })
        return successResponse(res,assessment)
    } catch (err) {
        return errorResponse(res,"assessment not found",404,"no assessment found")
        // res.status(500).json({ error: err.message });
    }
}
 
const completed_assessment = async(req,res)=> {
    try{
        const fetchedassessments = await assessmentService.getAssessmentByTrainerId(req.params.trainerId)
        
        if (!fetchedassessments || fetchedassessments.length === 0) {
            return errorResponse(res, "No assessments found for the given trainer", 404);
        }
        const taFetchedAssessments = await Promise.all(fetchedassessments.map(async (assessment) => {
            const traineeAssessments = await assessmentService.getTAwithAssessmentId(assessment.id);
            const completed = traineeAssessments.filter(Assessment => Assessment.status === 'completed');
            console.log(traineeAssessments)
            const perc = (traineeAssessments.length > 0) 
            ? ((completed.length / traineeAssessments.length) * 100) : 0; 
            return { percentage:perc }
        }));
        console.log("Training Fetched assessments_________________________--", taFetchedAssessments)
        return successResponse(res,{completed : taFetchedAssessments})
        // res.status(200).json({completed : taFetchedAssessments});
    }catch(err){
        return errorResponse(res,err.message,500)
    }
}


const assessmentByCreator = async(req,res) =>{
    try{
        const assessmentRecords = await assessmentService.getallAssessments();
        const trainerNames = await Promise.all(assessmentRecords.map(async (a)=>{
            const trainer = await Trainer.findByPk(a.created_by);
            const creator_id = a.created_by
            a.created_by = trainer.name
            return {...a.dataValues,creator_id}
        }))
        return successResponse(res,trainerNames)
    } catch(err){
        return errorResponse(res,err.message,500,"Assessment not found")
    }
}

const assessmentByTrainer = async(req,res) =>{
    try{
        const fetchedAssessments = await assessmentService.getAssessmentByTrainerId(req.params.trainerId);
        const count = await fetchedAssessments.length
        return successResponse(res,{count : count})
    }catch(err){
        return errorResponse(res,err.message,500)
    }
}



  

const trainer_assessment_count = async (req, res) => {
  try {
    const trainerID = req.params.trainerId;
    const assessmentCount = await assessmentService.getAssessmentByTrainerId(
      trainerID
    );
    const count = assessmentCount.length;
    return successResponse(res, { count: count });
    // res.status(200).json({count:assessmentCount});
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};
const show_assessments = async (req, res) => {
  try {
    const assessment = await assessmentService.getallAssessments();
    return successResponse(res, assessment);
    // res.status(201).json(assessment);
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};

const latestAssessment = async (req, res) => {
  try {
    const fetchedAssessments = await assessments.findAll();
    const responseAssessments = await Promise.all(
      fetchedAssessments.map(async (assessment) => {
        const trainer = await Trainer.findByPk(assessment.created_by);
        return {
          id: assessment.id,
          title: assessment.assessment_name,
          due_date: assessment.duration,
          createdBy: trainer.name,
        };
      })
    );
    return successResponse(res, { assessments: responseAssessments });
    // res.status(201).json({ assessments: responseAssessments });
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};

const getTrainerPerformance = async (req, res) => {
  try {
    const trainerId = req.params.trainerId;
    const fetchedAssessments = await assessmentService.getAssessmentByTrainerId(
      trainerId
    );
    const perf = await Promise.all(
      fetchedAssessments.map(async (assessment) => {
        const perf = {
          greaterThan90: 0,
          greaterThan80: 0,
          greaterThan75: 0,
          greaterThan60: 0,
        };
        const traineeAssessments =
          await assessmentService.getTAwithAssessmentId(assessment.id);
        traineeAssessments.forEach((traineeAssessment) => {
          if (traineeAssessment.performance_score > 90) {
            perf.greaterThan90++;
          } else if (traineeAssessment.performance_score > 80) {
            perf.greaterThan80++;
          } else if (traineeAssessment.performance_score > 75) {
            perf.greaterThan75++;
          } else if (traineeAssessment.performnace_score > 60) {
            perf.greaterThan60++;
          }
        });
        let t = [
          {
            value: perf.greaterThan90,
            label: "Greater than 90",
          },
          {
            value: perf.greaterThan80,
            label: "Greater than 80",
          },
          {
            value: perf.greaterThan75,
            label: "Greater than 75",
          },
          {
            value: perf.greaterThan60,
            label: "Greater than 60",
          },
        ];
        return {
          id: assessment.id,
          title: assessment.assessment_name,
          createdBy: assessment.created_by,
          description: assessment.description,
          perf: t,
        };
      })
    );
    return successResponse(res, perf);
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};

// const completedAssessments = async(req,res) =>{
//     try{
//         const assessment = await assessments.findAll({
//             where:{
//                 status:'completed'
//             },
//         });
//         return successResponse(res,assessment.length)
//         // res.status(201).json(assessment.length);
//     } catch(err){
//         return errorResponse(res,err.message,500,"Assessment not found")
//     }
// }

const showById = async (req, res) => {
  try {
    const assessment = await assessmentService.getAssessmentById(req.params.id);
    if (assessment) return successResponse(res, assessment);
    else return errorResponse(res, err.message, 404, "Assessment not found");
    // else res.status(404).json({error:'Assessment not found.'});
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};
const updateAssessment = async (req, res) => {
  try {
    const assessment = await assessmentService.updateAssessment({
      ...req.body,
      created_by: req.body.creator_id,
    });
    const data = await assessmentService.getAssessmentById(req.params.id);
    return successResponse(res, data);
    // res.json(assessment);
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};
const removeAssessment = async (req, res) => {
  try {
    const assessmentId = req.params.id;
    const assessment = await assessmentService.getAssessmentById(assessmentId);
    if (assessment) {
      if (assessment.status == "Active" || assessment.status == "active") {
        assessment.status = "Deleted";
        await assessment.save();
        return successResponse(res);
        // res.status(200).send('Updated');
      } else {
        return errorResponse(res, err.message, 500, "Assessment not active");
        // res.send("Assessment not active");
      }
    } else {
      return noResponse(res);
      // res.send("Assessment not found");
    }
  } catch (err) {
    return errorResponse(res, err.message, 500, "Assessment not found");
  }
};
module.exports = {
  create_assessment,
  completed_assessment,
  trainer_assessment_count,
  show_assessments,
  assessmentByCreator,
  latestAssessment,
  assessmentByTrainer,
  //   trainerPerformance,
  // completedAssessments,
  showById,
  updateAssessment,
  removeAssessment,
  getTrainerPerformance,
};