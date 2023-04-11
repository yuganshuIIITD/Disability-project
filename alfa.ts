import { Audit } from "@siteimprove/alfa-act";
import { Scraper } from "@siteimprove/alfa-scraper";
import rules from "@siteimprove/alfa-rules";

/**
 * Dictionary for Alfa Rules
 */
let rulesDictionary: { [key: string]: string[] } = {
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
const ALFA_ALL_RULES = 35;
let wcagAlfaDictionary: { [key: string]: string } = {
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
}

let ruleCount: { [key: string]: number } = { 'A': 17, 'AA': 28, 'AAA': 35, 'InGuideline': 22 }
let indianGuidelinesSet: string[] = ['1.1.1',
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
]

var isJsonEmpty = true;
let rulesNotFollowedSet = new Set<string>();
var makeSet: any = []

async function evaluateUrlAlfa(urlInput: string, guideLineType: string): Promise<any[]> {
  await Scraper.with(async (scraper) => {
    var outcomes;
    isJsonEmpty = true;
    for (const input of await scraper.scrape(urlInput)) {
      outcomes = await Audit.of(input, rules).evaluate();
      //console.log("Input: ", input)
      //console.log("Rules: ", rules)
    }
    //console.log(typeof outcomes)
    if (outcomes !== undefined) {
      isJsonEmpty = false;
      const values = [...outcomes]
      console.log("Outcome Defined")
      values.forEach((jsonObj: any) => {
        //console.log(jsonObj)
        if (findUriForFailed(jsonObj) !== '') {
          rulesDictionary[findUriForFailed(jsonObj)].forEach((element) => {
            if (element !== 'NULL') {
              if (wcagAlfaDictionary[element] === 'A') {
                rulesNotFollowedSet.add(element)
              } else if ((guideLineType === 'AA' || guideLineType === 'AAA') && wcagAlfaDictionary[element] === 'AA') {
                rulesNotFollowedSet.add(element)
              } else if (guideLineType === 'AAA' && wcagAlfaDictionary[element] === 'AAA') {
                rulesNotFollowedSet.add(element)
              } else if (guideLineType === 'InGuideline' && indianGuidelinesSet.includes(element)) {
                rulesNotFollowedSet.add(element)
              }
            }
          })
        }
      })
      makeSet = [...rulesNotFollowedSet]
      //console.log(makeSet)

      //   for (let key of Object.keys(values)) {
      //     console.log(values[key]);
      // }
      //loopKeys(values);
    } 
    else{
      console.log("Outcome undefined")
    }
  });
  //console.log("returning already",makeSet)
  return makeSet;
}

// function getSetOfFailedRules(outcomes:any):Set<string>{

// }

function findUriForFailed(obj: any): string {
  if (obj._outcome === 'failed') {
    //console.log(obj)
    return findUri(obj);
  }
  else {
    return '';
  }
}

function findUri(obj: any): string {
  for (const key in obj) {
    if (key === '_uri') {
      return obj[key];
    } else if (typeof obj[key] === 'object') {
      const result = findUri(obj[key]);
      if (result) {
        return result;
      }
    }
  }
  return '';

}

function evaluateScore(rulesNotFollowed: number, guideLineType: string): number {
  if (isJsonEmpty === true) {
    console.log("Evaluation failed for the website")
    return 0;
  }
  return ruleCount[guideLineType] - rulesNotFollowed
}

function toPercent(value: number, guideLineType: string): number {
  var returnValue: number = 0.0;
  try {
    returnValue = parseFloat(((value / ruleCount[guideLineType]) * 100).toFixed(2));
  } catch (e) {
    console.error("toPercent error:", e);
    console.error("Setting Return Value to 0");
    returnValue = 0.0;
    return returnValue;
  } finally {
    return returnValue;
  }
}

export { evaluateUrlAlfa, evaluateScore, toPercent }