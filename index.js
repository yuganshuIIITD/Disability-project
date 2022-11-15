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
var score=0;
var per=0;
var axel_score=0;
var axel_per=0;
var third_score=0;
var third_per=0;
var messageList = [];
app.post("/",function(req,res){
    var newurl=req.body.url;
    var newPromise = new Promise((resolve, reject) => {
        resolve((messageList = calFunctions.evaluateWebsite(newurl)));
      });
      
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
  res.render("analytics",{
    html_code_score:per,
    html_code_guide_lines:score,
    axel_core_score:axel_per,
    axel_core_guide_lines:axel_score,
    third_score:third_per,
    third_guide_lines:third_score
  });
});
app.listen(3000,function(){
    console.log("server started");
});
