const calFunctions = require("./alfa.js");

let httpList = [
  "https://dducollegedu.ac.in/",
  "https://registry.gov.in/",
  "https://aktu.ac.in/",
  "https://www.aiims.edu/index.php?lang=en",
    "https://www.aiims.edu/en.html",
    "http://csjmu.ac.in/",
    "https://www.igib.res.in/"
  ];
  let guidelineType = ['A','AA','AAA','InGuideline']

  var htttpSelected = 4;
  var messageList = [];
  var guidelineSelected = 3;
  /**
  * Main Testing Code Function calls
  */
 //Use promises and async to ensure that code runs in a stepwise manner
 var sslResult;
 var newPromise = new Promise((resolve, reject) => {
   var sslChecker = require("ssl-checker");
   var url = require('url');
   resolve(
     sslChecker(url.parse(httpList[htttpSelected]).hostname).then((result) => sslResult = result )
   );
 }).catch((e) => {
     console.error("Error in ssl check: ",e);
     //console.log("Some error in http check ssl checker");
   });
 newPromise.then((message) => {
     console.info("ssl Checker Results:",sslResult);
     // console.log(sslResult);
     // console.log(message);
   nextPromise = new Promise((resolve, reject) => {
     /**
      * Website Evaluation Function Call
      */
     resolve((messageList = calFunctions.evaluateUrlAlfa(httpList[htttpSelected],guidelineType[guidelineSelected])));
     ///////////////
   });
   nextPromise
     .then((message) => {
         /**
          * Calculation Function Call
          */
         //console.log("Failed Guideline List", messageList);
         console.log("Failed Guideline", message);
         //console.log("messageList Length", message.length);
         //var rulesNotFollowedSet = calFunctions.getSetOfFailedRules(message);
         console.log("Failed count",message.length)
         var score = calFunctions.evaluateScore(message.length , guidelineType[guidelineSelected]);
         console.log(score);
         console.log(calFunctions.toPercent(score,guidelineType[guidelineSelected]));
     })
     .catch((e) => {
       console.error("error",e);
     })
    .finally(()=>{
      console.log("executed all call promises");
    })
 });

