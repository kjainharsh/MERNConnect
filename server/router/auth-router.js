const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller"); // Fixed the path
const validate = require("../middlewares/validate-middleware");
const signUpSchema = require("../validators/auth-validators");

// router.get("/", (req, res) => {
//     res.status(200).send("Welcome");
// });
router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signUpSchema), authcontrollers.register);
router.route("/login").post(authcontrollers.login);

module.exports = router;
