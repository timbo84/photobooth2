"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Camera, Users, Star, Phone, Mail, X, Menu } from "lucide-react"
import BookingCalendar from "@/components/booking-calendar"

export default function HomePage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const openCalendar = () => setIsCalendarOpen(true)
  const closeCalendar = () => setIsCalendarOpen(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleNavClick = (action) => {
    closeMobileMenu()
    if (action === "book") {
      openCalendar()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative flex items-center justify-between p-4 md:p-6 border-b border-border">
        <div className="text-2xl font-bold text-foreground">PhotoBooth Pro</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#services" className="text-foreground hover:text-accent transition-colors">
            Services
          </a>
          <a href="#gallery" className="text-foreground hover:text-accent transition-colors">
            Gallery
          </a>
          <a href="#contact" className="text-foreground hover:text-accent transition-colors">
            Contact
          </a>
          <Button onClick={openCalendar} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Book Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button onClick={toggleMobileMenu} className="md:hidden p-2 relative z-50" aria-label="Toggle mobile menu">
          {isMobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={closeMobileMenu} />}

        {/* Mobile Menu */}
        <div
          className={`
          fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-40 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="text-xl font-bold text-foreground">Menu</div>
              <button onClick={closeMobileMenu} className="p-2" aria-label="Close mobile menu">
                <X className="h-5 w-5 text-foreground" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 flex flex-col justify-between p-4">
              <div className="space-y-6">
                {/* Navigation Links */}
                <div className="space-y-4">
                  <a
                    href="#services"
                    onClick={() => handleNavClick()}
                    className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
                  >
                    Services
                  </a>
                  <a
                    href="#gallery"
                    onClick={() => handleNavClick()}
                    className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
                  >
                    Gallery
                  </a>
                  <a
                    href="#contact"
                    onClick={() => handleNavClick()}
                    className="block text-lg font-medium text-foreground hover:text-accent transition-colors py-2"
                  >
                    Contact
                  </a>
                </div>

                {/* Book Now Button */}
                <div className="pt-4 border-t border-border">
                  <Button
                    onClick={() => handleNavClick("book")}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-3"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Now
                  </Button>
                </div>
              </div>

              {/* Contact Info in Mobile Menu */}
              <div className="space-y-4 pt-6 border-t border-border">
                <h4 className="font-semibold text-foreground">Contact Us</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>(555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>info@photoboothpro.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background to-card">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Capture the Moment, Create the Memories!
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty">
            Professional photobooth rentals for weddings, parties, and corporate events. Instant prints, custom
            backdrops, and unforgettable experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={openCalendar}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-4"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Check Availability
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-foreground text-foreground hover:bg-foreground hover:text-background bg-transparent"
            >
              View Gallery
            </Button>
          </div>
        </div>
      </section>

      {/* Unique Selling Points */}
      <section className="py-16 px-4 bg-card">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            Why Choose PhotoBooth Pro?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Camera className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Professional Quality</h3>
                <p className="text-muted-foreground">
                  High-resolution cameras with professional lighting ensure every photo is picture-perfect.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Custom Experiences</h3>
                <p className="text-muted-foreground">
                  Personalized backdrops, props, and photo templates tailored to your event theme.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">Instant Memories</h3>
                <p className="text-muted-foreground">
                  Immediate photo prints and digital copies so guests can share memories instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The photobooth was the highlight of our wedding! Our guests couldn't stop taking pictures, and we
                  have the most amazing memories to look back on."
                </p>
                <p className="font-semibold text-foreground">- Sarah & Mike Johnson</p>
              </CardContent>
            </Card>
            <Card className="p-6 border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Professional service from start to finish. The setup was seamless and the photo quality exceeded our
                  expectations. Highly recommend!"
                </p>
                <p className="font-semibold text-foreground">- Corporate Event Planner</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Event Unforgettable?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your photobooth today and give your guests an experience they'll never forget.
          </p>
          <Button
            onClick={openCalendar}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-4"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Your Date Now
          </Button>
        </div>
      </section>

      {/* Booking Calendar */}
      <BookingCalendar isOpen={isCalendarOpen} onClose={closeCalendar} />

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">PhotoBooth Pro</h3>
              <p className="opacity-90 mb-4">
                Creating unforgettable memories one photo at a time. Professional photobooth rentals for all your
                special occasions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 opacity-90">
                <li>
                  <a href="#services" className="hover:text-accent transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-accent transition-colors">
                    Gallery
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-accent transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-accent transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 opacity-90">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>info@photoboothpro.com</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center opacity-75">
            <p>&copy; 2025 PhotoBooth Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
