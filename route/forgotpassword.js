const express=require("express");

const{
    sendOtp,
    verifyOtp
    //addProd
}=require("../controller/forgotpassword");

const router=express.Router();

router.post("/sendmail",sendOtp);
router.post("/verify",verifyOtp);

module.exports=router;

