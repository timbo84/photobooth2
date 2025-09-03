// import { NextResponse } from "next/server"
// import Stripe from "stripe"
// import nodemailer from "nodemailer"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// export async function POST(request) {
//   try {
//     const { paymentIntentId } = await request.json()

//     // Retrieve the payment intent to get payment details
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

//     if (paymentIntent.status === "succeeded") {
//       // Send confirmation emails
//       const transporter = nodemailer.createTransporter({
//         service: "gmail",
//         auth: {
//           user: process.env.EMAIL_USER,
//           pass: process.env.EMAIL_PASS,
//         },
//       })

//       const { metadata } = paymentIntent
//       const amount = (paymentIntent.amount / 100).toFixed(2)

//       // Email to business owner
//       const ownerEmailOptions = {
//         from: process.env.EMAIL_USER,
//         to: process.env.BUSINESS_EMAIL || process.env.EMAIL_USER,
//         subject: `Payment Received - ${metadata.customerName}`,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2 style="color: #000; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
//               Payment Received
//             </h2>
            
//             <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <h3 style="color: #000; margin-top: 0;">Payment Details</h3>
//               <p><strong>Amount:</strong> $${amount}</p>
//               <p><strong>Package:</strong> ${metadata.package}</p>
//               <p><strong>Payment ID:</strong> ${paymentIntentId}</p>
//             </div>

//             <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <h3 style="color: #000; margin-top: 0;">Customer Information</h3>
//               <p><strong>Name:</strong> ${metadata.customerName}</p>
//               <p><strong>Email:</strong> ${metadata.customerEmail}</p>
//               <p><strong>Event Date:</strong> ${metadata.eventDate}</p>
//               <p><strong>Event Type:</strong> ${metadata.eventType}</p>
//             </div>

//             <div style="background-color: #FFD700; padding: 15px; border-radius: 8px; margin: 20px 0;">
//               <p style="margin: 0; color: #000; font-weight: bold;">
//                 Payment has been successfully processed. Please prepare for the event and contact the customer to confirm final details.
//               </p>
//             </div>
//           </div>
//         `,
//       }

//       // Email to customer
//       const customerEmailOptions = {
//         from: process.env.EMAIL_USER,
//         to: metadata.customerEmail,
//         subject: "PhotoBooth Pro - Payment Confirmation",
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <h2 style="color: #000; border-bottom: 3px solid #FFD700; padding-bottom: 10px;">
//               Payment Confirmation
//             </h2>
            
//             <p>Dear ${metadata.customerName},</p>
            
//             <p>Thank you for your payment! Your photobooth rental has been confirmed.</p>
            
//             <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
//               <h3 style="color: #000; margin-top: 0;">Booking Details</h3>
//               <p><strong>Package:</strong> ${metadata.package}</p>
//               <p><strong>Amount Paid:</strong> $${amount}</p>
//               <p><strong>Event Date:</strong> ${metadata.eventDate}</p>
//               <p><strong>Event Type:</strong> ${metadata.eventType}</p>
//               <p><strong>Payment ID:</strong> ${paymentIntentId}</p>
//             </div>

//             <div style="background-color: #FFD700; padding: 15px; border-radius: 8px; margin: 20px 0;">
//               <p style="margin: 0; color: #000; font-weight: bold;">
//                 Your booking is now confirmed! We will contact you 1-2 days before your event to coordinate setup details.
//               </p>
//             </div>

//             <p>If you have any questions, please contact us:</p>
//             <p>
//               <strong>Phone:</strong> (555) 123-4567<br>
//               <strong>Email:</strong> info@photoboothpro.com
//             </p>

//             <p>We look forward to making your event unforgettable!</p>
            
//             <p>Best regards,<br>
//             The PhotoBooth Pro Team</p>
//           </div>
//         `,
//       }

//       await transporter.sendMail(ownerEmailOptions)
//       await transporter.sendMail(customerEmailOptions)

//       return NextResponse.json({ success: true })
//     } else {
//       return NextResponse.json({ error: "Payment not successful" }, { status: 400 })
//     }
//   } catch (error) {
//     console.error("Error confirming payment:", error)
//     return NextResponse.json({ error: "Failed to confirm payment" }, { status: 500 })
//   }
// }
