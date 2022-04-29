import {
  getUser,
  deleteUser,
  updateUser,
  followUser,
  unFollowUser,
} from "../controllers/user";
import { verifyToken, UserAuthorization } from "../controllers/middleware";
import { Router } from "express";

export function userRouter() {
  const router = Router();

  //UPDATE USER
  router.put("/:id", UserAuthorization, updateUser);

  //DELETE USER
  router.delete("/:id", UserAuthorization, deleteUser);

  //GET A USER
  router.get("/:id", verifyToken, getUser);

  //FOLLOW A USER
  router.put("/:id/follow", verifyToken, followUser);

  //UNFOLLOW A USER
  router.put("/:id/unfollow", verifyToken, unFollowUser);

  return router;
}

//module.exports = router;
