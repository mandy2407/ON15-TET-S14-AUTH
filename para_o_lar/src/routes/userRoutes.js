const express = require("express");
const router = express.Router();

const controller = require("../controllers/userController");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth.js")

router.get("/all", auth, controller.getAll);
router.post("/create", controller.createUser);
router.post('/login', authController.login);
router.patch("/update/:id", auth, controller.updateUser);
module.exports = router;