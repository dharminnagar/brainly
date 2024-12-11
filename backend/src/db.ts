// User Models and Schemas
import mongoose, { model, Schema } from "mongoose";
import { string } from "zod";

async function connect() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("mongoDB URL is not defined");
    }
    await mongoose.connect(mongoUrl);
    console.log("MongoDB Connection Successful");
  } catch (e) {
    console.log("MongoDB Connection Error: ", e);
  }
}

connect();

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const userModel = model("User", UserSchema);

const contentTypes = ["image", "video", "document", "links", "tweet"];
const contentSchema = new Schema({
  link: String,
  type: { type: String, enum: contentTypes },
  title: String,
  tags: { type: mongoose.Types.ObjectId, ref: "Tag" },
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const contentModel = model("Content", contentSchema);

const tagSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
});

export const tagModel = model("Tag", tagSchema);

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});

export const linkModel = model("Links", linkSchema);
