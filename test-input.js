const readline = require("readline");
const calFunctions = require("./alfa.js");

let httpList = [
    "https://dducollegedu.ac.in/",
    "https://registry.gov.in/",
    "https://aktu.ac.in/",
    "https://www.aiims.edu/index.php?lang=en",
    "https://www.aiims.edu/en.html",
    "http://csjmu.ac.in/",
    "https://www.igib.res.in/",
    "https://srisriuniversity.edu.in/"
];
let guidelineType = ["A", "AA", "AAA", "InGuideline"];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function runProgram() {
    rl.question("Enter the index of the URL you want to test (0-6): ", function (
        httpSelected
    ) {
        rl.question(
            "Enter the index of the guideline you want to test (0 for A, 1 for AA, 2 for AAA, 3 for InGuideline): ",
            function (guidelineSelected) {
                if (httpSelected === "exit" || guidelineSelected === "exit") {
                    rl.close();
                    return;
                }

                var messageList = [];

                /**
                 * Main Testing Code Function calls
                 */

                //Use promises and async to ensure that code runs in a stepwise manner
                var sslResult;
                var newPromise = new Promise((resolve, reject) => {
                    var sslChecker = require("ssl-checker");
                    var url = require("url");
                    resolve(
                        sslChecker(
                            url.parse(httpList[httpSelected]).hostname
                        ).then((result) => (sslResult = result))
                    );
                }).catch((e) => {
                    console.error("Error in ssl check: ", e);
                    //console.log("Some error in http check ssl checker");
                });
                newPromise
                    .then((message) => {
                        console.info("ssl Checker Results:", sslResult);
                        // console.log(sslResult);
                        // console.log(message);
                        nextPromise = new Promise((resolve, reject) => {
                            /**
                             * Website Evaluation Function Call
                             */
                            messageList=[];
                            resolve(
                                (messageList = calFunctions.evaluateUrlAlfa(
                                    httpList[httpSelected],
                                    guidelineType[guidelineSelected]
                                ))
                            );
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
                                console.log("Failed count", message.length);
                                var score = calFunctions.evaluateScore(
                                    message.length,
                                    guidelineType[guidelineSelected]
                                );
                                console.log(score);
                                console.log(
                                    calFunctions.toPercent(
                                        score,
                                        guidelineType[guidelineSelected]
                                    )
                                );

                                // Run the program again to get user input
                                runProgram();
                            })
                            .catch((e) => {
                                console.error("error", e);
                            })
                            .finally(() => {
                                console.log("executed all call promises");
                            });
                    });
            }
        );
    });
}

// Start the program
runProgram();


