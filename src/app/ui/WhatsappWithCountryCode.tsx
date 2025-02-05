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
import { FaWhatsapp } from "react-icons/fa";
import { countryCodes } from "@/data/countryCode";

const WhatsappInputWithCountryCode = ({
  onPhoneChange,
}: {
  onPhoneChange: (phone: string, isValid: boolean) => void;
}) => {
  const [countryCode, setCountryCode] = useState("+234"); // Default to Nigeria
  const [whatsapp, setWhatsapp] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);
    validatePhoneNumber(whatsapp, value);
  };

  const handleWhatsappNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWhatsapp(value);
    validatePhoneNumber(value, countryCode);
  };

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

  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="flex items-center gap-2">
        <FaWhatsapp />
        Whatsapp *
      </Label>
      <div className="flex gap-2">
        {/* Country Code Selector */}
        <Select onValueChange={handleCountryCodeChange} defaultValue="+234">
          <SelectTrigger className="w-1/3">
            <SelectValue placeholder="Country Code" />
          </SelectTrigger>

          <SelectContent>
            {countryCodes.map((item, index) => (
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
          value={whatsapp}
          onChange={handleWhatsappNumberChange}
          className="w-2/3"
        />
      </div>

      {/* Validation Error Message */}
      {!isValid && whatsapp.length > 0 && (
        <p className="text-red-500 text-sm">Invalid phone number</p>
      )}
    </div>
  );
};

export default WhatsappInputWithCountryCode;
