const express = require('express');
const router = express.Router();
const {create_trainer, show_trainers_by_count, show_assessments_by_id, create_assess_and_trainee_assess, show_trainers, show_trainers_by_id, edit_trainer, remove_trainer } = require('../controllers/trainerController')
// const authenticateToken = require('../middlewares/auth')


router.post('/',create_trainer);

router.get('/count',show_trainers_by_count,);

router.get('/:id/assessments',show_assessments_by_id)

// router.post('/:id/assessments',create_assess_and_trainee_assess)

router.get('/', show_trainers);

router.get('/:id',show_trainers_by_id );

router.put('/:id',edit_trainer );

router.delete('/remove/:id',remove_trainer);

module.exports = router;
