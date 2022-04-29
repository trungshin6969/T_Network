import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import uniqueValidator from "mongoose-unique-validator";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      minlength: [3, "Must be at least 3 characters"],
      maxlength: [20, "Must be less than 20 characters"],
      unique: true,
    },
    email: {
      type: String,
      require: true,
      maxlength: [50, "Must be 50 characters or less"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      require: true,
      select: false,
      minlength: [6, "Must be 6 characters or more"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    coverPhoto: {
      type: String,
      default:
        "https://res.cloudinary.com/dgh9mausg/image/upload/v1649748516/default-cover-user_msalhb.png",
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    about: {
      type: String,
      default: "",
      maxlength: 200,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);
