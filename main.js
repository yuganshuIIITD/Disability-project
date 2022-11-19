/**
 * First run evaluateWebsite
 * Input the url and then 0 , 1 , 2 or 3
 *  0 - WCAG2A
 *  1 - WCAG2AA
 *  2 - WCAG2AAA
 *  3 - Indian Guidelines
 * // And then using its output run evaluateScore
 * //  pass as evaluateScore(output from evaluateWebsite , <Number as give above 0,1,2 or 3>)
 */
 var jsdom = require("jsdom");
 var { JSDOM } = jsdom;
 var fs = require("fs");
 
 
 
 /**
  * Global Values 
  */
 
 //Indian Guidelines list
  const indianGuidelines = [
   "1_1_1",
   "1_2_1",
   "1_2_2",
   "1_2_3",
   "1_2_5",
   "1_3_1",
   "1_3_2",
   "1_3_3",
   "1_4_1",
   "1_4_2",
   "1_4_3",
   "1_4_4",
   "1_4_5",
   "2_1_1",
   "2_1_2",
   "2_2_1",
   "2_2_2",
   "2_3_2",
   "2_4_1",
   "2_4_2",
   "2_4_3",
   "2_4_4",
   "2_4_5",
   "2_4_6",
   "2_4_7",
   "3_1_1",
   "3_1_2",
   "3_2_1",
   "3_2_2",
   "3_2_3",
   "3_2_4",
   "3_3_1",
   "3_3_2",
   "3_3_3",
   "3_3_4",
   "4_1_1",
   "4_1_2",
 ];
 
 
 
  //WCAG2A
  const wcag2aSize = 30;
  //WCAG2AA
  const wcag2aaSize = wcag2aSize + 20;
  //WCAG2AAA
  const wcag2aaaSize = wcag2aaSize + 28;
  //Indian AAA
  const indianGuidelinesSize = 37;
 //Array for the below nums
 const guidelineCount = [wcag2aSize, wcag2aaSize ,wcag2aaaSize ,indianGuidelinesSize] 
 
 /**
  * Function starts
  */
 
 var HTMLCS = fs.readFileSync("./build/HTMLCS.js", "utf-8");
 var vConsole = new jsdom.VirtualConsole();
 
 async function getHtml(urlInput) {
   const dom = new JSDOM();
   var htmlString = "";
   var result = new Promise((resolve, reject) => {
     JSDOM.fromURL(urlInput).then((dom) => {
       //console.log(dom.serialize());
       var temp = dom.serialize();
       //htmlString = temp;
       resolve((htmlString = temp));
       //return htmlString;
       //console.log(htmlString);
     });
   });
 
   await result.then((data) => {
     //console.log("printing htmlString ", htmlString);
   });
   return htmlString;
 }
 
 async function evaluateWebsite(websiteHttp, guildelineType) {
   //document = Jsoup.connect(websiteHttp).get();
   //var websiteHtml = new XMLSerializer().serializeToString(doc)
   var messageList = [];
   // Forward messages to the console.
   vConsole.on("log", function (message) {
     if (message != "done") {
 
       if(guildelineType !=3){
         messageList.push(message);
       } else if(isIndianGuidlines(message)){
         messageList.push(message);
       }
       
     }
   });
   //await getHtml(websiteHttp);
   var urlInput = "";
   urlInput = await getHtml(websiteHttp);
   //console.log("urlInput", urlInput);
   //console.log(getHtml(websiteHttp,""));
   //Evaluate website setup
   var dom = new JSDOM(urlInput, {
     runScripts: "dangerously",
     virtualConsole: vConsole,
   });
 
   //Running the evaluation of website
   dom.window.eval(HTMLCS);
 
   if (guildelineType == 0) {
     dom.window.HTMLCS_RUNNER.run("WCAG2A");
   } else if (guildelineType == 1) {
     dom.window.HTMLCS_RUNNER.run("WCAG2AA");
   } else if (guildelineType == 2) {
     dom.window.HTMLCS_RUNNER.run("WCAG2AAA");
   } else if (guildelineType == 3) {
     dom.window.HTMLCS_RUNNER.run("WCAG2AAA");
   } else {
     console.log("Incorrect guildelineType");
   }
 
   //console.log(messageList);
   return messageList;
 }
 
 
 
 function isIndianGuidlines(message) {
   var splitList = message.toString().split("|");
   var fineSplit = splitList.toString().split(".");
   var finalM = fineSplit[3].substring(0, 5);
   //console.log("finallM",finalM);
   if(indianGuidelines.includes(finalM)){
     //console.log("true")
     return true;
   }else{
     return false;
   }
 }
 
 function evaluateScore(messageList , guildelineType ) {
  
   //const list = [];
 
   const len = messageList.length;
 
   const guidelineSet = new Set();
 
   //Creating a set for guidelines not followed.
   for (let i = 0; i < len; i++) {
     //console.log(messageList[i]);
     var mp = messageList[i];
     var splitList = mp.toString().split("|");
     var fineSplit = splitList.toString().split(".");
 
     guidelineSet.add(fineSplit[3].substring(0, 5));
     //console.log(fineSplit[3]);
   }
   //Simple Calcaulation logic
   var score = guidelineCount[guildelineType] - guidelineSet.size;
   console.log(guidelineSet);
   return score;
 }
 
 function toPercent(value, guildelineType) {
   return ((value / guidelineCount[guildelineType]) * 100).toFixed(2);
 }
 
 module.exports = { evaluateWebsite, evaluateScore, toPercent };
 // module.exports = evaluateScore;