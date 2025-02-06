import { decision } from "@/schema/decisionSchema";
import ChurchMembersList from "./ChurchMembersList";
import { connectDb } from "@/utils/connectDb";

export interface IMembers {
  _id?: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  lga?: string;
  age?: string;
  sex: string;
  CountryOfOrigin: string;
  stateOfOrigin: string;
  city?: string;
  formerChurch?: string;
  invitedBy?: string;
  decisionMade: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

async function getMembers() {
  try {
    await connectDb();
    const members = await decision.find({}).sort({createdAt:-1});
    return members;
  } catch (error) {
    console.error("Error: ", error instanceof Error && error.message);
  }
}

export default async function MembersPage() {
    const members: IMembers[] | undefined = await getMembers();
  return <ChurchMembersList members={JSON.stringify(members)} />;
}
