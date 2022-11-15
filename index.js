const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const calFunctions = require("./main.js");
const path = require('path');
const { render } = require("ejs");
// app.use(express.static('public'));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,'css')));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req,res){
    res.render("home");
});
var messageList = [];
app.post("/",function(req,res){
    var newurl=req.body.url;
    var newPromise = new Promise((resolve, reject) => {
        resolve((messageList = calFunctions.evaluateWebsite(newurl)));
      });
      var score
      var per
      newPromise.then((message) => {
        // console.log("messageList", message);
        // console.log("messageList Length", message.length);
        score = calFunctions.evaluateScore(message);
        console.log(score);
        per=calFunctions.toPercent(score, 61);
        console.log(per);
        // const {execSync} = require('child_process');
        // execSync('sleep 10');
        res.render("Score",{
            url:newurl,
            html_code_sniffer:score,
            html_code_sniffer_per:per,
            Axel_code:2,
            Score3:3
        })
        console.log(score);
        console.log("executed");

      });

      
});
app.get("/contact",function(req,res){
    res.render("contact");
  });
app.get("/feedback",function(req,res){
    res.render("feedback");
  });
app.get("/Analytics",function(req,res){
  res.render("analytics");
});
app.listen(3000,function(){
    console.log("server started");
});
