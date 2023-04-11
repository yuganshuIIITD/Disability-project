"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.toPercent = exports.evaluateScore = exports.evaluateUrlAlfa = void 0;
var alfa_act_1 = require("@siteimprove/alfa-act");
var alfa_scraper_1 = require("@siteimprove/alfa-scraper");
var alfa_rules_1 = require("@siteimprove/alfa-rules");
/**
 * Dictionary for Alfa Rules
 */
var rulesDictionary = {
    'https://alfa.siteimprove.com/rules/sia-r100': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r101': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r102': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r103': ['1.4.3', '1.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r104': ['1.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r109': ['3.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r10': ['1.3.5'],
    'https://alfa.siteimprove.com/rules/sia-r110': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r11': ['2.4.4', '2.4.9', '4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r12': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r13': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r14': ['2.5.3'],
    'https://alfa.siteimprove.com/rules/sia-r15': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r16': ['1.3.1', ' 4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r17': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r18': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r19': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r1': ['2.4.2'],
    'https://alfa.siteimprove.com/rules/sia-r20': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r21': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r22': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r23': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r24': ['1.2.8'],
    'https://alfa.siteimprove.com/rules/sia-r25': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r26': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r27': ['1.2.2'],
    'https://alfa.siteimprove.com/rules/sia-r28': ['1.1.1', '4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r29': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r2': ['1.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r30': ['1.2.1'],
    'https://alfa.siteimprove.com/rules/sia-r31': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r32': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r33': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r34': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r35': ['1.2.1'],
    'https://alfa.siteimprove.com/rules/sia-r36': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r37': ['1.2.5'],
    'https://alfa.siteimprove.com/rules/sia-r38': ['1.2.3', '1.2.5', '1.2.8'],
    'https://alfa.siteimprove.com/rules/sia-r39': ['1.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r3': ['4.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r40': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r41': ['2.4.9'],
    'https://alfa.siteimprove.com/rules/sia-r42': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r43': ['1.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r44': ['1.3.4'],
    'https://alfa.siteimprove.com/rules/sia-r45': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r46': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r47': ['1.4.4', '1.4.10'],
    'https://alfa.siteimprove.com/rules/sia-r48': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r49': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r4': ['3.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r50': ['1.4.2'],
    'https://alfa.siteimprove.com/rules/sia-r52': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r53': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r54': ['3.3.1', '4.1.3'],
    'https://alfa.siteimprove.com/rules/sia-r55': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r56': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r57': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r58': ['2.4.1'],
    'https://alfa.siteimprove.com/rules/sia-r59': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r5': ['3.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r60': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r61': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r62': ['1.4.1'],
    'https://alfa.siteimprove.com/rules/sia-r63': ['1.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r64': ['1.3.1', ' 2.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r65': ['2.4.7'],
    'https://alfa.siteimprove.com/rules/sia-r66': ['1.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r67': ['1.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r68': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r69': ['1.4.3', '1.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r6': ['3.1.1'],
    'https://alfa.siteimprove.com/rules/sia-r70': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r71': ['1.4.8'],
    'https://alfa.siteimprove.com/rules/sia-r72': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r73': ['1.4.8'],
    'https://alfa.siteimprove.com/rules/sia-r74': ['1.4.8'],
    'https://alfa.siteimprove.com/rules/sia-r75': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r76': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r77': ['1.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r78': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r79': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r7': ['3.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r80': ['1.4.8'],
    'https://alfa.siteimprove.com/rules/sia-r81': ['2.4.4', '2.4.9'],
    'https://alfa.siteimprove.com/rules/sia-r82': ['3.3.1'],
    'https://alfa.siteimprove.com/rules/sia-r83': ['1.4.4'],
    'https://alfa.siteimprove.com/rules/sia-r84': ['2.1.1', '2.1.3'],
    'https://alfa.siteimprove.com/rules/sia-r85': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r86': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r87': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r88': ['1.4.3', '1.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r89': ['1.4.6'],
    'https://alfa.siteimprove.com/rules/sia-r8': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r90': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r91': ['1.4.12'],
    'https://alfa.siteimprove.com/rules/sia-r92': ['1.4.12'],
    'https://alfa.siteimprove.com/rules/sia-r93': ['1.4.12'],
    'https://alfa.siteimprove.com/rules/sia-r94': ['4.1.2'],
    'https://alfa.siteimprove.com/rules/sia-r96': ['2.2.4', '3.2.5'],
    'https://alfa.siteimprove.com/rules/sia-r97': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r98': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r99': ['NULL'],
    'https://alfa.siteimprove.com/rules/sia-r9': ['2.2.1', '2.2.4', ' 3.2.5'],
    'https://alfa.siteimprove.com/rules/sia-r95': ['2.1.1']
};
var ALFA_ALL_RULES = 35;
var wcagAlfaDictionary = {
    '1.1.1': 'A',
    '1.2.1': 'A',
    '1.2.2': 'A',
    '1.2.3': 'A',
    '1.2.5': 'AA',
    '1.2.8': 'AAA',
    '1.3.1': 'A',
    '1.3.4': 'AA',
    '1.3.5': 'AA',
    '1.4.1': 'A',
    '1.4.2': 'A',
    '1.4.3': 'AA',
    '1.4.4': 'AA',
    '1.4.6': 'AAA',
    '1.4.8': 'AAA',
    '1.4.10': 'AA',
    '1.4.12': 'AA',
    '2.1.1': 'A',
    '2.1.3': 'AAA',
    '2.2.1': 'A',
    '2.2.4': 'AAA',
    '2.4.1': 'A',
    '2.4.2': 'A',
    '2.4.4': 'A',
    '2.4.6': 'AA',
    '2.4.7': 'AA',
    '2.4.9': 'AAA',
    '2.5.3': 'A ',
    '3.1.1': 'A',
    '3.1.2': 'AA',
    '3.2.5': 'AAA',
    '3.3.1': 'A',
    '4.1.1': 'A',
    '4.1.2': 'A',
    '4.1.3': 'AA'
};
var ruleCount = { 'A': 17, 'AA': 28, 'AAA': 35, 'InGuideline': 22 };
var indianGuidelinesSet = ['1.1.1',
    '1.2.1',
    '1.2.2',
    '1.2.3',
    '1.2.5',
    '1.3.1',
    '1.4.1',
    '1.4.2',
    '1.4.3',
    '1.4.4',
    '2.1.1',
    '2.2.1',
    '2.4.1',
    '2.4.2',
    '2.4.4',
    '2.4.6',
    '2.4.7',
    '3.1.1',
    '3.1.2',
    '3.3.1',
    '4.1.1',
    '4.1.2'
];
var isJsonEmpty = true;
var rulesNotFollowedSet = new Set();
var makeSet = [];
function evaluateUrlAlfa(urlInput, guideLineType) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, alfa_scraper_1.Scraper["with"](function (scraper) { return __awaiter(_this, void 0, void 0, function () {
                        var outcomes, _a, _b, input, e_1_1, values;
                        var e_1, _c;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    isJsonEmpty = true;
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 7, 8, 9]);
                                    return [4 /*yield*/, scraper.scrape(urlInput)];
                                case 2:
                                    _a = __values.apply(void 0, [_d.sent()]), _b = _a.next();
                                    _d.label = 3;
                                case 3:
                                    if (!!_b.done) return [3 /*break*/, 6];
                                    input = _b.value;
                                    return [4 /*yield*/, alfa_act_1.Audit.of(input, alfa_rules_1["default"]).evaluate()];
                                case 4:
                                    outcomes = _d.sent();
                                    _d.label = 5;
                                case 5:
                                    _b = _a.next();
                                    return [3 /*break*/, 3];
                                case 6: return [3 /*break*/, 9];
                                case 7:
                                    e_1_1 = _d.sent();
                                    e_1 = { error: e_1_1 };
                                    return [3 /*break*/, 9];
                                case 8:
                                    try {
                                        if (_b && !_b.done && (_c = _a["return"])) _c.call(_a);
                                    }
                                    finally { if (e_1) throw e_1.error; }
                                    return [7 /*endfinally*/];
                                case 9:
                                    //console.log(typeof outcomes)
                                    if (outcomes !== undefined) {
                                        isJsonEmpty = false;
                                        values = __spreadArray([], __read(outcomes), false);
                                        console.log("Outcome Defined");
                                        values.forEach(function (jsonObj) {
                                            //console.log(jsonObj)
                                            if (findUriForFailed(jsonObj) !== '') {
                                                rulesDictionary[findUriForFailed(jsonObj)].forEach(function (element) {
                                                    if (element !== 'NULL') {
                                                        if (wcagAlfaDictionary[element] === 'A') {
                                                            rulesNotFollowedSet.add(element);
                                                        }
                                                        else if ((guideLineType === 'AA' || guideLineType === 'AAA') && wcagAlfaDictionary[element] === 'AA') {
                                                            rulesNotFollowedSet.add(element);
                                                        }
                                                        else if (guideLineType === 'AAA' && wcagAlfaDictionary[element] === 'AAA') {
                                                            rulesNotFollowedSet.add(element);
                                                        }
                                                        else if (guideLineType === 'InGuideline' && indianGuidelinesSet.includes(element)) {
                                                            rulesNotFollowedSet.add(element);
                                                        }
                                                    }
                                                });
                                            }
                                        });
                                        makeSet = __spreadArray([], __read(rulesNotFollowedSet), false);
                                        //console.log(makeSet)
                                        //   for (let key of Object.keys(values)) {
                                        //     console.log(values[key]);
                                        // }
                                        //loopKeys(values);
                                    }
                                    else {
                                        console.log("Outcome undefined");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
                case 1:
                    _a.sent();
                    //console.log("returning already",makeSet)
                    return [2 /*return*/, makeSet];
            }
        });
    });
}
exports.evaluateUrlAlfa = evaluateUrlAlfa;
// function getSetOfFailedRules(outcomes:any):Set<string>{
// }
function findUriForFailed(obj) {
    if (obj._outcome === 'failed') {
        //console.log(obj)
        return findUri(obj);
    }
    else {
        return '';
    }
}
function findUri(obj) {
    for (var key in obj) {
        if (key === '_uri') {
            return obj[key];
        }
        else if (typeof obj[key] === 'object') {
            var result = findUri(obj[key]);
            if (result) {
                return result;
            }
        }
    }
    return '';
}
function evaluateScore(rulesNotFollowed, guideLineType) {
    if (isJsonEmpty === true) {
        console.log("Evaluation failed for the website");
        return 0;
    }
    return ruleCount[guideLineType] - rulesNotFollowed;
}
exports.evaluateScore = evaluateScore;
function toPercent(value, guideLineType) {
    var returnValue = 0.0;
    try {
        returnValue = parseFloat(((value / ruleCount[guideLineType]) * 100).toFixed(2));
    }
    catch (e) {
        console.error("toPercent error:", e);
        console.error("Setting Return Value to 0");
        returnValue = 0.0;
        return returnValue;
    }
    finally {
        return returnValue;
    }
}
exports.toPercent = toPercent;
