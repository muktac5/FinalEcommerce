const cart_data=require('../model/cart');

exports.getallitems = async(req,res)=>{
    cart_data.cart_data.findAll({raw:true}).then(data=>{
        console.log(data);
        res.send(data);
    }).catch(err=>{
        console.error(err);
        res.send(err);
    })
};

exports.addItems = async(req,res)=>{
    let cartObj = await cart_data.cart_data.build({
        id:req.body.id,
        uid:req.body.uid,
        pid:req.body.pid,
        quantity:req.body.quantity
    });
    cartObj.save().then(data=>{
        res.send("Inserted");
    }).catch(err=>{
        console.log(err);
    })
};

exports.updateItems= async(req,res)=>{
    console.log("update users");
    var id=req.body.id;
    var uid= req.body.uid;
    var pid=req.body.pid;
    var quantity=req.body.quantity;
    cart_data.cart_data.update(
        {id:id,uid:uid,pid:pid,quantity:quantity},
        {where:{id:id} && {uid:uid}}
    ).then(data =>{
        res.send("Data Updated");
    }).catch(err=>{
        res.send({err:"Data not inserted"});
    })
};

exports.deleteItem=async(req,res)=>{
    var id=req.params.id;
    const data=cart_data.cart_data.destroy({where:{id:id}});
    if(!data){
        res.json({err:"data not found"});
    }
    res.send("deleted");
};

