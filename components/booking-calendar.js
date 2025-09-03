"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, ChevronRight, X, Calendar, Loader2 } from "lucide-react"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Mock unavailable dates (in real app, this would come from API)
const unavailableDates = ["2025-01-15", "2025-01-22", "2025-02-14", "2025-02-28", "2025-03-15"]

export default function BookingCalendar({ isOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    location: "",
    guests: "",
    message: "",
  })

  if (!isOpen) return null

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayWeekday = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const isDateUnavailable = (date) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    return unavailableDates.includes(dateString)
  }

  const isDatePast = (date) => {
    const today = new Date()
    const checkDate = new Date(year, month, date)
    return checkDate < today
  }

  const handleDateSelect = (date) => {
    if (isDatePast(date) || isDateUnavailable(date)) return

    const selectedDateObj = new Date(year, month, date)
    setSelectedDate(selectedDateObj)
    setShowBookingForm(true)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/send-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          selectedDate: selectedDate.toISOString(),
        }),
      })

      const result = await response.json()

      if (result.success) {
        alert("Booking request sent successfully! We will contact you within 24 hours to confirm availability.")
        onClose()
        setShowBookingForm(false)
        setSelectedDate(null)
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          location: "",
          guests: "",
          message: "",
        })
      } else {
        alert(result.message || "Failed to send booking request. Please try again.")
      }
    } catch (error) {
      console.error("Error sending booking request:", error)
      alert("Failed to send booking request. Please try again or contact us directly at (555) 123-4567.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>)
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const isPast = isDatePast(date)
      const isUnavailable = isDateUnavailable(date)
      const isDisabled = isPast || isUnavailable

      days.push(
        <button
          key={date}
          onClick={() => handleDateSelect(date)}
          disabled={isDisabled}
          className={`
            h-10 w-full rounded-md text-sm font-medium transition-colors
            ${
              isDisabled
                ? "text-muted-foreground cursor-not-allowed opacity-50"
                : "text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
            }
            ${isUnavailable && !isPast ? "bg-destructive/10 text-destructive" : ""}
          `}
        >
          {date}
        </button>,
      )
    }

    return days
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {showBookingForm ? "Complete Your Booking" : "Select Your Event Date"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {!showBookingForm ? (
            <div className="space-y-6">
              {/* Calendar Header */}
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-xl font-semibold">
                  {MONTHS[month]} {year}
                </h3>
                <Button variant="outline" size="sm" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {DAYS.map((day) => (
                  <div key={day} className="h-10 flex items-center justify-center font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
                {renderCalendarDays()}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-accent rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-destructive/20 border border-destructive rounded"></div>
                  <span>Unavailable</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-muted rounded"></div>
                  <span>Past Date</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Date Display */}
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-accent-foreground">
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">
                    Selected Date:{" "}
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType">Event Type *</Label>
                    <Input
                      id="eventType"
                      name="eventType"
                      placeholder="Wedding, Birthday, Corporate, etc."
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Event Location *</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Venue name and address"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests">Expected Guests</Label>
                    <Input
                      id="guests"
                      name="guests"
                      type="number"
                      placeholder="Approximate number"
                      value={formData.guests}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your event, special requirements, or questions..."
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={isSubmitting}
                    className="mt-1"
                    rows={4}
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowBookingForm(false)}
                    disabled={isSubmitting}
                    className="flex-1"
                  >
                    Back to Calendar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      "Send Booking Request"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
