"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPhone } from "react-icons/fa";
import { countryCodes } from "@/data/countryCode";


const PhoneInputWithCountryCode = ({
  onPhoneChange,
}: {
  onPhoneChange: (phone: string, isValid: boolean) => void;
}) => {
  const [countryCode, setCountryCode] = useState("+234"); // Default to Nigeria
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(true);

    const validatePhoneNumber = (number: string, code: string) => {
      const country = countryCodes.find((c) => c.code === code);
      if (country) {
        const isValid = country.regex.test(number);
        setIsValid(isValid);
        onPhoneChange(`${code}${number}`, isValid);
      } else {
        setIsValid(false);
        onPhoneChange(`${code}${number}`, false);
      }
    };


  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
    validatePhoneNumber(phoneNumber, value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    validatePhoneNumber(value, countryCode);
  };


  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="flex items-center gap-2">
        <FaPhone />
        Phone *
      </Label>
      <div className="flex gap-2">
        {/* Country Code Selector */}
        <Select onValueChange={handleCountryCodeChange} defaultValue="+234">
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Country Code" />
          </SelectTrigger>

          <SelectContent>
            {countryCodes.map((item,index) => (
              <SelectItem key={item.country} value={item.code}>
                {item.country}({item.code})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Phone Number Input */}
        <Input
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          required
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="w-2/3"
        />
      </div>

      {/* Validation Error Message */}
      {!isValid && phoneNumber.length > 0 && (
        <p className="text-red-500 text-sm">Invalid phone number</p>
      )}
    </div>
  );
};

export default PhoneInputWithCountryCode;
