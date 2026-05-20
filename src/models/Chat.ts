import mongoose, { Schema, models } from "mongoose";

const ChatSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Chat =
  models.Chat || mongoose.model("Chat", ChatSchema);