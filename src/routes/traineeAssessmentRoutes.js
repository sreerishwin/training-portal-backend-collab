const express = require('express');
// const authenticateToken = require('../middlewares/auth')
const {create_tAssessment,
    show_tAssessments_count,
    show_tAssessments,
    statistics,
    show_tAssessment_byId,
    update_tAssessment,
    remove_tAssessment } = require('../controllers/traineeAssessmentsController')

const router = express.Router();

router.post('/',create_tAssessment);

router.get('/count',show_tAssessments_count);

router.get('/',show_tAssessments);

router.get('/statistics',statistics);

router.get('/:id',show_tAssessment_byId);

router.put('/:id',update_tAssessment);

router.delete('/:id',remove_tAssessment);

module.exports = router;
