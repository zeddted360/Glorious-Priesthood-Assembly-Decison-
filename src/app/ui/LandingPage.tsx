"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  BookOpen,
  Heart,
  ChevronDown,
} from "lucide-react";
import { VisitorDialog } from "./Visitus";
import GetDirection from "./GetDirection";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
const LandingPage = () => {
  const [visitDialogOpen, setVisitDialogOpen] = React.useState(false);
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        id="hero"
        className="header relative h-screen flex items-center justify-center"
        aria-labelledby="hero-title"
      >
        <div className="absolute inset-0 bg-gray-900/70" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative container mx-auto px-4 text-center text-gray-50"
        >
          <h1
            id="hero-title"
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
          >
            Welcome to Glorious Priesthood Assembly
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Join us in worship as we experience God's presence and transform
            lives through His word
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setVisitDialogOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90"
              aria-label="Join Sunday Service"
            >
              Join Us This Sunday
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-800 border-white hover:bg-white/20 transition-colors"
              onClick={() => router.push("/learnmore")}
              aria-label="Learn More About Church"
            >
              Learn More
            </Button>
          </div>
          <motion.button
            onClick={() => scrollToSection("services")}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
            aria-label="Scroll to Services"
          >
            <ChevronDown size={32} />
          </motion.button>
        </motion.div>
      </section>

      {/* Service Times Section */}
      <section
        id="services"
        className="py-16 bg-white"
        aria-labelledby="services-title"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 id="services-title" className="text-3xl font-bold mb-4">
              Service Times
            </h2>
            <p className="text-gray-600">Join us for worship and fellowship</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Calendar,
                title: "Sunday Service",
                times: [
                  { name: "First service", time: "6:30AM" },
                  { name: "Second service", time: "8:00AM" },
                ],
              },
              {
                icon: Clock,
                title: "Tuesdays Word Encounter",
                times: [{ name: "Evening Session", time: "5:00PM" }],
              },
              {
                icon: Users,
                title: "Thursdays Home Cell Fellowship",
                times: [{ name: "Fellowship", time: "6:00 PM" }],
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col justify-center h-full">
                    <div className="flex items-start space-x-4">
                      <service.icon className="h-6 w-6 text-primary" />
                      <div>
                        <h3 className="font-semibold mb-2">{service.title}</h3>
                        {service.times.map((timeSlot, idx) => (
                          <p key={idx} className="text-gray-600">
                            <strong>{timeSlot.name}</strong>: {timeSlot.time}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative w-[25rem] h-[25rem] rounded-md overflow-hidden">
              <Image
                src="/form-bg.jpg"
                alt="Church building"
                className="object-cover"
                fill
                sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw 33vw"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">About Our Church</h2>
              <p className="text-gray-600 mb-6">
                Glorious Priesthood Assembly is a vibrant, Bible-believing
                church committed to spreading the gospel of Jesus Christ. Our
                mission is to transform lives through God's word and raise a
                generation of believers who will impact their world.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <span>Bible-Based Teaching</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Community Focus</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <span>Loving Fellowship</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Strategic Location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Growing Family</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the love, warmth, and transformation that comes from
            being part of a spirit-filled community.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-gray-900 border-white hover:bg-white/10"
            onClick={() => setVisitDialogOpen(true)}
          >
            Visit Us This Sunday
          </Button>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AguLu hall Opp. New Layout Former Chicken Market, Abakaliki Ebonyi
              state Nigeria
            </p>
          </div>
          <GetDirection />
        </div>
      </section>
      <VisitorDialog
        visitDialogOpen={visitDialogOpen}
        setVisitDialogOpen={setVisitDialogOpen}
      />
    </div>
  );
};

export default LandingPage;
