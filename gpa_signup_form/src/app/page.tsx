import Image from "next/image";
import NewMemberForm from "./ui/signup";

export default function Home() {
  return (
    <div className="container">
      <NewMemberForm/>
    </div>
  );
}
