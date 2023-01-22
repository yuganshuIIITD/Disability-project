const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const calFunctions = require("./main.js");
// const axe = require("./axe_core.js");
const path = require("path");
const { render } = require("ejs");
// app.use(express.static('public'));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "css")));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.render("home");
});
var score = 2;
var per = 0;
var axel_score = 0;
var axel_per = 0;
var third_score = 0;
var third_per = 0;
// var axescore=0;
var messageList = [];
var guidelineTypeToName = {
  0: "A",
  1: "AA",
  2: "AAA",
};
app.post("/", function (req, res) {
  var newurl = req.body.url;
  var guidelineType = Object.keys(guidelineTypeToName).find(
    (key) => guidelineTypeToName[key] === req.body.guidelineType
  );

  var sslResult;
  var newPromise = new Promise((resolve, reject) => {
    var sslChecker = require("ssl-checker");
    var url = require("url");
    resolve(
      sslChecker(url.parse(newurl).hostname).then(
        (result) => (sslResult = result)
      )
    );
  }).catch((e) => {
    console.error("Error in ssl check: ", e);
    //console.log("Some error in http check ssl checker");
  });

  newPromise.then((message) => {
    console.info("ssl Checker Results:", sslResult);
    // console.log("messageList Length", message.length);

    nextPromise = new Promise((resolve, reject) => {
      /**
       * Website Evaluation Function Call
       */
      resolve(
        (messageList = calFunctions.evaluateWebsite(newurl, guidelineType))
      );
      ///////////////
    });
    nextPromise
      .then((message) => {
        /**
         * Calculation Function Call
         */
        console.log("messageList", message);
        //console.log("messageList Length", message.length);
        var score = calFunctions.evaluateScore(message, guidelineType);
        console.log(score);
        console.log(calFunctions.toPercent(score, guidelineType));
        var per = calFunctions.toPercent(score, guidelineType);
        res.render("Score", {
          url: newurl,
          html_code_sniffer: score,
          html_code_sniffer_per: per,
          Axel_code: 20,
          Score3: 24,
        });
        console.log(score);
      })
      .catch((e) => {
        console.error("Error in evaluation",e);
      });
    console.log("executed call promise");
  });
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/feedback", function (req, res) {
  res.render("feedback");
});
app.get("/resources", function (req, res) {
  res.render("resources");
});
app.get("/Analytics", function (req, res) {
  res.render("analytics", {
    html_code_score: per,
    html_code_guide_lines: score,
    axel_core_score: axel_per,
    axel_core_guide_lines: axel_score,
    third_score: third_per,
    third_guide_lines: third_score,
  });
});
app.get("/submit", function (req, res) {
  res.render("home");
});
app.listen(3000, function () {
  console.log("server started");
});
