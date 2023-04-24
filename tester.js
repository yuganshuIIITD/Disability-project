const calFunctions = require("./main_temp.js");

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
  "https://www.iiitd.ac.in/",
  "https://igib.res.in/"
];

//Use promises and async to ensure that code runs in a stepwise manner
var newPromise = new Promise((resolve, reject) => {
  resolve((messageList = calFunctions.evaluateWebsite(httpList[0],0)));
});

newPromise.then((message) => {
  console.log("messageList", message);
  //console.log("messageList Length", message.length);
  var score = calFunctions.evaluateScore(message,3);
  console.log(score);
  console.log(calFunctions.toPercent(score, 3));
});
console.log("executed");