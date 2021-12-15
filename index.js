const express=require("express");
const sequelize=require("./connection");
var cors=require("cors");

const userRoute=require("./route/users");
const prodRoute=require("./route/products")
const cartRoute=require("./route/cart");
const otpRoute=require("./route/forgotpassword");
const app=express();

app.use(express.json());
app.use(cors());
app.options('*',cors());

const port=8000;

sequelize.authenticate().then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log(err);
})

app.use("/user/",userRoute);
app.use("/reset/",otpRoute);
app.use("/prod/",prodRoute);
app.use("/cart/",cartRoute);

app.listen(port,()=>{
    console.log("listening at port 8000");
})
