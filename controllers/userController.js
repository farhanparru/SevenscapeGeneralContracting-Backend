const nodemailer = require("nodemailer");
const Customer = require('../models/User')

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Bypasses SSL verification
  },
});

module.exports = {
  Contactus: async (req, res) => {
    try {
      const { fullName, email, phone, serviceNeeded, message } = req.body;

      // Validate required fields

      if (!fullName || !email || !message) {
        return res
          .status(404)
          .json({ error: "Full name, email, and message are required" });
      }

      // Save customer data to MongoDB
      const newCustomer = new Customer({
        fullName,
        email,
        phone,
        serviceNeeded,
        message,
      });

      await newCustomer.save();

      // Email options
      const mailOptions = {
        from: email,
        to: "info@sevesacpe.ae",
        subject: `New Contact Request from ${fullName}`,
        html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #2c3e50;
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          border: 1px solid #e0e0e0;
          border-top: none;
          padding: 25px;
          background-color: #f9f9f9;
        }
        .details {
          background-color: white;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        .detail-row {
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .label {
          font-weight: bold;
          color: #2c3e50;
          display: inline-block;
          width: 120px;
        }
        .footer {
          margin-top: 20px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
        .message-box {
          background-color: #f0f7ff;
          border-left: 4px solid #3498db;
          padding: 15px;
          margin-top: 15px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>New Contact Request</h1>
      </div>
      
      <div class="content">
        <div class="details">
          <div class="detail-row">
            <span class="label">Full Name:</span>
            <span>${fullName}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Email:</span>
            <span>${email}</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Phone:</span>
            <span>${phone?.countryCode || ""}${
          phone?.number || "Not provided"
        }</span>
          </div>
          
          <div class="detail-row">
            <span class="label">Service Needed:</span>
            <span>${serviceNeeded || "Not specified"}</span>
          </div>
        </div>
        
        <div class="message-box">
          <h3 style="margin-top: 0; color: #2c3e50;">Message:</h3>
          <p style="white-space: pre-line;">${message}</p>
        </div>
        
        <div class="footer">
          <p>This message was sent via the website contact form on ${new Date().toLocaleString()}</p>
          <p>© ${new Date().getFullYear()} Sevenscape General Contracting and Facility Management Services L.L.C. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,
      };

      // send Email

      await transporter.sendMail(mailOptions);
      res
        .status(200)
        .json({
          message: "Thank you for contacting us! We will get back to you soon.",
        });
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          error:
            "An error occurred while sending your message. Please try again later.",
        });
    }
  },
};
