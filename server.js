require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.static('src'));

// Create mail transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

app.post('/send-choices', (req, res) => {
    const { choices } = req.body;
    
    const mailOptions = {
        from: 'jinshinguyen@gmail.com',
        to: 'kongathui90@gmail.com',
        subject: "Women's Day Gift Choices",
        text: `Selected choices:\n1. ${choices[0]}\n2. ${choices[1]}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});