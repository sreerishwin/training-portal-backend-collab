//assessment model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Trainer = require('./trainer');

const Assessment = sequelize.define('Assessments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    assessment_name: { type: DataTypes.STRING, },
    description: { type:DataTypes.STRING},
    duration: {type: DataTypes.STRING},
    status: {type:DataTypes.ENUM('Active','Inactive','Deleted')},
    assessment_type: {type:DataTypes.ENUM('Course','Quiz','Practical session')},
    created_by: {
        type: DataTypes.INTEGER, allowNull: false, references: {
            model: Trainer,
            key: 'id'
        },
    },
}, {
    timestamps: true,
});

module.exports = Assessment;