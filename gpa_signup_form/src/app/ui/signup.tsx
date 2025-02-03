"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import nigerianStatesLGA from "@/data/nigerianStatesLGA";
import { countries } from "@/data/countries";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import {
  FaUser,
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTransgender,
  FaGlobeAfrica,
  FaCity,
  FaChurch,
  FaUserFriends,
  FaCalendarAlt,
} from "react-icons/fa";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    altPhone: "",
    email: "",
    address: "",
    lga: "",
    age: "",
    sex: "",
    CountryOfOrigin: "",
    stateOfOrigin: "",
    city: "", // New field for non-Nigerians
    formerChurch: "",
    invitedBy: "",
    decisionMade: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      stateOfOrigin: value,
      lga: "", // Reset LGA when state changes
    }));
  };

  const nigerianStates = Object.keys(nigerianStatesLGA).sort();

  const getLGAsForState = (state: string) => {
    return nigerianStatesLGA[state] || [];
  };

  // Sort countries to prioritize Nigeria
  const sortedCountries = [...countries].sort((a, b) => {
    if (a === "Nigeria") return -1; // Nigeria comes first
    if (b === "Nigeria") return 1;
    return a.localeCompare(b); // Sort other countries alphabetically
  });

  const isNigeria = formData.CountryOfOrigin === "Nigeria";

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.email &&
    formData.address &&
    (isNigeria ? formData.stateOfOrigin && formData.lga : formData.city);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Card className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        {/* Header Section */}
        <CardHeader className="relative flex flex-col justify-center items-center text-white py-12">
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90" />

          {/* Logo Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden z-10">
            <Image
              src="/GPA_LOGO.jpg"
              alt="GPA Logo"
              width={128}
              height={128}
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

        {/* Form Section */}
        <CardContent className="p-6 text-gray-900 dark:text-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="flex items-center gap-2">
                  <FaUser />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <FaPhone />
                  Telephone *
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* WhatsApp */}
              <div className="space-y-2">
                <Label htmlFor="altPhone" className="flex items-center gap-2">
                  <FaWhatsapp />
                  WhatsApp
                </Label>
                <Input
                  id="altPhone"
                  name="altPhone"
                  placeholder="Enter WhatsApp phone"
                  value={formData.altPhone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <FaEnvelope />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="E.g., martha@gmail.com"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Sex */}
              <div className="space-y-2">
                <Label htmlFor="sex" className="flex items-center gap-2">
                  <FaTransgender />
                  Sex
                </Label>
                <Select
                  name="sex"
                  onValueChange={(value: string) => {
                    setFormData((prev) => ({ ...prev, sex: value }));
                  }}
                >
                  <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                    <SelectValue placeholder="Select Sex" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label
                  htmlFor="CountryOfOrigin"
                  className="flex items-center gap-2"
                >
                  <FaGlobeAfrica />
                  Country *
                </Label>
                <Select
                  name="CountryOfOrigin"
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, CountryOfOrigin: value }))
                  }
                >
                  <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                    <SelectValue placeholder="Select Country" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedCountries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* State and LGA (for Nigerians) */}
              {isNigeria ? (
                <>
                  <div className="space-y-2">
                    <Label
                      htmlFor="stateOfOrigin"
                      className="flex items-center gap-2"
                    >
                      <FaMapMarkerAlt />
                      State of Origin *
                    </Label>
                    <Select
                      name="stateOfOrigin"
                      onValueChange={handleStateChange}
                    >
                      <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigerianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lga" className="flex items-center gap-2">
                      <FaCity />
                      LGA *
                    </Label>
                    <Select
                      name="lga"
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, lga: value }))
                      }
                      disabled={!formData.stateOfOrigin}
                    >
                      <SelectTrigger className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all">
                        <SelectValue placeholder="Select LGA" />
                      </SelectTrigger>
                      <SelectContent>
                        {getLGAsForState(formData.stateOfOrigin).map(
                          (lga: string) => (
                            <SelectItem key={lga} value={lga}>
                              {lga}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  {/* State/Province and City (for non-Nigerians) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="stateOfOrigin"
                      className="flex items-center gap-2"
                    >
                      <FaMapMarkerAlt />
                      State/Province
                    </Label>
                    <Input
                      id="stateOfOrigin"
                      name="stateOfOrigin"
                      placeholder="Enter your state or province"
                      value={formData.stateOfOrigin}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city" className="flex items-center gap-2">
                      <FaCity />
                      City *
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter your city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </>
              )}

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age" className="flex items-center gap-2">
                  <FaUser />
                  Age
                </Label>
                <Input
                  id="age"
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Former Church */}
              <div className="space-y-2">
                <Label
                  htmlFor="formerChurch"
                  className="flex items-center gap-2"
                >
                  <FaChurch />
                  Former Church
                </Label>
                <Input
                  id="formerChurch"
                  name="formerChurch"
                  placeholder="Enter previous church"
                  value={formData.formerChurch}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Invited By */}
              <div className="space-y-2">
                <Label htmlFor="invitedBy" className="flex items-center gap-2">
                  <FaUserFriends />
                  Invited By
                </Label>
                <Input
                  id="invitedBy"
                  name="invitedBy"
                  placeholder="Who invited you?"
                  value={formData.invitedBy}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>

              {/* Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <FaMapMarkerAlt />
                  Address *
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            {/* Decision Made */}
            <div className="space-y-2 md:col-span-2">
              <div className="text-lg font-semibold">Decision made?</div>
              <div className="flex flex-col space-y-2">
                {["Salvation", "Recommitment", "First Timer"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      name="decisionMade"
                      value={option}
                      checked={formData.decisionMade === option}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Label>{option}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit Decision"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipForm;
