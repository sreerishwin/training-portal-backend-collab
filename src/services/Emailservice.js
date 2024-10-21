const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
 
class EmailService {
  static async sendWelcomeEmail(email, username) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to our Training Portal!',
      text: `Hello ${username},\n\nThank you for registering with us!\n\nBest regards,\nKnackforge`,
      html: `<p>Hello ${username},</p><p>Thank you for registering with us!</p><p>Best regards,<br>Knackforge</p>`
    };
 
    await transporter.sendMail(mailOptions);
  }
 
  static async sendPasswordResetEmail(email, resetLink) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Hi,\n We received a request to reset your password. Use the code below to create a new password: ${resetLink} \n\n This code is valid for 30 minutes.If you did not request a password reset, please ignore this email.\n\n\n\n\n Thank You \n\nThe Support Team ${resetLink}`,
      html: ` <div style="background-color:white; border: 1px solid black;
      width: 500px;
      border: 15px black;
      padding: 50px;
      margin: 20px;">
      <h1 style="background-color:blue; padding: 22px; border-top-left-radius: 8px; border-top-right-radius: 8px; color:white; text-align: center;" >Password Reset Request</h1>
      <p>Hi, </p><p>We received a request to reset your password. Use the code below to create a new password:</p>
 
       <p  style="font-weight: bold;  font-size: 40px;">${resetLink} </p>
       
       <p>This code is valid for 30 minutes.If you did not request a password reset, please ignore this email.<p/>
 
       <p> Thank You </p> <p>The Suppport Team</p></div>`
    };
 
    await transporter.sendMail(mailOptions);
  }
}
 
module.exports = EmailService;
 