const express=require("express");

const{
    getallProd,
    getProdById,
    //addProd
}=require("../controller/products");

const router=express.Router();

router.get("/getAllProd",getallProd);
router.get("/getProdById/:id",getProdById);
//router.post("/insertProd",addProd);
module.exports=router;