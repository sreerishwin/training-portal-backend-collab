const express = require("express");
const {
  create_assessment,
  completed_assessment,
  trainer_assessment_count,
  show_assessments,
  assessmentByCreator,
  latestAssessment,
  assessmentByTrainer,
  completedAssessments,
  showById,
  updateAssessment,
  removeAssessment,
  getTrainerPerformance,
} = require("../controllers/assessmentController");
// const authenticateToken = require('../middlewares/auth')
const router = express.Router();

router.post("/", create_assessment);

router.get("/completed/:trainerId", completed_assessment);

router.get("/count/:trainerId", trainer_assessment_count);

router.get("/", show_assessments);

router.get("/createdByPassing", assessmentByCreator);

router.get("/latest", latestAssessment);

router.get("/performance/:trainerId", getTrainerPerformance);

// router.get('/active',completedAssessments);

router.get('/:trainerId',assessmentByTrainer);

router.put("/:id", updateAssessment);

router.delete("/remove/:id", removeAssessment);

module.exports = router;
