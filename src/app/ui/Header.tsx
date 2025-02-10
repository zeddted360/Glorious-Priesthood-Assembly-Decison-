"use client";
import Link from "next/link";
import { Menu, Phone, Mail, Clock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Image from "next/image";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Dashbord", href: "/dashboard" },
    { label: "About", href: "/learnmore" },
    { label: "Members", href: "/members" },
    { label: "Contact", href: "/contact" },
    { label: "Decision Card", href: "/decision" },
  ];

  return (
    <header className="border-b bg-white pb-4">
      <div className="container mx-auto px-4">
        {/* Top bar with contact info */}
        <div className="hidden border-b py-2 text-sm md:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              +234 703 258 7014
            </span>
            <span className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              www.gpaglobal@gmail.com
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
                quality={100}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width:1200px) 50vw, 33vw"
              />
            </div>
            <Link href="/" className="flex items-center space-x-2">
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
                className={`text-md font-medium transition-colors hover:text-primary ${
                  item.href === pathname ? "text-green-600" : ""
                }`}
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
              <SheetTitle>Navigation</SheetTitle>
              <br />
              <nav className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`text-md font-medium transition-colors hover:text-primary ${
                      item.href === pathname ? "text-green-600" : ""
                    }`}
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
