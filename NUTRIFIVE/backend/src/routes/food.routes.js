import {Router} from "express"
import { isLoggedIn, verifyJWT } from "../middlewares/auth.middleware.js"
import {registerFoodJson, searchFood,trackFood,trackMyFood,deleteTrackedFood,trackByDate} from "../controllers/food.controller.js"
const router=Router()





// router.route("/insertJson").post(registerFoodJson)
// router.route("/search/:name").get(searchFood)
// router.route("/tracking").post(trackFood)
// router.route("/tracking/:date").get(trackByDate)
// router.route("/tracking/me").post(trackMyFood)
// router.route("/tracking/me/deleteItem").post(deleteTrackedFood)
router.route("/insertJson").post(registerFoodJson)
router.route("/search/:name").get(isLoggedIn,searchFood)
router.route("/tracking").post(verifyJWT,trackFood)
router.route("/tracking/:date").get(verifyJWT,trackByDate)
router.route("/tracking/me").post(verifyJWT,trackMyFood)
router.route("/tracking/me/deleteItem").post(verifyJWT,deleteTrackedFood)
export default router