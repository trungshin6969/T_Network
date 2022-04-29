import { Router } from "express";
import {
  register,
  login,
  requestRefreshToken,
  logOut,
  activateEmail,
  forgotPassword,
} from "../controllers/auth";
import { verifyToken } from "../controllers/middleware";

export function authRouter() {
  const router = Router();

  //REGISTER
  router.post("/register", register);

  router.post("/activation", activateEmail);

  router.post("/forgot", forgotPassword);

  router.post("/reset", verifyToken, forgotPassword);

  //LOGIN
  router.post("/login", login);

  //REFRESH TOKEN
  router.post("/refresh", requestRefreshToken);

  //LOG OUT
  router.post("/logout", verifyToken, logOut);

  return router;
}
