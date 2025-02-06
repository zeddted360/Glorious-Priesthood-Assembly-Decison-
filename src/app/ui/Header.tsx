// "use client"
// import React,{useState} from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, Phone, Mail, MapPin, Clock } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";

const Header = () => {
  // const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Members", href: "/members" },
    { label: "Contact", href: "/contact" },
    { label: "Decision Card", href: "/" },
  ];

  return (
    <header className="border-b bg-white pb-4">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden border-b py-2 text-sm md:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              +234 123 456 7890
            </span>
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              info@gloriouspa.org
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              Sunday Service: 8:00 AM - 11AM
            </span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex h-20 items-center justify-between p-4">
          {/* Logo and Church Name */}
          <div className="header-logo-name flex space-x-2 items-center">
            <div className="relative w-20 h-20 rounded-full overflow-hidden z-10">
              <Image
                src="/GPA_LOGO.jpg"
                alt="GPA Logo"
                fill
                className="object-cover"
                // sizes="(max-width: 768px) 100vw, 128px"
                quality={100}
                loading="lazy"
              />
            </div>
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="font-serif text-md md:text-2xl font-bold">
                Glorious Priesthood Assembly
              </div>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-md font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;