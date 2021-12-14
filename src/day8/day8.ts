import { inputReadString } from "../inFileReader";
import { Location } from "./Location";
import { caseInsensitiveSort , groupByArray} from "../common";

const inputByLine = inputReadString("./src/day8/input.txt");

// unique digits segment count 1, 4, 7, or 8
const digit1 = 2;
const digit4 = 4;
const digit7 = 3;
const digit8 = 7;
const digits = [digit1, digit4, digit7, digit8];

console.log(`Part 1, answer : ${part1()}`);
console.log(`Part 2, answer : ${part2()}`);


function part1(): number {

    let outputs: string[] = new Array<string>();
    inputByLine.forEach(element => {

        const i = element.split("|");
        //output
        const o = i[1].split(" ").filter(x => x);
        o.forEach(x => outputs.push(x.endsWith("\r") ? x.substring(0, x.length - 1) : x));

    });

    const grouped = groupByArray(outputs, "length");
    let sum = 0;
    grouped.forEach((digit: { key: number; values: string[]; }) => {
        if (digits.indexOf(digit.key) != -1) {
            sum = sum + digit.values.length;
        }
    });
    return sum;
}


function part2(): number {

    // non-unique segment counts for digits
    const digit0 = 6; // same segments for 6 & 9
    const digit5 = 5; // same segments for 3

    let signalsIn: string[];
    let outputsIn: string[];

    let sum: number = 0;

    inputByLine.forEach(element => {

        signalsIn = new Array<string>();
        outputsIn = new Array<string>();

        const i = element.split("|");
        const s = i[0].split(" ").filter(x => x);
        s.forEach(x => signalsIn.push(x.endsWith("\r") ? x.substring(0, x.length - 1) : x));

        const o = i[1].split(" ").filter(x => x);
        o.forEach(x => outputsIn.push(x.endsWith("\r") ? x.substring(0, x.length - 1) : x));

        //     0   1   2 
        //0     (0,1)
        //1 (1,0)    (1,2)
        //2      (2,1)
        //3 (3,0)    (3,2)
        //4      (4,1)
        let formDigit = new Array<Location>();
        const grouped = groupByArray(signalsIn, "length");

        // get 1
        const one: { key: number; values: string[]; } = grouped.filter(x => x.key == digit1)[0];

        // get 8
        const eight: { key: number; values: string[]; } = grouped.filter(x => x.key == digit8)[0];

        // get 7 
        const seven: { key: number; values: string[]; } = grouped.filter(x => x.key == digit7)[0];
        if (one && seven) {

            const item = seven.values[0];
            let unMatched = unMatchedSegmentsFromSmaller(item, one.values[0]);
            if (findChar(formDigit, 0, 1) === "") { formDigit.push(new Location(0, 1, unMatched)); } // one segment is confirmed
        }

        // get 4
        let unMatchedFour: string = "";
        const four: { key: number; values: string[]; } = grouped.filter(x => x.key == digit4)[0];
        if (four) {

            const item = four.values[0];
            unMatchedFour = unMatchedSegmentsFromSmaller(item, seven.values[0]);
        }


        // find potential 0
        const hasZero: { key: number; values: string[]; } = grouped.filter(x => x.key == digit0)[0];
        if (hasZero) {

            for (let i = 0; i < hasZero.values.length; i++) {

                let potentialZero = hasZero.values[i];
                const unMatched = unMatchedSegmentsFromSmaller(eight.values[0], potentialZero);
                if (unMatched.length === 1) {

                    if (four.values[0].indexOf(unMatched) !== -1  // is found in 4
                        && seven.values[0].indexOf(unMatched) === -1
                        && one.values[0].indexOf(unMatched) === -1) {

                        if (findChar(formDigit, 2, 1) === "") { formDigit.push(new Location(2, 1, unMatched)); }
                        break;
                    }
                }
            }

            unMatchedFour = unMatchedSegmentsFromSmaller(unMatchedFour, formDigit.map(x => x.char).join(""));
            if (unMatchedFour.length === 1) {
                
                if (findChar(formDigit, 1, 0) === "") { formDigit.push(new Location(1, 0, unMatchedFour)); }
            }

            if (four && seven && findChar(formDigit, 2, 1) !== "") {

                // get potential 5
                const hasFive: { key: number; values: string[]; } = grouped.filter(x => x.key == digit5)[0];
                if (hasFive) {

                    for (let i = 0; i < hasFive.values.length; i++) {

                        let potentialFive = hasFive.values[i];
                        let unMatchedFive = unMatchedSegmentsFromSmaller(potentialFive, four.values[0]);
                        unMatchedFive = unMatchedSegmentsFromSmaller(unMatchedFive, seven.values[0]);
                        unMatchedFive = unMatchedSegmentsFromSmaller(unMatchedFive, one.values[0]);
                        if (unMatchedFive.length === 1) {

                            if (findChar(formDigit, 4, 1) === "") { formDigit.push(new Location(4, 1, unMatchedFive)); }
                            else { formDigit.filter(p => p.x == 4 && p.y == 1)[0].char = unMatchedFive; }

                            unMatchedFive = unMatchedSegmentsFromSmaller(potentialFive, formDigit.map(x => x.char).join(""));
                            if (unMatchedFive.length === 1) {

                                if (findChar(formDigit, 3, 2) === "") { formDigit.push(new Location(3, 2, unMatchedFive)); }
                                else { formDigit.filter(p => p.x == 3 && p.y == 2)[0].char = unMatchedFive; }

                                unMatchedFive = unMatchedSegmentsFromSmaller(one.values[0], formDigit.map(x => x.char).join(""));
                                if (unMatchedFive.length === 1) {

                                    if (findChar(formDigit, 1, 2) === "") { formDigit.push(new Location(1, 2, unMatchedFive)); }
                                    else { formDigit.filter(p => p.x == 1 && p.y == 2)[0].char = unMatchedFive; }
                                    break;
                                }
                            }
                        }
                    }

                    if (findChar(formDigit, 4, 1) !== "") {

                        for (let i = 0; i < hasFive.values.length; i++) {

                            let lastSeg = hasFive.values[i];
                            let last = unMatchedSegmentsFromSmaller(lastSeg, formDigit.map(x => x.char).join(""));
                            last = unMatchedSegmentsFromSmaller(last, four.values[0]);
                            last = unMatchedSegmentsFromSmaller(last, seven.values[0]);
                            last = unMatchedSegmentsFromSmaller(last, one.values[0]);
                            if (last.length === 1) {
                                if (findChar(formDigit, 3, 0) === "") { formDigit.push(new Location(3, 0, last)); }
                                break;
                            }
                        }
                    }
                }

            }
        }

        const formedDigits = Array<string>();
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 3, 0) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 0
        formedDigits.push(findChar(formDigit, 1, 2) + findChar(formDigit, 3, 2)); // thats 1
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 0) + findChar(formDigit, 4, 1)); // thats 2
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 3
        formedDigits.push(findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2));// thats 4
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 5
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 0) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 6
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 2) + findChar(formDigit, 3, 2)); // thats 7
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 0) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 8
        formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 9

        let result = "";
        outputsIn.forEach(signal => {
            result += findNumber(signal, formedDigits);
        });

        sum += parseInt(result);
    });

    return sum;
}


function unMatchedSegmentsFromSmaller(smaller: string, bigger: string) {

    const a = Array.from(smaller).sort(caseInsensitiveSort);
    const b = Array.from(bigger).sort(caseInsensitiveSort);
    let result = "";

    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) === -1) {
            result += a[i];
        }
    }
    return result;
}

function findChar(formedDigit: Array<Location>, x: number, y: number): string {

    const value = formedDigit.filter(e => e.x === x && e.y === y)[0];
    return value ? value.char : "";
}

function findNumber(signal: string, formedDigits: Array<string>): string {

    let digit = "";
    const s = Array.from(signal).sort(caseInsensitiveSort).join("");
    for (let i = 0; i < formedDigits.length; i++) {

        let d = Array.from(formedDigits[i]).sort(caseInsensitiveSort).join("");
        if (s === d) {
            digit = i.toString();
            break;
        }

    }

    return digit;
}

