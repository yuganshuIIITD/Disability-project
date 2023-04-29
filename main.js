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
const puppeteer = require('puppeteer'); 
const { url } = require("inspector");

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
const guidelineCount = [
  wcag2aSize,
  wcag2aaSize,
  wcag2aaaSize,
  indianGuidelinesSize,
];

var HTMLCS = fs.readFileSync("./build/HTMLCS.js", "utf-8");
var vConsole = new jsdom.VirtualConsole();
var noHtml = false;

async function getHtml(urlInput) {
  var htmlString = "";
  noHtml=false;
  const browser = await puppeteer.launch();
  // console.log("here");
  // const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'});
  try {
      const page = await browser.newPage();   
      await page.goto(urlInput, { waitUntil: 'networkidle0' });
      const data = await page.evaluate(() => document.querySelector('*').outerHTML);
      // console.log("here");
      // const data = await page.content();
      // console.log(data);
      htmlString=data;
      // console.log(htmlString);
      await browser.close();
    } catch (e) {
      console.log("I Encountered an error");
      console.log(e);
      noHtml=true;
      await browser.close();
      return htmlString;
    }
  // console.log(htmlString);  
  await browser.close();
 return htmlString;
}

async function evaluateWebsite(websiteHttp, guildelineType) {
  //document = Jsoup.connect(websiteHttp).get();
  //var websiteHtml = new XMLSerializer().serializeToString(doc)
  var messageList = [];
  // Forward messages to the console.
  vConsole.on("log", function (message) {
    if (message != "done") {
      if (guildelineType != 3) {
        messageList.push(message);
      } else if (isIndianGuidlines(message)) {
        messageList.push(message);
      }
    }
  });
  var urlInput = "";

  urlInput = await getHtml(websiteHttp);
  // console.log(urlInput);
  if (noHtml == true) {
    return [];
  }
 
  var dom = new JSDOM(urlInput, {
    runScripts: "dangerously",
    virtualConsole: vConsole,
  });
  
  //Running the evaluation of website
  dom.window.eval(HTMLCS);

  // console.log("here");
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

  // console.log("here 2");
  return messageList;
}


/**
 * 
 * @param {*} messageList 
 * @returns 0 index is Guideline violation type like warning , notice and  [HTMLCS] Warning',
 * 1 index is WCAG2AAA.Principle1.Guideline1_3.1_3_1.H49.Font' -> guideline id
 * 2 index is font',
 * 3 index is ""
 * 4 index is desciption
 * 5 index(occurs in some) is <font color="#b30000" size="2">...</font>'
 */ 
function messageListExtract(messageList){

  var messageListArray = new Array(7,messageList.length);
  for (let i = 0; i < messageList.length; i++) {
    const parts = messageList[i].split('|');
    messageListArray[i]=parts;
    // messageListArray[i][0]=originalString.replace("[HTMLCS] Notice", "");

  }
  // console.log("messagelist", messageListArray);


  // '[HTMLCS] Warning',
  // 'WCAG2AAA.Principle1.Guideline1_3.1_3_1.H49.Font',
  // 'font',
  // '',
  // 'Semantic markup should be used to mark emphasised or special text so that it can be programmatically determined.',
  // '<font color="#b30000" size="2">...</font>'
  return messageListArray;
}


function sortArrayByStringFormat(arr) {
  // Use custom sorting logic to sort by the "3_2_4" format in the second element
  arr.sort(function(a, b) {
    const formatA = a[1].match(/\d+_\d+_\d+/)[0];
    const formatB = b[1].match(/\d+_\d+_\d+/)[0];
    return formatA.localeCompare(formatB);
  });

  return arr;
}



function isIndianGuidlines(message) {
  var splitList = message.toString().split("|");
  var fineSplit = splitList.toString().split(".");
  var finalM = fineSplit[3].substring(0, 5);
  //console.log("finallM",finalM);
  if (indianGuidelines.includes(finalM)) {
    //console.log("true")
    return true;
  } else {
    return false;
  }
}

function evaluateScore(messageList, guildelineType) {
  if (messageList.length == 0) {
    console.log("Empty Message List: Assigning 0 score");
    return 0;
  }

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
  // console.log(guidelineSet);
  return score;
}

function listofviolations(messageList, guidelineType ) {

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
  return guidelineSet;
}

function toPercent(value, guildelineType) {
  var returnValue = 0.0;
  try {
    returnValue = ((value / guidelineCount[guildelineType]) * 100).toFixed(2);
  } catch (e) {
    console.error("toPercent error:",e);
    return returnValue;
  } finally {
    return returnValue;
  }
}

module.exports = { evaluateWebsite, evaluateScore, toPercent,listofviolations,messageListExtract,sortArrayByStringFormat};























// /**
//  * First run evaluateWebsite
//  * Input the url and then 0 , 1 , 2 or 3
//  *  0 - WCAG2A
//  *  1 - WCAG2AA
//  *  2 - WCAG2AAA
//  *  3 - Indian Guidelines
//  * // And then using its output run evaluateScore
//  * //  pass as evaluateScore(output from evaluateWebsite , <Number as give above 0,1,2 or 3>)
//  */
// var jsdom = require("jsdom");
// var { JSDOM } = jsdom;
// var fs = require("fs");
// const puppeteer = require('puppeteer'); 

