const express = require("express");
const router = express.Router();

const userModule = require("../Module/user")

// CRUD routes (eg : http://localhost:9001/user/signup)
router.post("/signup",userModule.signup);
router.post("/signin",userModule.signin)
router.get("/get",userModule.getUser);
router.put("/update/:userId",userModule.updateUser);
router.delete("/delete/:userId",userModule.deleteUser);

module.exports = router;