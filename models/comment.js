import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    postUserId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
  },
  { timestamps: true }
);

export default mongoose.model("Comment", CommentSchema);
