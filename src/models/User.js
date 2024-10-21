const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Active', 'Inactive', 'Deleted'),
        defaultValue: 'Active',
    },    
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    verificationCodeExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiry: {
        type: DataTypes.DATE,
        allowNull: true,
    }
});

// Sync the model with the database
// const syncDatabase = async () => {
//     try {
//         await User.sync({ alter: true }); // This will update the existing table
//         console.log('User table synced successfully');
//     } catch (error) {
//         console.error('Error syncing User table:', error);
//     }
// };
// syncDatabase();

module.exports = User;