const products_data = require("../model/products");

exports.getallProd = async(req,res)=>{
    const data=await products_data.findAll({row:true});
    if(!data){
        res.status(400).json({err:"Data not found"});
    }
    res.status(200).send(data);
};

exports.getProdById=async(req,res)=>{
    const data=await products_data.findByPk(req.params.id,{row:true});
    if(!data){
        res.status(400).json({err:"Data not found"});
    }
    res.status(200).send(data);
};


/*
exports.addProd = async(req,res)=>{
    let prodObj=await products_data.build({
        id:req.body.id,
        category : req.body.category,
    image:req.body.image,
    title:req.body.title,
    description:req.body.description,
    price : req.body.price,
    total:req.body.total,
    aquant:req.body.aquant,
    rating:req.body.rating,
    color:req.body.color
    });
    let emp=await prodObj.save();
    if(!emp){
        res.send({err: "Data not inserted"});
    }
    res.send({emp:emp,msg:"Data inserted"});
};
*/