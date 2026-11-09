const express=require("express");
const router=express.Router();
const userSecurity=require("../security/user.security");


router.post("/register", userSecurity.registerUser);
router.post("/login", userSecurity.loginUser);
module.exports=router;