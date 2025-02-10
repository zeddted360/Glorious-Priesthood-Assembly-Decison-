import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, phone, subject, message } =
      await req.json();

    // Validate input
    if (!firstName || !lastName || !email || !subject || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
          <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #333; text-align: center; border-bottom: 2px solid #4a90e2; padding-bottom: 15px;">New Contact Form Submission</h1>
            
            <div style="margin-top: 20px;">
              <p style="margin: 10px 0;"><strong>Name:</strong> ${firstName} ${lastName}</p>
              <p style="margin: 10px 0;"><strong>Email:</strong> 
                <a href="mailto:${email}" style="color: #4a90e2; text-decoration: none;">${email}</a>
              </p>
              <p style="margin: 10px 0;"><strong>Phone:</strong> 
                ${
                  phone
                    ? `
                  <a href="tel:${phone}" style="color: #4a90e2; text-decoration: none;">${phone}</a> 
                  | <a href="https://wa.me/${phone}" style="color: #25d366; text-decoration: none;">WhatsApp</a>
                `
                    : "Not provided"
                }
              </p>
              <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 10px 0; background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                <strong>Message:</strong><br>
                ${message}
              </p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { message: "Error sending message" },
      { status: 500 }
    );
  }
}
