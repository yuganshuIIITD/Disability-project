const calFunctions = require("./main.js");

//First run evaluate Website
// This will output the set of warnings ,notices and errors in the html input
// And then using its output run evaluateScore

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

var messageList = [];

var httpList = [
  "https://stackoverflow.com/questions/16631064/declare-multiple-module-exports-in-node-js",
  "https://bobbyhadz.com/blog/javascript-typeerror-string-split-is-not-a-function#:~:text=The%20%22split%20is%20not%20a,the%20split%20method%20on%20strings.",
  "https://www.w3schools.com/js/js_object_sets.asp",
  "https://www.w3schools.com/js/js_const.asp",
  "https://www.w3schools.com/js/js_loop_for.asp",
  "https://www.w3.org/TR/WCAG21/#link-purpose-in-context",
  "https://www.learningcontainer.com/mp4-sample-video-files-download/#",
  "https://habitica.com/",
  "https://docs.google.com/document/d/1deRJ2xaMBan5dLiMHDhj-NvO3Mf_mZlIhP5qdVZT51U/edit",
  "https://mail.google.com/mail/u/1/#inbox",
  "https://example.com/",
];

//Use promises and async to ensure that code runs in a stepwise manner
var newPromise = new Promise((resolve, reject) => {
  resolve((messageList = calFunctions.evaluateWebsite(httpList[2],3)));
});

newPromise.then((message) => {
  console.log("messageList", message);
  //console.log("messageList Length", message.length);
  var guidelineSet;
  var score= calFunctions.evaluateScore(message,3);
  console.log(score);
  // console.log(guidelineSet);
  // var returning= calFunctions.evaluateScore(message,3);
  // console.log(returning.score);
  // console.log(returning.guidelineSet);
  var gset=calFunctions.guidelinelist(message,3);
  console.log(gset);

  console.log(calFunctions.toPercent(score, 3));
});
console.log("executed");