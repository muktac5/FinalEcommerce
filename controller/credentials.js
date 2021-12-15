const user_data=require("../model/signup");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
var handlebars = require('handlebars');
var fs = require('fs');

const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const client = new Client();
var readHTMLFile = function(path, callback) {
    fs.readFile(path, {encoding: 'utf-8'}, function (err, html) {
        if (err) {
           callback(err); 
           throw err;
            
        }
        else {
            callback(null, html);
        }
    });
    
};
client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

smtpTransport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'ecommercemtx16@gmail.com',
        pass: 'Mukta2000*'
    }
}));
exports.getallUsers = async(req,res)=>{
    user_data.findAll({raw:true}).then(data=>{
        console.log(data);
        res.send(data);
        /*var cartitem=data.cart;
        var id;
        var quantity;
        var total;
        var arr=[];
        for(let j=0;j<data.length;j++){
            var string2=[];
            console.log(data);
        for(let i=0;i<data[j].cart.length;i++)
        {
            console.log(data[j].cart[i].split['@']);
            id=data[j].cart[i].split['@'][0];
            quantity=data[j].cart[i].split['@'][1];
            total=data[j].cart[i].split['@'][2];
            var string1=[id,quantity,total];
            string2.push(string1);
        }
        var arr1={...data[j],data:string2};
        arr.push(arr1);
        */
    //res.send(arr);
    }).catch(err=>{
        console.error(err);
        res.send(err);
    })
};

exports.addUsers = async(req,res)=>{
    let userObj =await user_data.build({
        id:req.body.id,
        name : req.body.name,
    phoneno:req.body.phoneno,
    loc:req.body.loc,
    birthday:req.body.birthday,
    email : req.body.email,
    password:req.body.password,
    cart:req.body.cart,
    category:req.body.category
    });
    readHTMLFile(__dirname + '/welcomemail.html', function(err, html) {
        var template = handlebars.compile(html);
        var replacements = {
             username: "John Doe"
        };
        var htmlToSend = template(replacements);
        var mailOptions = {
            from: 'ecommercemtx16@gmail.com',
            to : req.body.email,
            subject : 'Thanks for Registering | MTX '+req.body.name,
            html : htmlToSend
         }
        smtpTransport.sendMail(mailOptions, function (error, res) {
            if (error) {
                console.log(error);
                //callback(error);
            }else{
                console.log("Message sent:"+res.message);
                //response.json(res.message);
            }
            smtpTransport.close();
        });
    });

    userObj.save().then(data=>{
        res.send("Inserted");
    }).catch(err=>{
        console.log(err);
    })

    const number = "+91"+req.body.phoneno;
       
    // Your message.
   const text = "Welcome "+req.body.name+"\nYour registered email id : "+req.body.email;
  
    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
   const chatId = number.substring(1) + "@c.us";
  
   // Sending message.
   client.sendMessage(chatId, text);
};

exports.deleteUsers=async(req,res)=>{
    var id=req.params.id;
    const data=user_data.destroy({where:{id:id}});
    if(!data){
        res.json({err:"data not found"});
    }
    res.send("deleted");
};

exports.updateUsers= async(req,res)=>{
    console.log("update users");
    var id=req.body.id;
    var name= req.body.name;
    var phoneno=req.body.phoneno;
    var loc=req.body.loc;
    var birthday=req.body.birthday;
    var email = req.body.email;
    var password=req.body.password;
    var cart=req.body.cart;
    var category=req.body.category;
    user_data.update(
        {id:id,name:name,phoneno:phoneno,loc:loc,birthday:birthday,email:email,password:password,cart:cart,category:category},
        {where:{id:id}}
    ).then(data =>{
        res.send("Data Updated");
    }).catch(err=>{
        res.send({err:"Data not inserted"});
    })
};

