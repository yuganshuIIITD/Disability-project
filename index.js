const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const calFunctions = require("./main.js");
const alfa_fun = require("./alfa.js");
// const axe = require("./axe_core.js");
const path = require('path');
const { render } = require("ejs");
const { Console } = require("console");
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
var voilations_des=[];
var voilations_alfa=new Set();
var alfa_vol_des=[];
var guidelineTypeToName = {
  0: "A",
  1: "AA",
  2: "AAA",
  3: "Indian Guidelines"
}
app.post("/",function(req, res){
    
    var newurl=req.body.url;
    var gt=req.body.guidelineType;
    var guidelineType = Object.keys(guidelineTypeToName).find(key => guidelineTypeToName[key] === req.body.guidelineType);
    // console.log(" here ");
    // console.log(guidelineType);
    messageList = [];
    var alfa_score=0;
    var newPromise = new Promise((resolve, reject) => {
      resolve(messageList = calFunctions.evaluateWebsite(newurl, guidelineType));
      // throw new Error("Whoops! URL is wrong");
    });
      
      newPromise.then((message) => {
        voilations=new Set(); // changed
        console.log("messageList", message);
        var score=calFunctions.evaluateScore(message, guidelineType); //changed
        voilations=calFunctions.listofviolations(message, guidelineType);
        voilations_des=calFunctions.messageListExtract(message);
        console.log(voilations_des);
        var per=calFunctions.toPercent(score, guidelineType);  //changed
        console.log(voilations);
        console.log(score);
        console.log(per);
        
        var messageListAlfa = [];
        var sslResult;
        var newPromise_alfa = new Promise((resolve, reject) => {
          var sslChecker = require("ssl-checker");
          var url = require('url');
          resolve(
            sslChecker(url.parse(newurl).hostname).then((result) => sslResult = result )
          );
        }).catch((e) => {
            console.error("Error in ssl check: ",e);
            //console.log("Some error in http check ssl checker");
          });
        newPromise_alfa.then((message) => {
            console.info("ssl Checker Results:",sslResult);
            // console.log(sslResult);
            // console.log(message);
          nextPromise = new Promise((resolve, reject) => {
            /**
              * Website Evaluation Function Call
              */
            resolve((messageListAlfa = alfa_fun.evaluateUrlAlfa(newurl,guidelineTypeList[guidelineType])));
            ///////////////
          });
          nextPromise
            .then((message) => {
                /**
                  * Calculation Function Call
                  */
                console.log("Failed Guideline", message);
                voilations_alfa=message;

                //console.log("messageList Length", message.length);
                //var rulesNotFollowedSet = calFunctions.getSetOfFailedRules(message);
                console.log("Failed count",message.length)
                alfa_score = alfa_fun.evaluateScore(message.length,guidelineTypeList[guidelineType]);
                console.log("this is alfa score");
                console.log(alfa_score);
                alfa_per=alfa_fun.toPercent(alfa_score,guidelineTypeList[guidelineType]);
                alfa_vol_des=alfa_fun.getMessageListURI();
                console.log(alfa_vol_des);
                res.render("Score", {
                  url:newurl,
                  html_code_sniffer:score,
                  html_code_sniffer_per:per,
                  Axel_code:axel_per,
                  Score3:alfa_score,
                  alfa_p:alfa_per,
                  gt:gt
              })
                
            })
            .catch((e) => {
              console.error("error",e);
            })
            .finally(()=>{
              console.log("executed all call promises");
            })
        });
        





        // // console.log(per);
        // // axel_per=axe.test_axe(newurl);
        // console.log(axel_per);
        // // const {execSync} = require('child_process');
        // // execSync('sleep 10');
        // res.render("Score", {
        //     url:newurl,
        //     html_code_sniffer:score,
        //     html_code_sniffer_per:per,
        //     Axel_code:axel_per,
        //     Score3:alfa_score
        // })
        // console.log(score);
        // console.log("executed");

      }).catch((error) => {
        console.log(error);
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
  console.log(voilations_des);
  res.render("guidelines",{
    list:Array.from(voilations.values()),
    vol_des:voilations_des
  });
});
app.get("/guidelines_alfa", function(req, res){
  // console.log("-->");
  console.log(
    Array.from(voilations_alfa.values()) // prints unique Array [1, 2, 3]
  )
  // console.log(voilations);
  res.render("guidelines_alfa",{
    list:Array.from(voilations_alfa.values()),
    vol:alfa_vol_des
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
