import ChurchMembersList from "./ChurchMembersList";

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

export default async function MembersPage() {
  try {
    const response = await fetch(
      "https://glorious-priesthood-assembly-decison.vercel.app/api/members",
      {
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const members: IMembers[] = await response.json();

    return <ChurchMembersList members={JSON.stringify(members)} />;
  } catch (error) {
    console.error("Failed to fetch members:", error);
    // You might want to add error UI here
    return <div>Failed to load members. Please try again later.</div>;
  }
}
