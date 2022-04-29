import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      default: "Trung Shin",
    },
    description: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatar: {
      type: String,
    },
    img: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
    likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", PostSchema);
