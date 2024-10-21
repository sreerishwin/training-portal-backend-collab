// src/controllers/authController.js

const UserService = require('../services/UserService');
const{successResponse , noResponse, errorResponse} = require('../functions/response');

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const user = await UserService.register(username, email, password, confirmPassword);
        return successResponse(res,{ userId: user.id }, "User added sucessfully")
        // res.status(201).json({ message: 'User created', userId: user.id });
    } catch (error) {
        console.log(error)
        return errorResponse(res, error.message, 500, 'Error registering user');
    }
};

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;
        const { token, username, status } = await UserService.login(email, password);
        return successResponse(res,{ token, email, password, username, status })
        // res.json({ token, email, password, username, status });
    } catch (err) {
        return errorResponse(res,err.message,401);
        // res.status(401).json({ message: error.message });
    }

};

exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;
    try {
        await UserService.requestPasswordReset(email);
        return successResponse(res,{ message: 'Verification code sent to your email' })
        // res.json({ message: 'Verification code sent to your email' });
    } catch (err) {
        return errorResponse(res,err.message,500)
    }
};

exports.verifyCode = async (req, res) => {
    const { email, code } = req.body;
    try {
        const user = await UserService.verifyCode(email, code);
        return successResponse(res,{ message: 'Verification code verified', userId: user.id } )
        // res.json({ message: 'Verification code verified', userId: user.id });
    } catch (err) {
        return errorResponse(res,err.message,500)
    }
};

exports.resetPassword = async (req, res) => {
    const { userId } = req.params; 
    const { newPassword } = req.body;

    try {
        await UserService.resetPassword(userId, newPassword);
        return successResponse(res,{ message: 'Password has been reset successfully' } )
        // res.json({ message: 'Password has been reset successfully' });
    } catch (err) {
        return errorResponse(res,err.message,500)
    }
};



exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();
        return successResponse(res,users);
        // res.json(users);
    } catch (err) {
        return errorResponse(res,err.message,500, 'Error fetching users')
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.id);
        if (!user) 
            return successResponse(res,user,message= 'User not found');
            // return res.status(404).json({ message: 'User not found' });   
     } catch (err) {
        return errorResponse(res,err.message,500, 'Error fetching users')
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { password, confirmPassword, ...updates } = req.body;
        const user = await UserService.updateUser(req.params.id, updates, confirmPassword);
        return successResponse(res,user);
        //  return res.json(user);
    } catch (err) {
        return errorResponse(res,err.message,500, 'Error updating users')
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await UserService.deleteUser(req.params.id);
        return successResponse(res);
        // res.status(204).send();
    } catch (err) {
        return errorResponse(res,err.message,500, 'Error deleting user')
    }
}
exports.deleteUser = async (req, res) => {
    try {
        const user = await UserService.deleteUser(req.params.id);
        return successResponse(res,user,message=  'User status changed to Deleted');
        // res.status(200).json({ message: 'User status changed to Deleted', user });
    } catch (error) {
        res.status(500).json({ message: 'Error changing user status', error: error.message });
    }
};




