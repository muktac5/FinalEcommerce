const Sequelize = require("sequelize");
const sequelize=require("../connection");

let cart_data=sequelize.define("CartTable",{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    uid:Sequelize.INTEGER,
    pid:Sequelize.INTEGER,
    quantity:Sequelize.INTEGER,
},{
    timestamps:false,
    freezeTableName:true
});

/*
cart_data.sync({force:true}).then((data)=>{
    console.log("Table created");
}).catch((err)=>{
    console.log(err);
});
*/

module.exports={cart_data};