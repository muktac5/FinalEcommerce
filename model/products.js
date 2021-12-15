const Sequelize = require("sequelize");
const sequelize=require("../connection");

let products_data=sequelize.define("ProductsTable",{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    category:Sequelize.STRING,
    image:Sequelize.STRING,
    title:Sequelize.STRING(50),
    description:Sequelize.STRING(1234),
    price:Sequelize.INTEGER,
    total:Sequelize.INTEGER,
    aquant:Sequelize.INTEGER,
    rating:Sequelize.INTEGER,
    color:Sequelize.STRING
},{
    timestamps:false,
    freezeTableName:true
});
/*
products_data.sync().then((data)=>{
    console.log("Table created");
}).catch((err)=>{
    console.log(err);
});
*/
module.exports=products_data;