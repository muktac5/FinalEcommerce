const express=require("express");

const{
    getallitems,
    addItems,
    updateItems,
    deleteItem
    //addProd
}=require("../controller/cart");

const router=express.Router();

router.get("/getAllItems",getallitems);
router.post("/additems",addItems);
router.put("/updateItems",updateItems);
router.delete("/deleteitem/:id",deleteItem);
//router.post("/insertProd",addProd);
module.exports=router;