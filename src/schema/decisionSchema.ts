import mongoose from "mongoose";

const desicionSchema = new mongoose.Schema({
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
  CountryOfOrigin: {
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
});

export const decision =
  mongoose.models.decision || mongoose.model("decision", desicionSchema);
