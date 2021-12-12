import { inputReadString } from "../inFileReader";
import { Location } from "./common";

const inputByLine = inputReadString("./src/day8/input.txt");

let signals: string[] = new Array<string>();
let outputs: string[] = new Array<string>();
inputByLine.forEach(element => {

    const i = element.split("|");
    //signal
    const s = i[0].split(" ").filter(x => x);
    s.forEach(x => signals.push(x.endsWith("\r") ? x.substring(0, x.length - 1) : x));

    //output
    const o = i[1].split(" ").filter(x => x);
    o.forEach(x => outputs.push(x.endsWith("\r") ? x.substring(0, x.length - 1) : x));
});


// unique digits segment count 1, 4, 7, or 8
const digit1 = 2;
const digit4 = 4;
const digit7 = 3;
const digit8 = 7;
const digits = [digit1, digit4, digit7, digit8];

console.log(`Part 1, answer : ${part1(outputs)}`);
console.log(`Part 2, answer : ${part2(signals, outputs)}`);

function part1(outputsIn: Array<string>): number {

    const grouped = groupByArray(outputsIn, "length");

    let sum = 0;
    grouped.forEach((digit: { key: number; values: string[]; }) => {
        if (digits.indexOf(digit.key) != -1) {
            sum = sum + digit.values.length;
        }
    });
    return sum;
}




function part2(signalsIn: Array<string>, outputsIn: Array<string>): string {

    //     0   1   2 
    //0     (0,1)
    //1 (1,0)    (1,2)
    //2      (2,1)
    //3 (3,0)    (3,2)
    //4      (4,1)
    let formDigit = new Array<Location>();
    for (let i = 0; i < 5; i++) {
        formDigit.push(new Location(i, 0, '.'));
    }

    const grouped = groupByArray(signalsIn, "length");
    grouped.forEach((digit: { key: number; values: string[]; }) => {
        if (digits.indexOf(digit.key) != -1) {

            const item = digit.values[0];
            if (digit.key === digit1) {
                formDigit[1].char = item[0];
                formDigit[1].y = 2;
                formDigit[3].char = item[1];
                formDigit[3].y = 2;
            }
            else if (digit.key === digit4) {
                formDigit[1].char = item[0];
                formDigit[1].y = 0;
                formDigit[1].char = item[1];
                formDigit[1].y = 2;
                formDigit[2].char = item[2];
                formDigit[2].y = 1;
                formDigit[4].char = item[3];
                formDigit[4].y = 1;
            }
            else if (digit.key === digit7) {
                formDigit[0].char = item[0];
                formDigit[0].y = 1;
                formDigit[1].char = item[0];
                formDigit[1].y = 2;
                formDigit[3].char = item[1];
                formDigit[3].y = 2;
            }
            else if (digit.key === digit8) {

                formDigit[0].char = item[0];
                formDigit[0].y = 1;

                formDigit[1].char = item[1];
                formDigit[0].y = 1;
                formDigit[1].char = item[2];
                formDigit[2].y = 1;

                formDigit[2].char = item[3];
                formDigit[1].y = 1;

                formDigit[3].char = item[4];
                formDigit[0].y = 1;
                formDigit[3].char = item[5];
                formDigit[1].y = 1;

                formDigit[4].char = item[6];
                formDigit[1].y = 1;
            }
        }
    });

    const formedDigits = Array<string>();
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 3, 0) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)) // thats 0
    formedDigits.push(findChar(formDigit, 1, 2) + findChar(formDigit, 3, 2)); // thats 1
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 0) + findChar(formDigit, 4, 1)); // thats 2
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)); // thats 3
    formedDigits.push(findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2)) // thats 4
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)) // thats 5
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 0) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)) // thats 6
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 2) + findChar(formDigit, 3, 2)) // thats 7
    formedDigits.push(findChar(formDigit, 0, 1) + findChar(formDigit, 1, 0) + findChar(formDigit, 1, 2) + findChar(formDigit, 2, 1) + findChar(formDigit, 3, 0) + findChar(formDigit, 3, 2) + findChar(formDigit, 4, 1)) // thats 8

    let result = "";
    signalsIn.forEach(signal => {
        result += findNumber(signal, formedDigits);
    });

    return result;
}

function findChar(formedDigit: Array<Location>, x: number, y: number): string {
    const value = formedDigit.filter(e => e.x === x && e.y === y)[0];
    return value ? value.char : "";
}

function findNumber(signal: string, formedDigits: Array<string>): string {

    let digit = "";
    for (let i = 0; i < formedDigits.length; i++) {
        digit += (signal === formedDigits[i]) ? i.toString() : "";
    }

    return digit;
}

function groupByArray(xs, key) {
    return xs.reduce(function (rv, x) {
        let v = key instanceof Function ? key(x) : x[key];
        let el = rv.find((r) => r && r.key === v);
        if (el) {
            el.values.push(x);
        }
        else {
            rv.push({ key: v, values: [x] });
        }
        return rv;
    }, []);
}