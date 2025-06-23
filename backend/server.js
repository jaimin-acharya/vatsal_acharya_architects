const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Verify environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Error: EMAIL_USER and EMAIL_PASS must be set in .env file');
  process.exit(1);
}

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify transporter
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error verifying email transporter:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Received contact form submission:', req.body);
  
  const { name, email, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    console.error('Missing required fields:', { name, email, subject, message });
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'jaiminacharya333@gmail.com',
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Environment variables loaded:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
    PORT: process.env.PORT || 5000
  });
}); 