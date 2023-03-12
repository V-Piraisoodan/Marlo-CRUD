const express = require("express");
const router = express.Router();

const userModule = require("../Module/user")

router.post("/create",userModule.createUser);
router.get("/get",userModule.getUser);
router.put("/update/:userId",userModule.updateUser);
router.delete("/delete/:userId",userModule.deleteUser);

module.exports = router;