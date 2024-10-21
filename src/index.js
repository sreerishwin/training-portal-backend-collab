// models
const User = require('./models/User');

require ('dotenv').config();
const express = require('express');
const sequelize = require('./config/database'); 
const cors = require('cors');
const app = express();

//routes
const userRoutes = require('./routes/userRoutes');
const traineeRoutes = require('./routes/traineeRoutes');
const trainerRoutes = require('./routes/trainerRoutes');
const roleRoutes = require('./routes/roleRoutes');
const t_assessmentRoutes = require('./routes/traineeAssessmentRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');

sequelize.sync()
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

//NITHISH
app.use('/api/auth', userRoutes);
app.use('/api/trainees',traineeRoutes);
app.use('/api/trainers',trainerRoutes);
app.use('/api/roles',roleRoutes);
app.use('/api/trainee_assessments',t_assessmentRoutes);
app.use('/api/assessments',assessmentRoutes);





const syncDatabase = async () => {
    try {
        await User.sync(); // Sync the User model
        console.log('User table synced successfully');
    } catch (error) {
        console.error('Error syncing User table:', error);
    }
};

const startServer = async () => {
    try {
        // await assessments.sync({alter:true});
        await syncDatabase(); // Sync before starting the server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`); 
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();