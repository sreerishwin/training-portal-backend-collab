const express = require('express');
const {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    requestPasswordReset, 
    verifyCode, 
    resetPassword 
} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/request-password-reset', requestPasswordReset); 
router.post('/verify-code', verifyCode); 
router.post('/reset-password/:userId', resetPassword);

router.get('/users', getAllUsers);
router.get('/users/:id',authMiddleware(), getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);
router.put('/users/:id/toggle-status', deleteUser); 

module.exports = router;