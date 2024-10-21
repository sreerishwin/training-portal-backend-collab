
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trainee = require('./trainee');
const Assessment = require('./assessments');

const TraineeAssessment = sequelize.define('trainee_assessments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING,  },
    due_date: { type: DataTypes.DATE, allowNull: false },
    duration: { type: DataTypes.STRING, allowNull: false },
    performance_score: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.ENUM('todo', 'in_progress', 'hold', 'completed'), allowNull: false },
    assessment_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: Assessment,
            key: 'id',
        }
    },
    trainee_id: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: Trainee,
            key: 'id',
        }
    },
}, {
    timestamps: true,
});

module.exports = TraineeAssessment;