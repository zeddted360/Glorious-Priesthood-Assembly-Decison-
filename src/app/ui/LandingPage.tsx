"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, BookOpen, Heart } from "lucide-react";
import { VisitorDialog } from "./Visitus";
import GetDirection from "./GetDirection";

const LandingPage = () => {
  const [visitDialogOpen, setVisitDialogOpen] = React.useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="header relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gray-900/60" />
        <div className="relative container mx-auto px-4 text-center text-gray-50 bg-gray-100/20 rounded-md py-4 ">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Welcome to Glorious Priesthood Assembly
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Join us in worship as we experience God's presence and transform
            lives through His word
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Join Us This Sunday
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-900 border-white hover:bg-white/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Service Times Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Times</h2>
            <p className="text-gray-600">Join us for worship and fellowship</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">Sunday Service</h3>
                    <p className="text-gray-600">
                      <strong>First service</strong> : 6:30AM
                    </p>
                    <p className="text-gray-600">
                      <strong>Second service</strong> : 8:00AM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      Tusesdays Word Encounter
                    </h3>
                    <p className="text-gray-600">5:00PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-semibold mb-2">
                      Thursdays Home Cell Fellowship
                    </h3>
                    <p className="text-gray-600">6:00 PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/api/placeholder/600/400"
                alt="Church building"
                className="rounded-lg shadow-lg"
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
