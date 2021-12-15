const Sequelize = require("sequelize");
const sequelize=require("../connection");

let user_data=sequelize.define("UsersTable2",{
    id:{
        primaryKey:true,
        type:Sequelize.INTEGER
    },
    name:Sequelize.STRING,
    phoneno:Sequelize.STRING(10),
    loc:Sequelize.STRING(500),
    birthday:Sequelize.DATE,
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    cart:Sequelize.ARRAY(Sequelize.STRING),
    category:Sequelize.ARRAY(Sequelize.STRING)
},{
    timestamps:false,
    freezeTableName:true
});

/*
user_data.sync().then((data)=>{
    console.log("Table created");
}).catch((err)=>{
    console.log(err);
});

*/
module.exports=user_data;