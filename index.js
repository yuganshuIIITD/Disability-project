const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const path = require('path');
const { render } = require("ejs");
// app.use(express.static('public'));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'css')));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.render("home");
});
app.post("/",function(req,res){
    var newurl=req.body.url;

    res.render("Score",{
        url:newurl,
        html_code_sniffer:1,
        Axel_code:2,
        Score3:3
    })
});
app.get("/contact",function(req,res){
    res.render("contact");
  });
app.get("/feedback",function(req,res){
    res.render("feedback");
  });
app.listen(3000,function(){
    console.log("server started");
});
