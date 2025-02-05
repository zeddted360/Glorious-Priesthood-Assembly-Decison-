import React from "react";
import Image from "next/image";
import {
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaCalendarAlt } from "react-icons/fa";

const FormHeader = () => {
  return (
    <CardHeader className="relative flex flex-col justify-center items-center text-white py-12">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90" />
      {/* Logo Image */}
      <div className="relative w-32 h-32 rounded-full overflow-hidden z-10">
        <Image
          src="/GPA_LOGO.jpg"
          alt="GPA Logo"
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 128px"
          priority
        />
      </div>

      {/* Title and Description */}
      <CardTitle className="text-4xl font-bold text-center uppercase mt-4 z-10 animate-fade-in">
        Glorious Priesthood Assembly (GPA)
      </CardTitle>
      <CardDescription className="text-center uppercase text-lg mt-2 z-10 animate-fade-in text-white/90">
        Generation of Kings and Priests
      </CardDescription>

      {/* Decision Card */}
      <div className="text-center uppercase text-2xl font-semibold mt-4 z-10 animate-fade-in">
        Decision Card
      </div>

      {/* Invitation Text */}
      <div className="text-center italic mt-2 z-10 animate-fade-in">
        I invite Jesus Christ into my heart and life today
      </div>

      {/* Date */}
      <div className="flex items-center justify-center gap-2 mt-4 z-10 animate-fade-in">
        <FaCalendarAlt />
        <b>Date</b>: {new Date().toDateString()}
      </div>
    </CardHeader>
  );
};

export default FormHeader;
