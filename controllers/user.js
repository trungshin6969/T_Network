import User from "../models/user";
import bcrypt from "bcrypt";
import { generateAccessToken } from "./auth";

export const getUser = async (req, res) => {
  try {
    //find the user ID
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      //find the user ID and delete that user
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account " + user.username + " has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can only delete your account");
  }
};

export const updateUser = async (req, res) => {
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10); //generate salt to hash password
      req.body.password = await bcrypt.hash(req.body.password, salt); //set user password to hashed password
    } catch (err) {
      res.status(500).json(err);
    }
  }

  try {
    //find the user ID and update the details of that user
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    const accessToken = generateAccessToken(user);
    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const followUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //find the user ID
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { following: req.params.id } });
        res.status(200).json(user.username + " has been followed");
      } else {
        res.status(403).json("You already follow " + user.username);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't follow yourself");
  }
};

export const unFollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      //find the user ID
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { following: req.params.id } });
        res.status(200).json(user.username + " has been unfollowed");
      } else {
        res.status(403).json("You don't follow " + user.username);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can't unfollow yourself");
  }
};
