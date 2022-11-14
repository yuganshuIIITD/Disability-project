//const evaluateWebsite = require('module');
var jsdom = require("jsdom");
var { JSDOM } = jsdom;
var fs = require("fs");

//import fetch from "node-fetch";

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

async function evaluateWebsite(websiteHttp) {
  //document = Jsoup.connect(websiteHttp).get();
  //var websiteHtml = new XMLSerializer().serializeToString(doc)
  var messageList = [];
  // Forward messages to the console.
  vConsole.on("log", function (message) {
    if (message != "done") {
      messageList.push(message);
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
  dom.window.HTMLCS_RUNNER.run("WCAG2AA");
  //console.log(messageList);
  return messageList;
}

function evaluateScore(messageList) {
  const totalGuideLines = 61;
  const len = messageList.length;

  const guidelineSet = new Set();

  //Creating a set for guidelines not followed.
  for (let i = 0; i < len; i++) {
    //console.log(messageList[i]);
    var mp = messageList[i];
    var splitList = mp.toString().split("|");
    var fineSplit = splitList.toString().split(".");
    guidelineSet.add(fineSplit[3]);
    //console.log(fineSplit[3]);
  }
  //Simple Calcaulation logic
  var score = totalGuideLines - guidelineSet.size;
  //console.log(guidelineSet.size)
  return score;
}

function toPercent(value, total) {
  return ((value / total) * 100).toFixed(2);
}

module.exports = { evaluateWebsite, evaluateScore, toPercent };
// module.exports = evaluateScore;
