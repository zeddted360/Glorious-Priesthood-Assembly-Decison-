import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface IVisitorInfo {
  name: string;
  email: string;
  phone: string;
  firstTime: string;
  service: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    const data: IVisitorInfo = await request.json()

    // Format phone number for WhatsApp (remove non-numeric characters)
    const whatsappNumber = data.phone.replace(/\D/g, "");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: "New Visitor Information",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 8px;
            }
            .header {
              background-color: #4a90e2;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 8px 8px 0 0;
              margin: -20px -20px 20px -20px;
            }
            .info-item {
              background-color: white;
              padding: 15px;
              margin-bottom: 10px;
              border-radius: 4px;
              border-left: 4px solid #4a90e2;
            }
            .label {
              font-weight: bold;
              color: #666;
              margin-bottom: 5px;
            }
            .value {
              color: #333;
            }
            .action-buttons {
              margin-top: 20px;
              text-align: center;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 0 10px;
              border-radius: 5px;
              text-decoration: none;
              font-weight: bold;
            }
            .email-btn {
              background-color: #4a90e2;
              color: white;
            }
            .phone-btn {
              background-color: #27ae60;
              color: white;
            }
            .whatsapp-btn {
              background-color: #25d366;
              color: white;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Visitor Information</h2>
            </div>
            
            <div class="info-item">
              <div class="label">Name:</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="info-item">
              <div class="label">Email:</div>
              <div class="value">
                <a href="mailto:${data.email}" style="color: #4a90e2;">${data.email}</a>
              </div>
            </div>
            
            <div class="info-item">
              <div class="label">Phone:</div>
              <div class="value">
                <a href="tel:${data.phone}" style="color: #4a90e2;">${data.phone}</a>
              </div>
            </div>
            
            <div class="info-item">
              <div class="label">First Time Visitor:</div>
              <div class="value">${data.firstTime}</div>
            </div>
            
            <div class="info-item">
              <div class="label">Requested Service:</div>
              <div class="value">${data.service}</div>
            </div>
            
            <div class="action-buttons">
              <a href="mailto:${data.email}" class="button email-btn">
                Send Email
              </a>
              <a href="tel:${data.phone}" class="button phone-btn">
                Call
              </a>
              <a href="https://wa.me/${whatsappNumber}" class="button whatsapp-btn">
                WhatsApp
              </a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to submit and send email" },
      { status: 500 }
    );
  }
}
