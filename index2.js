const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const calFunctions = require("./main.js");
const alfa_fun = require("./alfa.js");
// const axe = require("./axe_core.js");
const path = require('path');
const { render } = require("ejs");
const { Console } = require("console");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'css')));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",function(req, res){
    res.render("home");
});
// var score=0;
// var per=0;
var axel_score=0;
var axel_per=0;
var third_score=0;
var third_per=0;
var axescore=0;
var messageList = [];
let guidelineTypeList = ['A','AA','AAA','InGuideline']
// const voilations = new Set();
var voilations=new Set();
var guidelineTypeToName = {
  0: "A",
  1: "AA",
  2: "AAA",
  3: "Indian Guidelines"
}

app.post("/", async function (req, res) {
    res.setHeader(
      "Cache-Control",
      "max-age=0, no-cache, no-store, must-revalidate"
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  
    const newurl = req.body.url;
    const gt = req.body.guidelineType;
    const guidelineType = Object.keys(guidelineTypeToName).find(
      (key) => guidelineTypeToName[key] === req.body.guidelineType
    );
  
    messageList = [];
    let alfa_score = 0;
    let alfa_per = 0;
  
    let messageListAlfa = [];
    let score = 0;
    let per = 0;
    let sslResult;
    const sslChecker = require("ssl-checker");
const url = require("url");

  
    try {
      sslResult = await sslChecker(url.parse(newurl).hostname);
    } catch (error) {
      console.error("Error in ssl check: ", error);
    }
  
    try {
      messageListAlfa = await alfa_fun.evaluateUrlAlfa(
        newurl,
        guidelineTypeList[guidelineType]
      );
    } catch (error) {
      console.error("Error in alfa evaluation: ", error);
    }
  
    console.log("Failed Guideline", messageListAlfa);
    console.log("Failed count", messageListAlfa.length);
  
    alfa_score = alfa_fun.evaluateScore(
      messageListAlfa.length,
      guidelineTypeList[guidelineType]
    );
    console.log("this is alfa score", alfa_score);
  
    alfa_per = alfa_fun.toPercent(
      alfa_score,
      guidelineTypeList[guidelineType]
    );
    console.log("this is alfa percentage", alfa_per);
  
    res.render("Score", {
      url: newurl,
      html_code_sniffer: score,
      html_code_sniffer_per: per,
      Axel_code: axel_per,
      Score3: alfa_score,
      alfa_p: alfa_per,
      gt: gt,
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
  var per=0;
  var score=0;
  var axel_per=0;
  var axel_score=0;
  var third_per=0;
  var third_score=0;
  res.render("analytics",{
    html_code_score:per,
    html_code_guide_lines:score,
    axel_core_score:axel_per,
    axel_core_guide_lines:axel_score,
    third_score:third_per,
    third_guide_lines:third_score
  });
});
app.get("/guidelines", function(req, res){
  // console.log("-->");
  console.log(
    Array.from(voilations.values()) // prints unique Array [1, 2, 3]
  )
  // console.log(voilations);
  res.render("guidelines",{
    list:Array.from(voilations.values())
  });
});
app.get("/submit", function(req, res){
  res.render("home");
});
app.listen(process.env.PORT || 3000, function(){
    console.log("server started");
});
//end 























// const express=require("express");
// const bodyParser=require("body-parser");
// const app=express();
// const calFunctions = require("./main.js");
// // const axe = require("./axe_core.js");
// const path = require('path');
// const { render } = require("ejs");
// const { Console } = require("console");
// // const Jasmine = require('jasmine');
// // const jasmine = new Jasmine().jasmine;
// // jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
// // app.use(express.static('public'));
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, 'css')));
// app.use(bodyParser.urlencoded({extended: true}));
// app.get("/",function(req, res){
//     res.render("home");
// });
// // var score=0;
// // var per=0;
// var axel_score=0;
// var axel_per=0;
// var third_score=0;
// var third_per=0;
// var axescore=0;
// var messageList = [];
// // const voilations = new Set();
// // var voilations=new Set();
// var guidelineTypeToName = {
//   0: "A",
//   1: "AA",
//   2: "AAA",
//   3: "Indian Guidelines"
// }
// app.post("/",function(req, res){
//     var newurl=req.body.url;
//     var guidelineType = Object.keys(guidelineTypeToName).find(key => guidelineTypeToName[key] === req.body.guidelineType);
//     // console.log(" here ");
//     var newPromise = new Promise((resolve, reject) => {

//         resolve((messageList = calFunctions.evaluateWebsite(newurl, guidelineType)));
//       });
      
//       newPromise.then((message) => {
//         var voilations=new Set(); // changed
//         console.log("messageList", message);
//         var score=calFunctions.evaluateScore(message, guidelineType); //changed
//         voilations=calFunctions.listofviolations(message, guidelineType);
//         var per=calFunctions.toPercent(score, guidelineType);  //changed
//         console.log(voilations);
//         console.log(score);
//         console.log(per);
       

//         // console.log(per);
//         // axel_per=axe.test_axe(newurl);
//         console.log(axel_per);
//         // const {execSync} = require('child_process');
//         // execSync('sleep 10');
//         res.render("Score", {
//             url:newurl,
//             html_code_sniffer:score,
//             html_code_sniffer_per:per,
//             Axel_code:axel_per,
//             Score3:24
//         })
//         console.log(score);
//         console.log("executed");

//       }).catch((message) => {
//         console.error(message);
//     });

      
// });
// app.get("/contact", function(req, res){
//     res.render("contact");
//   });
// app.get("/feedback", function(req, res){
//     res.render("feedback");
//   });
// app.get("/resources", function(req, res){
//   res.render("resources");
// });
// app.get("/Analytics", function(req, res){
//   res.render("analytics",{
//     html_code_score:per,
//     html_code_guide_lines:score,
//     axel_core_score:axel_per,
//     axel_core_guide_lines:axel_score,
//     third_score:third_per,
//     third_guide_lines:third_score
//   });
// });
// app.get("/guidelines", function(req, res){
//   // console.log("-->");
//   console.log(
//     Array.from(voilations.values()) // prints unique Array [1, 2, 3]
//   )
//   // console.log(voilations);
//   res.render("guidelines",{
//     list:Array.from(voilations.values())
//   });
// });
// app.get("/submit", function(req, res){
//   res.render("home");
// });
// app.listen(process.env.PORT || 5000, function(){
//     console.log("server started");
// });
// //end 
