import mongoose from "mongoose";

export const connectDb = async () => {
  const uri =   process.env.MONGO_URL ;
  if (!uri) throw new Error("MONGO_URI is not defined");
  const ready_state: number = mongoose.connection.readyState;
  if (ready_state === 1) return console.log("DB already Connected");
  try {
    await mongoose.connect(uri);
    console.log("DB connected");
  } catch (error) {
    console.error(
      "DB connection failed: ",
      error instanceof Error && error.message
    );
    throw error;
  }
};
