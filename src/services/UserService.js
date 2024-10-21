// src/services/UserService.js
const User = require('../models/User');
// const forgotpassword = require('../models/forgotpassword');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const EmailService = require('./Emailservice'); 
const crypto = require('crypto'); 

class UserService {
  static async register(username, email, password, confirmPassword) {
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await User.create({ username, email, password: hashedPassword });

        // Send a welcome email after successful registration
        await EmailService.sendWelcomeEmail(email, username);
    
        return user;
    } catch(error) {
        throw new Error('Username or Email already exist')
    }
  }
    static async login(email, password) {
        const user = await User.findOne({ where: { email } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new Error('Invalid credentials');
        }
        
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        return {
            token,
            emailid:user.email,
            passwordid:user.password,
            username: user.username,
            status: user.status 
        };
    }
    
    static async getAllUsers() {
        return await User.findAll();
    }

    static async getUserById(id) {
        return await User.findByPk(id);
    }

    static async updateUser(id, updates, confirmPassword) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');

        if (updates.password && updates.password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        await user.update(updates);
        return user;
    }

    static async deleteUser(id) {
        const user = await User.findByPk(id);
        if (!user) throw new Error('User not found');
        await user.destroy();
        return user;
    }
    
    static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('User not found');

    user.status = 'Deleted';
    await user.save(); 

    return user; 
}

    static async requestPasswordReset(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        // Generate a verification code or token
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // Example: 6-digit code
        user.verificationCode = verificationCode;
        user.verificationCodeExpiry = Date.now() + 3600000; // Valid for 1 hour
        await user.save();

        // Send the verification code to the user's email
        await EmailService.sendPasswordResetEmail(email, verificationCode);
    }

    static async verifyCode(email, code) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('User not found');

        // Check if the verification code is valid and not expired
        if (user.verificationCode !== code || Date.now() > user.verificationCodeExpiry) {
            throw new Error('Invalid or expired verification code');
        }

        return user; // Return the user if the code is valid
    }

    static async resetPassword(userId, newPassword) {
        const user = await User.findByPk(userId);
        if (!user) throw new Error('User not found');

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.verificationCode = null; // Clear the verification code
        user.verificationCodeExpiry = null; // Clear expiry
        await user.save();
    }
}

module.exports = UserService;
