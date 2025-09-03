// import { NextResponse } from "next/server"
// import nodemailer from "nodemailer"

// export async function POST(request) {
//   try {
//     const { formData, selectedDate } = await request.json()

//     // Create transporter (you'll need to set these environment variables)
//     const transporter = nodemailer.createTransporter({
//       service: "gmail", // or your preferred email service
//       auth: {
//         user: process.env.EMAIL_USER, // your email
//         pass: process.env.EMAIL_PASS, // your app password
//       },
//     })

//     const formattedDate = selectedDate
//       ? new Date(selectedDate).toLocaleDateString("en-US", {
//           weekday: "long",
//           year: "numeric",
//           month: "long",
//           day: "numeric",
//         })
//       : "Not specified"

//     // Email to business owner
//     const ownerEmailOptions = {
//       from: process.env.EMAIL_USER,
//       to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
//       subject: `New PhotoBooth Booking Request - ${formData.eventType}`,
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #000; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
//             New Booking Request
//           </h2>
          
//           <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #000; margin-top: 0;">Event Details</h3>
//             <p><strong>Date:</strong> ${formattedDate}</p>
//             <p><strong>Event Type:</strong> ${formData.eventType}</p>
//             <p><strong>Location:</strong> ${formData.location}</p>
//             <p><strong>Expected Guests:</strong> ${formData.guests || "Not specified"}</p>
//           </div>

//           <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <h3 style="color: #000; margin-top: 0;">Customer Information</h3>
//             <p><strong>Name:</strong> ${formData.name}</p>
//             <p><strong>Email:</strong> ${formData.email}</p>
//             <p><strong>Phone:</strong> ${formData.phone}</p>
//           </div>

//           ${
//             formData.message
//               ? `
//             <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <h3 style="color: #000; margin-top: 0;">Additional Details</h3>
//               <p>${formData.message}</p>
//             </div>
//           `
//               : ""
//           }

//           <div style="background-color: #FFD700; padding: 15px; border-radius: 8px; margin: 20px 0;">
//             <p style="margin: 0; color: #000; font-weight: bold;">
//               Please respond to this customer within 24 hours to confirm availability and send an invoice.
//             </p>
//           </div>
//         </div>
//       `,
//     }

//     // Confirmation email to customer
//     const customerEmailOptions = {
//       from: process.env.EMAIL_USER,
//       to: formData.email,
//       subject: "PhotoBooth Pro - Booking Request Received",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <h2 style="color: #000; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
//             PhotoBooth Pro
//           </h2>
          
//           <p>Dear ${formData.name},</p>
          
//           <p>Thank you for your interest in PhotoBooth Pro! We have received your booking request for:</p>
          
//           <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//             <p><strong>Event Date:</strong> ${formattedDate}</p>
//             <p><strong>Event Type:</strong> ${formData.eventType}</p>
//             <p><strong>Location:</strong> ${formData.location}</p>
//           </div>

//           <div style="background-color: #FFD700; padding: 15px; border-radius: 8px; margin: 20px 0;">
//             <p style="margin: 0; color: #000; font-weight: bold;">
//               We will review your request and contact you within 24 hours to confirm availability and provide pricing details.
//             </p>
//           </div>

//           <p>If you have any immediate questions, please don't hesitate to contact us:</p>
//           <p>
//             <strong>Phone:</strong> (555) 123-4567<br>
//             <strong>Email:</strong> info@photoboothpro.com
//           </p>

//           <p>We look forward to making your event unforgettable!</p>
          
//           <p>Best regards,<br>
//           The PhotoBooth Pro Team</p>
//         </div>
//       `,
//     }

//     // Send both emails
//     await transporter.sendMail(ownerEmailOptions)
//     await transporter.sendMail(customerEmailOptions)

//     return NextResponse.json({
//       success: true,
//       message: "Booking request sent successfully!",
//     })
//   } catch (error) {
//     console.error("Email sending error:", error)
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to send booking request. Please try again or contact us directly.",
//       },
//       { status: 500 },
//     )
//   }
// }
