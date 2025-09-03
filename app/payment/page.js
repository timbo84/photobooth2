"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CreditCard, Shield, CheckCircle } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const PACKAGES = {
  basic: {
    name: "Basic Package",
    price: 299,
    duration: "2 hours",
    features: [
      "Professional photobooth setup",
      "Unlimited photos during event",
      "Instant photo prints",
      "Basic props included",
      "Setup and breakdown",
    ],
  },
  premium: {
    name: "Premium Package",
    price: 449,
    duration: "4 hours",
    features: [
      "Everything in Basic Package",
      "Extended 4-hour rental",
      "Custom backdrop design",
      "Premium props collection",
      "Digital photo gallery",
      "Social media sharing",
    ],
  },
  deluxe: {
    name: "Deluxe Package",
    price: 649,
    duration: "6 hours",
    features: [
      "Everything in Premium Package",
      "Extended 6-hour rental",
      "Video messaging feature",
      "Custom photo templates",
      "Attendant included",
      "Same-day digital delivery",
    ],
  },
}

function CheckoutForm({ selectedPackage, customerInfo }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (selectedPackage && customerInfo.name) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: PACKAGES[selectedPackage].price,
          packageName: PACKAGES[selectedPackage].name,
          customerInfo,
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
    }
  }, [selectedPackage, customerInfo])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)

    const cardElement = elements.getElement(CardElement)

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customerInfo.name,
          email: customerInfo.email,
        },
      },
    })

    if (error) {
      setPaymentStatus({ type: "error", message: error.message })
    } else if (paymentIntent.status === "succeeded") {
      // Confirm payment on server
      await fetch("/api/confirm-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentIntentId: paymentIntent.id }),
      })

      setPaymentStatus({ type: "success", message: "Payment successful!" })
    }

    setIsProcessing(false)
  }

  if (paymentStatus?.type === "success") {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-4">
            Your photobooth rental has been confirmed. You will receive a confirmation email shortly.
          </p>
          <Button
            onClick={() => (window.location.href = "/")}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Return to Homepage
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-card p-4 rounded-lg border border-border">
        <Label className="text-sm font-medium text-muted-foreground">Card Information</Label>
        <div className="mt-2 p-3 border border-border rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
                  "::placeholder": {
                    color: "#6b7280",
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {paymentStatus?.type === "error" && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-md">
          {paymentStatus.message}
        </div>
      )}

      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Pay ${PACKAGES[selectedPackage]?.price}
          </>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Shield className="h-4 w-4" />
        <span>Secured by Stripe</span>
      </div>
    </form>
  )
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    eventDate: "",
    eventType: "",
  })
  const [selectedPackage, setSelectedPackage] = useState("basic")
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    // Get customer info from URL params (sent via email link)
    setCustomerInfo({
      name: searchParams.get("name") || "",
      email: searchParams.get("email") || "",
      eventDate: searchParams.get("date") || "",
      eventType: searchParams.get("type") || "",
    })

    const pkg = searchParams.get("package")
    if (pkg && PACKAGES[pkg]) {
      setSelectedPackage(pkg)
    }
  }, [searchParams])

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const proceedToCheckout = () => {
    if (customerInfo.name && customerInfo.email) {
      setShowCheckout(true)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Complete Your PhotoBooth Rental</h1>
          <p className="text-muted-foreground">Secure online payment powered by Stripe</p>
        </div>

        {!showCheckout ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Package Selection */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Select Your Package</h2>
              <div className="space-y-4">
                {Object.entries(PACKAGES).map(([key, pkg]) => (
                  <Card
                    key={key}
                    className={`cursor-pointer transition-all ${
                      selectedPackage === key ? "ring-2 ring-accent border-accent" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedPackage(key)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground">{pkg.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-foreground">${pkg.price}</div>
                        </div>
                      </div>
                      <ul className="space-y-1">
                        {pkg.features.map((feature, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-accent" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Confirm Your Details</h2>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      value={customerInfo.eventDate}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType">Event Type</Label>
                    <Input
                      id="eventType"
                      name="eventType"
                      value={customerInfo.eventType}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    onClick={proceedToCheckout}
                    disabled={!customerInfo.name || !customerInfo.email}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Proceed to Payment
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {PACKAGES[selectedPackage].name} - ${PACKAGES[selectedPackage].price}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Elements stripe={stripePromise}>
                  <CheckoutForm selectedPackage={selectedPackage} customerInfo={customerInfo} />
                </Elements>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
