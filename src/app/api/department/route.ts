import { memberModel } from "@/schema/decisionSchema";
import { connectDb } from "@/utils/connectDb";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest) => {
  const { member, selectedService } = await req.json();

  try {
    await connectDb();
    const result = await memberModel.findOneAndUpdate(
      { fullName: member },
      {
        $set: { department: selectedService },
      },
      { new: true }
    );
    return NextResponse.json({ message: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
