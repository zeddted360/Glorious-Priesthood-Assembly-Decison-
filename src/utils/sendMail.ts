import nodemailer from "nodemailer";

// Define the email configuration
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email service (e.g., Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to send the new member notification email
export const sendNewMemberEmail = async (memberDetails: {
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  state: string;
  country: string;
  invitedBy: string;
}) => {
  const { fullName, phone, whatsapp, email, state, country, invitedBy } =
    memberDetails;

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: process.env.ADMIN_EMAIL, // Your email address to receive notifications
    subject: "New Member Decision Information", // Email subject
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">New Member</h1>
          <p style="color: #666;">A new member Decision details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f8f8f8;">
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Full Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="tel:${phone}" style="color: #4CAF50; text-decoration: none;">${phone}</a>
              </td>
            </tr>
            <tr style="background-color: #f8f8f8;">
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>WhatsApp:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                ${
                  whatsapp
                    ? `<a href="https://wa.me/${whatsapp}" style="color: #25D366; text-decoration: none;">Send WhatsApp Message</a>`
                    : "Not provided"
                }
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                <a href="mailto:${email}" style="color: #4CAF50; text-decoration: none;">${email}</a>
              </td>
            </tr>
            <tr style="background-color: #f8f8f8;">
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>State:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${state}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Country:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #ddd;">${country}</td>
            </tr>
            <tr style="background-color: #f8f8f8;">
              <td style="padding: 10px;"><strong>Invited By:</strong></td>
              <td style="padding: 10px;">${invitedBy || "Not provided"}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("New member notification email sent successfully.");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
