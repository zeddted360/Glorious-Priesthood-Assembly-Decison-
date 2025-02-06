import React, { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {Clock, MapPin, Users, } from "lucide-react";
import { Button } from '@/components/ui/button';


export const VisitorDialog = ({
  visitDialogOpen,
  setVisitDialogOpen,
}: {
  visitDialogOpen: boolean;
  setVisitDialogOpen:React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectedService, setSelectedService] = React.useState("");
  const [visitorInfo, setVisitorInfo] = React.useState({
    name: "",
    email: "",
    phone: "",
    firstTime: "yes",
  });

  const handleVisitSubmit = async (e: any) => {
    console.log(visitorInfo,selectedService);
    e.preventDefault();
    try {
      const response = await fetch("/api/visitors", {
        method: "POST",
        body: JSON.stringify({
          ...visitorInfo,
          service: selectedService,
        }),
      });
      if (response.ok) {
        alert("Thank you! We look forward to welcoming you this Sunday.");
        setVisitDialogOpen(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={visitDialogOpen} onOpenChange={setVisitDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Plan Your Visit</DialogTitle>
          <DialogDescription>
            We're excited to welcome you to Glorious Priesthood Assembly! Let us
            know you're coming and we'll have someone ready to greet you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleVisitSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                value={visitorInfo.name}
                onChange={(e) =>
                  setVisitorInfo({ ...visitorInfo, name: e.target.value })
                }
                placeholder="Your name"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                type="email"
                value={visitorInfo.email}
                onChange={(e) =>
                  setVisitorInfo({ ...visitorInfo, email: e.target.value })
                }
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="phone">Phone</label>
              <Input
                id="phone"
                type="tel"
                value={visitorInfo.phone}
                onChange={(e) =>
                  setVisitorInfo({ ...visitorInfo, phone: e.target.value })
                }
                placeholder="Your phone number"
                required
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="service">
                Which service would you like to attend?
              </label>
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday-6:30am">
                    Sunday First Service (6:30 AM)
                  </SelectItem>
                  <SelectItem value="sunday-8:00am">
                    Sunday Second Service (8:00 AM)
                  </SelectItem>
                  <SelectItem value="tuesday-5:00pm">
                    Tuesday Word Encounter (5:00 PM)
                  </SelectItem>
                  <SelectItem value="thursday-6:00pm">
                    Thursday Home Cell Fellowship (6:00 PM)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label htmlFor="firstTime">
                Is this your first time visiting?
              </label>
              <Select
                value={visitorInfo.firstTime}
                onValueChange={(value) =>
                  setVisitorInfo({ ...visitorInfo, firstTime: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
        <div className="mt-4 pt-4 border-t">
          <h4 className="font-semibold mb-2">What to Expect:</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Please arrive 15 minutes before service time</span>
            </li>
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Our ushers will help you find a comfortable seat</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Parking available around the church premises</span>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};