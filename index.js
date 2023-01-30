const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const calFunctions = require("./main.js");
// const axe = require("./axe_core.js");
const path = require('path');
const { render } = require("ejs");
// const Jasmine = require('jasmine');
// const jasmine = new Jasmine().jasmine;
// jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
// app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'css')));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
    res.render("home");
});
var score=2;
var per=0;
var axel_score=0;
var axel_per=0;
var third_score=0;
var third_per=0;
var axescore=0;
var messageList = [];
var guidelineTypeToName = {
  0: "A",
  1: "AA",
  2: "AAA",
}
app.post("/",function(req, res){
    var newurl=req.body.url;
    var guidelineType = Object.keys(guidelineTypeToName).find(key => guidelineTypeToName[key] === req.body.guidelineType);

    var newPromise = new Promise((resolve, reject) => {
        resolve((messageList = calFunctions.evaluateWebsite(newurl, guidelineType)));
      });
      
      newPromise.then((message) => {
        console.log("messageList", message);
        // console.log("messageList Length", message.length);
        score = calFunctions.evaluateScore(message, guidelineType);
        console.log(score);
        per=calFunctions.toPercent(score, guidelineType);
        // axescore = calFunctions.axeCore(newurl, guidelineType);
        // per=calFunctions.toPercent(score, 61);
        console.log(per);
        // axel_per=axe.test_axe(newurl);
        console.log(axel_per);
        // const {execSync} = require('child_process');
        // execSync('sleep 10');
        res.render("Score", {
            url:newurl,
            html_code_sniffer:score,
            html_code_sniffer_per:per,
            Axel_code:axel_per,
            Score3:24
        })
        console.log(score);
        console.log("executed");

      });

      
});
app.get("/contact", function(req, res){
    res.render("contact");
  });
app.get("/feedback", function(req, res){
    res.render("feedback");
  });
app.get("/resources", function(req, res){
  res.render("resources");
});
app.get("/Analytics", function(req, res){
  res.render("analytics",{
    html_code_score:per,
    html_code_guide_lines:score,
    axel_core_score:axel_per,
    axel_core_guide_lines:axel_score,
    third_score:third_per,
    third_guide_lines:third_score
  });
});
app.get("/submit", function(req, res){
  res.render("home");
});
app.listen(process.env.PORT || 3000, function(){
    console.log("server started");
});
