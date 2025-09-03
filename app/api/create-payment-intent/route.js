// import { NextResponse } from "next/server"
// import Stripe from "stripe"

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// export async function POST(request) {
//   try {
//     const { amount, currency = "usd", packageName, customerInfo } = await request.json()

//     // Create a PaymentIntent with the order amount and currency
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Stripe expects amount in cents
//       currency: currency,
//       metadata: {
//         package: packageName,
//         customerName: customerInfo.name,
//         customerEmail: customerInfo.email,
//         eventDate: customerInfo.eventDate,
//         eventType: customerInfo.eventType,
//       },
//     })

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//     })
//   } catch (error) {
//     console.error("Error creating payment intent:", error)
//     return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
//   }
// }
