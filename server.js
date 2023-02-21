
//express, mysql,nodemon,cors,body-parser - installed packages
var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({extended:false}))
// cors
var cors = require("cors")

//json parser
var jsonParsor = bodyParser.json;

// url encoded
var urlEncodedParsor = bodyParser.urlencoded({extended:false})

app.use(cors())

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"iqtech"
})
con.connect((err)=>{
    if(err) throw err;
    console.log("connected to database")
})

// get all list
app.get("/users",function(req,res){
    con.query("select * from users",(err,result,fields)=>{
        if(err) throw err;
        res.send(result)
    })

})
// get single user
app.get("/user/:id",function(req,res){
    let id = req.params.id;
    con.query("select * from users where user_id="+id,(err,result,fields)=>{
        if(err) throw err;
        res.send(result)
    })
})
// add
app.post("/users",urlEncodedParsor,function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;

    let qr = `insert into users(name,email,mobile)values('${name}','${email}','${mobile}')`;
    con.query(qr,(err,result,fields)=>{
        if(err) {
            res.send({error:"Operation failed"})
        }else{
            res.send({success:"Operation success"})
        }
       
    })
})

// update
app.patch("/user",urlEncodedParsor,function(req,res){
    let name = req.body.name;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let id = req.body.id;

    let qr = `update users set name = '${name}',email = '${email}',mobile = '${mobile}' where user_id=${id}`;
    con.query(qr,(err,result,fields)=>{
        if(err) {
            res.send({error:"Updation failed"})
        }else{
            res.send({success:"Updation success"})
        }
       
    })

})
// delete
app.delete("/user/:id",function(req,res){
    let id = req.params.id;
    let qr = ` delete from users where user_id=${id}`;
    con.query(qr,(err,result,fields)=>{
        if(err) {
            res.send({error:"Deletion failed"})
        }else{
            res.send({success:"Record deleted"})
        }
       
    })
   
})

app.get("/",function(req,res){
    res.send("<h1>welcome</h1>")
})

app.listen(9000,function(){
    console.log("server started")
});