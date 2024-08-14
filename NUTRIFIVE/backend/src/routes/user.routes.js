import { Router } from "express";
import { loginUser, logoutUser, registerUser,resetUserPassword,forgotUserPassword} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router=Router()


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/reset-password").post(verifyJWT,resetUserPassword)
router.route("/forgot-password").post(forgotUserPassword)
export default router