import { memberModel } from "@/schema/decisionSchema";
import { connectDb } from "@/utils/connectDb";
import { sendNewMemberEmail } from "@/utils/sendMail";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    // Destructure request body with default values for optional fields
    const {
      fullName,
      phone,
      whatsapp = null,
      email,
      address,
      lga,
      age = null,
      sex,
      countryOfOrigin,
      stateOfOrigin,
      city = null,
      formerChurch = null,
      invitedBy = null,
      decisionMade,
    } = await request.json();

    // Connect to the database
    await connectDb();

    // Check for duplicates
    const existingUser = await memberModel.findOne({
      $or: [{ fullName }, { phone }, { whatsapp }, { email }],
    });

    if (existingUser) {
      // Determine which field is a duplicate
      let duplicateField = "";
      if (existingUser.fullName === fullName) duplicateField = "full Name";
      else if (existingUser.phone === phone) duplicateField = "Phone number";
      else if (existingUser.whatsapp === whatsapp)
        duplicateField = "WhatsApp Number";
      else if (existingUser.email === email) duplicateField = "Email";

      return NextResponse.json(
        { error: `A member with this ${duplicateField} already exists.` },
        { status: 409 } // 409 Conflict
      );
    }

    // Create a new decision entry
    await memberModel.create({
      fullName,
      phone,
      whatsapp,
      email,
      address,
      lga,
      age,
      sex,
      countryOfOrigin,
      stateOfOrigin,
      city,
      formerChurch,
      invitedBy,
      decisionMade,
    });
    await sendNewMemberEmail({
      fullName,
      phone,
      whatsapp,
      email,
      state: stateOfOrigin,
      country: countryOfOrigin,
      invitedBy,
    });
    // Return success response
    return NextResponse.json(
      { message: `Thank you, ${fullName}, for worshipping with us!` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating decision:", error);
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
};
