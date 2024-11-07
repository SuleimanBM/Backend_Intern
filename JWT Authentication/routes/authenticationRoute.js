const router = require("express").Router();


const authenticateController = require("../controllers/authenticationController");

router.post("/signup", authenticateController.signup);
router.post("/login", authenticateController.login);
router.get("/verify_email", authenticateController.verifyMail);
router.post("/forgot_password", authenticateController.forgotPassword); 
router.get("/reset_password", authenticateController.sendResetPage);
router.post("/reset_password", authenticateController.changePassword);

module.exports = router