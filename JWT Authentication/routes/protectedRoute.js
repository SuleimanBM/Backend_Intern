const router = require("express").Router();

const protectedController = require("../controllers/protectedController")
const authController = require("../controllers/authenticationController")

router.get("/protectedResource", authController.protect, protectedController.viewResource);


module.exports = router;