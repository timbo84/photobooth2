"use client";

import { useState } from "react";
import { Menu, X, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "./ui/button";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openCalendar = () => {
    // Implement calendar opening logic here
    // For now, just close the mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (action) => {
    if (action === "book") {
      openCalendar();
    }
    closeMobileMenu();
  };

  return (
    // Navigation
    <nav className="relative flex items-center justify-between p-4 md:p-6 border-b border-border">
      <a href="/" className="text-2xl font-bold text-foreground hover:text-accent transition-colors">
        PhotoBooth Pro
      </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#services"
            className="text-foreground hover:text-accent transition-colors"
          >
            Services
          </a>
          <a
            href="#gallery"
            className="text-foreground hover:text-accent transition-colors"
          >
            Gallery
          </a>
          <a
            href="#contact"
            className="text-foreground hover:text-accent transition-colors"
          >
            Contact
          </a>
          <a
            href="/payment"
            className="text-foreground hover:text-accent transition-colors"
          >
            payment"test"
          </a>
          <Button
            onClick={openCalendar}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Book Now
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 relative z-50"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMobileMenu}
          />
        )}

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
              <button
                onClick={closeMobileMenu}
                className="p-2"
                aria-label="Close mobile menu"
              >
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
      </nav>)
}