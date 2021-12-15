const Sequelize = require("sequelize");
const sequelize=require("../connection");
let Otp = sequelize.define("otp", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        otp: {
            type: Sequelize.STRING,
            allowNull: false
        },
        expiresIn: {
            type: Sequelize.DATE,
            allowNull: false
        },
    });
/*
    Otp.sync({force:true}).then((data)=>{
        console.log("Table created");
    }).catch((err)=>{
        console.log(err);
    });
    */
  
    module.exports=Otp;