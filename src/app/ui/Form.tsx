"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import {
  FaChurch,
  FaCity,
  FaEnvelope,
  FaGlobeAfrica,
  FaMapMarkerAlt,
  FaTransgender,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import DecisionMade from "./RadioGroup";
import PhoneInputWithCountryCode from "./PhoneInputWithCountryCode";
import WhatsappInputWithCountryCode from "./WhatsappWithCountryCode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/data/countries";
import nigerianStatesLGA from "@/data/nigerianStatesLGA";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Form = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: "",
    lga: "",
    age: "",
    sex: "",
    CountryOfOrigin: "",
    stateOfOrigin: "",
    city: "",
    formerChurch: "",
    invitedBy: "",
    decisionMade: "",
  });

  const handlePhoneChange = (phone: string, isValid: boolean) => {
    setFormData((prev) => ({ ...prev, phone }));
    setIsPhoneValid(isValid);
  };
  // submit function
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWhatsappNumberChange = (whatsapp: string, isValid: boolean) => {
    setFormData((prev) => ({ ...prev, whatsapp }));
    setIsPhoneValid(isValid);
  };

  const isNigeria = formData.CountryOfOrigin === "Nigeria";

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

  const handleDecisionChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      decisionMade: value,
    }));
  };

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      stateOfOrigin: value,
      lga: "", // Reset LGA when state changes
    }));
  };

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.email &&
    formData.address &&
    formData.decisionMade &&
    formData.sex &&
    (isNigeria ? formData.stateOfOrigin && formData.lga : formData.city);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isPhoneValid) {
      setError("Invalid phone number");
      return;
    }
    try {
      setIsSubmitting(true);
      setError("");
      const res = await fetch(`http://localhost:3000/api/decision`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData: { error: string } = await res.json();
        throw new Error(
          errorData ? errorData.error : "Ooops Something went wrong"
        );
      }
      const data: { message: string } = await res.json();
      setFormData((prev) => ({
        ...prev,
        fullName: "",
        phone: "",
        whatsapp: "",
        email: "",
        address: "",
        lga: "",
        age: "",
        sex: "",
        CountryOfOrigin: "",
        stateOfOrigin: "",
        city: "",
        formerChurch: "",
        invitedBy: "",
        decisionMade: "",
      }));
      alert(data.message);
      setIsSubmitting(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknow Error occured");
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="space-y-6">
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
        <PhoneInputWithCountryCode onPhoneChange={handlePhoneChange} />
        {/* WhatsApp */}
        <WhatsappInputWithCountryCode
          onPhoneChange={handleWhatsappNumberChange}
        />
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
          <Label htmlFor="CountryOfOrigin" className="flex items-center gap-2">
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
              <Select name="stateOfOrigin" onValueChange={handleStateChange}>
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
          <Label htmlFor="formerChurch" className="flex items-center gap-2">
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
          <Textarea
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
        <DecisionMade
          value={formData.decisionMade}
          onChange={handleDecisionChange}
        />
      </div>
      {error && (
        <Alert className="border-red-500 bg-red-100 text-red-600 ">
          <AlertTitle>Oops!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
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
  );
};

export default Form;
