"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Camera,
  Users,
  Star,
  Phone,
  Mail,
  X,
  Menu,
} from "lucide-react";
import BookingCalendar from "@/components/booking-calendar";

export default function HomePage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openCalendar = () => setIsCalendarOpen(true);
  const closeCalendar = () => setIsCalendarOpen(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (action) => {
    closeMobileMenu();
    if (action === "book") {
      openCalendar();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      

      {/* Hero Section */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-background to-card"
        style={{
          backgroundImage: "url('/hero-background.jpg')",
          backgroundSize: "fit",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-bold text-white mb-6 text-balance"
            style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.6)" }}
          >
            Capture the Moment, Create the Memories!
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-200 mb-8 text-pretty"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.5)" }}
          >
            Professional photobooth rentals for weddings, parties, and corporate
            events. Instant prints, custom backdrops, and unforgettable
            experiences.
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
              className="text-lg px-8 py-4 border-foreground text-gray-200 hover:bg-foreground hover:text-background bg-transparent"
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
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Professional Quality
                </h3>
                <p className="text-muted-foreground">
                  High-resolution cameras with professional lighting ensure
                  every photo is picture-perfect.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Custom Experiences
                </h3>
                <p className="text-muted-foreground">
                  Personalized backdrops, props, and photo templates tailored to
                  your event theme.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Instant Memories
                </h3>
                <p className="text-muted-foreground">
                  Immediate photo prints and digital copies so guests can share
                  memories instantly.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What Our Clients Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The photobooth was the highlight of our wedding! Our guests
                  couldn't stop taking pictures, and we have the most amazing
                  memories to look back on."
                </p>
                <p className="font-semibold text-foreground">
                  - Sarah & Mike Johnson
                </p>
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
                  "Professional service from start to finish. The setup was
                  seamless and the photo quality exceeded our expectations.
                  Highly recommend!"
                </p>
                <p className="font-semibold text-foreground">
                  - Corporate Event Planner
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-accent text-accent-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make Your Event Unforgettable?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Book your photobooth today and give your guests an experience
            they'll never forget.
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

    
    </div>
  );
}
