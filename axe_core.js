var selenium = require('selenium-webdriver'),
    AxeBuilder = require('axe-webdriverjs');
var util = require('util');

var driver, browser;
//const Jasmine = require('jasmine');
//const jasmine = new Jasmine().jasmine;
//cmd input
//const prompt = require("prompt-sync")();
//const input = prompt("Enter website to test: ");

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;


//var customRuleJson = require('./custom-rule.json');
var test = 78;
var violations;
describe('test_axe', function(require) {

    // Open the MarsCommuter website in the browser before each test is run
    beforeEach(function(done) {
        driver = new selenium.Builder()
            .forBrowser('chrome');

        browser = driver.build();

        //browser.manage().timeouts().setScriptTimeout(60000);

        browser.get(input).then(function () {
            browser.executeAsyncScript(function(callback) {
                var script = document.createElement('script');
                script.innerHTML = 'document.documentElement.classList.add("deque-axe-is-ready");';
                document.documentElement.appendChild(script);
                callback();
            })
            .then(function () {
                return browser.wait(selenium.until.elementsLocated(selenium.By.css('.deque-axe-is-ready')));
            })
            .then(function () {
                done();
            });
        });
    });

    // Close the website after each test is run (so that it is opened fresh each time)
    afterEach(function(done) {
        browser.quit().then(function () {
            done();
        });
    });

    it('should fetch the home page and analyze it', function (done) {
        browser.findElement(selenium.By.tagName('body'))
            .then(function () {
                AxeBuilder(browser)
                    //.configure(customRuleJson)
                    .analyze(function(results) {
                        console.log('Accessibility Violations: ', results.violations.length);
                        //console.log('Incomplete Tests: ', results.incomplete.length);
                        violations = results.violations.length;
                        if (results.violations.length > 0 || results.incomplete.length > 0) {
                            // console.log(util.inspect(results.violations, { showHidden: true, depth: 8 }));
                            // console.log(util.inspect(results.incomplete, { showHidden: true, depth: 5 }));
                        }
                        console.log(results);
                        // expect(results.violations.length).toBe(0);
                        // expect(results.incomplete.length).toBe(0);
                        var percentage = ((test - violations)/test)*100;
                        console.log("Score Percentage : ",percentage);
                        done();
                    })
            });
    });
});

// function test_axe(input){
//     // Open the MarsCommuter website in the browser before each test is run
//     beforeEach(function(done) {
//         driver = new selenium.Builder()
//             .forBrowser('chrome');

//         browser = driver.build();

//         //browser.manage().timeouts().setScriptTimeout(60000);

//         browser.get(input).then(function () {
//             browser.executeAsyncScript(function(callback) {
//                 var script = document.createElement('script');
//                 script.innerHTML = 'document.documentElement.classList.add("deque-axe-is-ready");';
//                 document.documentElement.appendChild(script);
//                 callback();
//             })
//             .then(function () {
//                 return browser.wait(selenium.until.elementsLocated(selenium.By.css('.deque-axe-is-ready')));
//             })
//             .then(function () {
//                 done();
//             });
//         });
//     });

//     // Close the website after each test is run (so that it is opened fresh each time)
//     afterEach(function(done) {
//         browser.quit().then(function () {
//             done();
//         });
//     });

//     it('should fetch the home page and analyze it', function (done) {
//         browser.findElement(selenium.By.tagName('body'))
//             .then(function () {
//                 AxeBuilder(browser)
//                     //.configure(customRuleJson)
//                     .analyze(function(results) {
//                         console.log('Accessibility Violations: ', results.violations.length);
//                         //console.log('Incomplete Tests: ', results.incomplete.length);
//                         violations = results.violations.length;
//                         if (results.violations.length > 0 || results.incomplete.length > 0) {
//                             // console.log(util.inspect(results.violations, { showHidden: true, depth: 8 }));
//                             // console.log(util.inspect(results.incomplete, { showHidden: true, depth: 5 }));
//                         }
//                         console.log(results);
//                         // expect(results.violations.length).toBe(0);
//                         // expect(results.incomplete.length).toBe(0);
//                         var percentage = ((test - violations)/test)*100;
//                         console.log("Score Percentage : ",percentage);
//                         done();
//                         //return percentage;
//                     })
//             });
//     });
// }
test_axe("https://stackoverflow.com");
module.exports = {test_axe};