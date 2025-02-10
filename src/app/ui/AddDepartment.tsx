import React from "react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-dialog";
import { IMember, MemberContext } from "../store/MemberContext";

export const AddDepartment = ({
  visitDialogOpen,
  setVisitDialogOpen,
  member,
}: {
  visitDialogOpen: boolean;
  setVisitDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member: string;
}) => {
  const [selectedService, setSelectedService] = React.useState("");
  const { dispatch } = React.useContext(MemberContext);

  const handleVisitSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/department", {
        method: "PATCH",
        body: JSON.stringify({
          member,
          selectedService,
        }),
      });
      if (response.ok) {
        const data: { message: IMember } = await response.json();
        dispatch({ type: "UPDATE_MEMBER", payload: data.message });
        setVisitDialogOpen(false);
      } else {
        const data: { error: string } = await response.json();
        alert(data.error);
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
          <DialogTitle>Department</DialogTitle>
        </DialogHeader>
        <Description>{""}</Description>
        <form onSubmit={handleVisitSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="department">Choose a Department</label>
              <Select
                value={selectedService}
                onValueChange={setSelectedService}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="--choose--" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="choir">choir</SelectItem>
                  <SelectItem value="ushering">Ushering</SelectItem>
                  <SelectItem value="protocol">Protocol</SelectItem>
                  <SelectItem value="children">Children</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