// //Indian Guidelines list
// const indianGuidelines = [
//   "1_1_1",
//   "1_2_1",
//   "1_2_2",
//   "1_2_3",
//   "1_2_5",
//   "1_3_1",
//   "1_3_2",
//   "1_3_3",
//   "1_4_1",
//   "1_4_2",
//   "1_4_3",
//   "1_4_4",
//   "1_4_5",
//   "2_1_1",
//   "2_1_2",
//   "2_2_1",
//   "2_2_2",
//   "2_3_2",
//   "2_4_1",
//   "2_4_2",
//   "2_4_3",
//   "2_4_4",
//   "2_4_5",
//   "2_4_6",
//   "2_4_7",
//   "3_1_1",
//   "3_1_2",
//   "3_2_1",
//   "3_2_2",
//   "3_2_3",
//   "3_2_4",
//   "3_3_1",
//   "3_3_2",
//   "3_3_3",
//   "3_3_4",
//   "4_1_1",
//   "4_1_2",
// ];

// //WCAG2A
// const wcag2aSize = 30;
// //WCAG2AA
// const wcag2aaSize = wcag2aSize + 20;
// //WCAG2AAA
// const wcag2aaaSize = wcag2aaSize + 28;
// //Indian AAA
// const indianGuidelinesSize = 37;
// //Array for the below nums
// const guidelineCount = [
//   wcag2aSize,
//   wcag2aaSize,
//   wcag2aaaSize,
//   indianGuidelinesSize,
// ];

// var HTMLCS = fs.readFileSync("./build/HTMLCS.js", "utf-8");
// var vConsole = new jsdom.VirtualConsole();
// var noHtml = false;

// async function getHtml(urlInput) {
//   var htmlString = "";
//   const browser = await puppeteer.launch();
//   noHtml = false;
//   try {
//       // const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome'});
//       const page = await browser.newPage();   
//       await page.goto(urlInput, { waitUntil: 'networkidle0' });
//       const data = await page.evaluate(() => document.querySelector('*').outerHTML);
//       // const data = await page.content();
//       // console.log(data);
//       htmlString=data;
//       // console.log(htmlString);
//       await browser.close();
//     } catch (e) {
//       console.log("I Encountered an error - URL is not of Type https://example.com ");
//       // console.log(e);
//       noHtml=true;
//       await browser.close();
//       return htmlString;
//     }
//   // console.log(htmlString);  
// //  console.log("here"); 
//  await browser.close();
//  return htmlString;
// }

// async function evaluateWebsite(websiteHttp, guildelineType) {
//   //document = Jsoup.connect(websiteHttp).get();
//   //var websiteHtml = new XMLSerializer().serializeToString(doc)
//   var messageList = [];
//   // Forward messages to the console.
//   vConsole.on("log", function (message) {
//     if (message != "done") {
//       if (guildelineType != 3) {
//         messageList.push(message);
//       } else if (isIndianGuidlines(message)) {
//         messageList.push(message);
//       }
//     }
//   });
//   var urlInput = "";

//   urlInput = await getHtml(websiteHttp);
//   if (noHtml == true) {
//     return [];
//   }
 
//   var dom = new JSDOM(urlInput, {
//     runScripts: "dangerously",
//     virtualConsole: vConsole,
//   });

//   //Running the evaluation of website
//   dom.window.eval(HTMLCS);

//   if (guildelineType == 0) {
//     dom.window.HTMLCS_RUNNER.run("WCAG2A");
//   } else if (guildelineType == 1) {
//     dom.window.HTMLCS_RUNNER.run("WCAG2AA");
//   } else if (guildelineType == 2) {
//     dom.window.HTMLCS_RUNNER.run("WCAG2AAA");
//   } else if (guildelineType == 3) {
//     dom.window.HTMLCS_RUNNER.run("WCAG2AAA");
//   } else {
//     console.log("Incorrect guildelineType");
//   }
//   return messageList;
// }

// function isIndianGuidlines(message) {
//   var splitList = message.toString().split("|");
//   var fineSplit = splitList.toString().split(".");
//   var finalM = fineSplit[3].substring(0, 5);
//   //console.log("finallM",finalM);
//   if (indianGuidelines.includes(finalM)) {
//     //console.log("true")
//     return true;
//   } else {
//     return false;
//   }
// }

// function evaluateScore(messageList, guildelineType) {
//   if (messageList.length == 0) {
//     console.log("Empty Message List: Assigning 0 score");
//     return 0;
//   }

//   const len = messageList.length;

//   const guidelineSet = new Set();

//   //Creating a set for guidelines not followed.
//   for (let i = 0; i < len; i++) {
//     //console.log(messageList[i]);
//     var mp = messageList[i];
//     var splitList = mp.toString().split("|");
//     var fineSplit = splitList.toString().split(".");
//     // try{
//     guidelineSet.add(fineSplit[3].substring(0, 5));
//     // }
//     // catch(e){
//     //   console.log(e);
//     // }
//     //console.log(fineSplit[3]);
//   }
//   //Simple Calcaulation logic
//   var score = guidelineCount[guildelineType] - guidelineSet.size;
//   // console.log(guidelineSet);
//   return score;
// }

// function listofviolations(messageList, guidelineType ) {

//   const len = messageList.length;
//   const guidelineSet = new Set();
//   //Creating a set for guidelines not followed.
//   for (let i = 0; i < len; i++) {
//     //console.log(messageList[i]);
//     var mp = messageList[i];
//     var splitList = mp.toString().split("|");
//     var fineSplit = splitList.toString().split(".");
//     guidelineSet.add(fineSplit[3].substring(0, 5));
//     //console.log(fineSplit[3]);
//   }
//   return guidelineSet;
// }

// function toPercent(value, guildelineType) {
//   var returnValue = 0.0;
//   try {
//     returnValue = ((value / guidelineCount[guildelineType]) * 100).toFixed(2);
//   } catch (e) {
//     console.error("toPercent error:",e);
//     return returnValue;
//   } finally {
//     return returnValue;
//   }
// }

// module.exports = { evaluateWebsite, evaluateScore, toPercent,listofviolations};
