const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

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

function evaluateUrlAndGuideline(url, guidelineType) {
  var sslResult;
  return new Promise((resolve, reject) => {
    var sslChecker = require("ssl-checker");
    var parsedUrl = require('url').parse(url);
    resolve(
      sslChecker(parsedUrl.hostname).then((result) => {
        sslResult = result;
        return calFunctions.evaluateUrlAlfa(url, guidelineType);
      }).then((messageList) => {
        var score = calFunctions.evaluateScore(messageList.length, guidelineType);
        return {
          "url": url,
          "guideline": guidelineType,
          "sslResult": sslResult,
          "failedGuidelines": messageList,
          "score": score,
          "scorePercentage": calFunctions.toPercent(score, guidelineType)
        };
      })
    );
  });
}

function start() {
  rl.question("Enter a URL to evaluate (or 'exit' to quit): ", (urlInput) => {
    if (urlInput.toLowerCase() === 'exit') {
      console.log("Exiting program...");
      rl.close();
      return;
    }

    rl.question(`Select a guideline type (0 for A, 1 for AA, 2 for AAA, 3 for Indian Guidelines): `, (guidelineInput) => {
      var guidelineSelected = parseInt(guidelineInput);
      if (isNaN(guidelineSelected) || guidelineSelected < 0 || guidelineSelected > 3) {
        console.error("Invalid input for guideline type, please enter a number between 0 and 3");
        start();
        return;
      }

      evaluateUrlAndGuideline(urlInput, guidelineType[guidelineSelected]).then((result) => {
        console.log("Results for", result.url);
        console.log("Guideline:", result.guideline);
        console.log("SSL Results:", result.sslResult);
        console.log("Failed Guideline:", result.failedGuidelines);
        console.log("Failed Guideline Count:", result.failedGuidelines.length);
        console.log("Score:", result.score);
        console.log("Score Percentage:", result.scorePercentage);

        start();
      }).catch((e) => {
        console.error("Error occurred while evaluating URL:", e);
        start();
      });
    });
  });
}

start();
