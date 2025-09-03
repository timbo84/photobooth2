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

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">PhotoBooth Pro</h3>
              <p className="opacity-90 mb-4">
                Creating unforgettable memories one photo at a time.
                Professional photobooth rentals for all your special occasions.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 opacity-90">
                <li>
                  <a
                    href="#services"
                    className="hover:text-accent transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:text-accent transition-colors"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-accent transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-accent transition-colors"
                  >
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
      );
    }