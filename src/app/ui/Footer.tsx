import React from 'react'
import Link from 'next/link'
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Glorious Priesthood Assembly
            </h3>
            <p className="text-gray-400">
              Transforming lives through the power of God's word
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white"
                >
                  Service Times
                </Link>
              </li>
              <li>
                <Link
                  href="/members"
                  className="text-gray-400 hover:text-white"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Visit Us</h3>
            <address className="not-italic text-gray-400">
              <div className="flex items-start space-x-2 mb-2">
                <MapPin className="h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  Agulu hall Opp. New Layout
                  <br />
                  Former Chicken Market,
                  <br />
                  Abakaliki, Ebonyi State
                  <br />
                  Nigeria
                </span>
              </div>
              <div className="flex items-center space-x-2 mb-2">
                <Phone className="h-5 w-5" />
                <span>+234 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@gloriouspa.org</span>
              </div>
            </address>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Sunday Service: 8:00 AM - 11AM</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Glorious Priesthood Assembly. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;