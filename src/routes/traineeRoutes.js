const { Router } = require('express');
const router = new Router();
const {
    create_trainee,
    trainee_count,
    show_trainees,
    latest_trainee_count,
    show_by_id,
    get_trainer,
    update_trainee,
    remove_trainee,
} = require('../controllers/traineeController');

const authMiddleware = require('../middlewares/authMiddleware');
// const jwt  = require('jsonwebtoken');
// router.use(authMiddleware)

router.post('/',create_trainee);

router.get('/count',trainee_count);

router.get('/',show_trainees);

router.get('/new/count',latest_trainee_count);

router.get('/:id',show_by_id);

router.get('/task/:traineeId',get_trainer);

router.put('/:id',update_trainee);

router.delete('/remove/:id',remove_trainee);


module.exports = router;
