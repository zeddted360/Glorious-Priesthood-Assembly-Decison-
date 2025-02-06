"use client"
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import React from 'react'

const GetDirection = () => {
 const handleGetDirections = () => {
   const address = "AguLu hall, New Layout, Abakaliki, Ebonyi state Nigeria";
   const encodedAddress = encodeURIComponent(address);
   window.open(
     `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`,
     "_blank"
   );
 };


  return (
    <div className="bg-gray-100 p-8 rounded-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <MapPin className="h-6 w-6 text-primary" />
          <div>
            <h3 className="font-semibold">Our Location</h3>
            <p className="text-gray-600">
              Easy to find in the heart of Abakaliki
            </p>
          </div>
        </div>

        <Button onClick={handleGetDirections}>Get Directions</Button>
      </div>
    </div>
  );
}

export default GetDirection
