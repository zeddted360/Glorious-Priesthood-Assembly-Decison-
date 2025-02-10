import { memberModel } from "@/schema/decisionSchema";
import { connectDb } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const members = await memberModel.find({});
    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Error fetching members" },
      { status: 500 }
    );
  }
}
