const express=require("express");

const{
    getallUsers,
    addUsers,
    deleteUsers,
    updateUsers
}=require("../controller/credentials");

const router=express.Router();

router.get("/getAll",getallUsers);
router.post("/insertUser",addUsers);
router.delete("/deleteUser/:id",deleteUsers),
router.put("/updateUser",updateUsers)

module.exports=router;