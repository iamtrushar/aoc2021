import { inputReadString } from "../inFileReader";
import { sortNumbers } from "../common";

const inputByLine = inputReadString("./src/day10/input.txt");
let delimiterRows: Array<string> = new Array<string>();
inputByLine.forEach(row => {
    delimiterRows.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
});

let inCompleteDelimiterRows: Array<string> = new Array<string>();

console.log(`Part 1, answer : ${part1()}`);
console.log(`Part 2, answer : ${part2()}`);


function part1(): number {

    let brace = new Array<string>();
    let sqBracket = new Array<string>();
    let parenthesis = new Array<string>();
    let angleBracket = new Array<string>();

    const openDelimiter = ['{', '[', '(', '<'];
    let openDelimiters = new Array<string>();
    delimiterRows.forEach(element => {

        for (let i = 0; i < element.length; i++) {

            const current = element[i];
            if (openDelimiter.indexOf(current) !== -1) {
                openDelimiters.push(current);
            }
            else {
                const last = openDelimiters.pop();
                if (!canClose(last, current)) {

                    if (current === "}") {
                        brace.push(current);
                    }
                    else if (current === "]") {
                        sqBracket.push(current);
                    }
                    else if (current === ">") {
                        angleBracket.push(current);
                    }
                    else if (current === ")") {
                        parenthesis.push(current);
                    }
                    break;
                }

            }

            if (i + 1 == element.length) {
                inCompleteDelimiterRows.push(element);
            }
        }
    });

    return (parenthesis.length * 3) + (sqBracket.length * 57) + (brace.length * 1197) + (angleBracket.length * 25137);
}

function canClose(last: string, current: string): boolean {

    if (last === "{" && current === "}") {
        return true;
    }
    else if (last === "[" && current === "]") {
        return true;
    }
    else if (last === "<" && current === ">") {
        return true;
    }
    else if (last === "(" && current === ")") {
        return true;
    }
    return false;
}

function part2(): number {

    let scores = new Array<number>();
    const openDelimiter = ['{', '[', '(', '<'];
    let openDelimiters = new Array<string>();

    inCompleteDelimiterRows.forEach(element => {

        let closeDelimiters = new Array<string>();
        for (let i = 0; i < element.length; i++) {

            const current = element[i];
            if (openDelimiter.indexOf(current) !== -1) {
                openDelimiters.push(current);
            }
            else {
                openDelimiters.pop();
            }
        }

        const len = openDelimiters.length;
        for (let i = 0; i < len; i++) {

            const current = openDelimiters.pop();
            if (current === "{") {
                closeDelimiters.push(current);
            }
            else if (current === "[") {
                closeDelimiters.push(current);
            }
            else if (current === "<") {
                closeDelimiters.push(current);
            }
            else if (current === "(") {
                closeDelimiters.push(current);
            }
        }

        let score = 0;
        closeDelimiters.forEach(element => {
            const c = getDelimiterValue(element);
            score = (score * 5)
            score += c;
        });

        scores.push(score);
    });


    const sortedScores = scores.sort(sortNumbers);
    const index = sortedScores.length/2;
    const mid = sortedScores[index];

    return  mid ? mid: sortedScores[index - 0.5];
}

function getDelimiterValue(current: string): number {

    if (current === "{") {
        return 3;
    }
    else if (current === "[") {
        return 2;
    }
    else if (current === "<") {
        return 4;
    }
    else if (current === "(") {
        return 1;
    }
}

