import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    whatsapp: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    lga: {
      type: String,
      required: true,
    },
    age: {
      type: String,
    },
    sex: {
      type: String,
      required: true,
    },
    countryOfOrigin: {
      type: String,
      required: true,
    },
    stateOfOrigin: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    formerChurch: {
      type: String,
    },
    invitedBy: {
      type: String,
    },
    decisionMade: {
      type: String,
      required: true,
    },
    // Added fields to match the UI requirements
    department: {
      type: String,
      enum: ["choir", "ushering", "protocol", "children", "media", "none"],
      default: "none",
    },
  },
  {
    timestamps: true,
  }
);

export const memberModel =
  mongoose.models.Member || mongoose.model("Member", memberSchema);
