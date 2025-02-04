import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface DecisionMadeProps {
  value: string;
  onChange: (value: string) => void;
}

const DecisionMade = ({ value, onChange }: DecisionMadeProps) => {
  return (
    <div className="decision-made">
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Salvation" id="salvation" />
          <Label htmlFor="salvation">Salvation</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Recommitment" id="recommitment" />
          <Label htmlFor="recommitment">Recommitment</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="First Timer" id="first-timer" />
          <Label htmlFor="first-timer">First Timer</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default DecisionMade;
