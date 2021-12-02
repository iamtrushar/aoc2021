import { inputReadNumbers } from "../inFileReader";

const inputByLine = inputReadNumbers("./src/day1/input.txt");
console.log(`Part 1, answer: ${part1(inputByLine)}`);
console.log(`Part 2, answer: ${part2(inputByLine)}`);


function part1(report: number[]): number {

    var previous: number = 0;
    var count: number = 0;

    for (const { value } of report.map((value) => ({ value }))) {

        if (previous === 0) {
            previous = value;
        }
        else if (previous < value) {
            ++count;
        }
        previous = value;
    }
    return count;
}

function part2(report: number[]) {

    let previous: number = 0;
    let hold: number[] = new Array<number>();

    for (let index = 0; index < report.length; index++) {

        previous = report[index]
            + (index + 1 < report.length ? report[index + 1] : 0)
            + (index + 2 < report.length ? report[index + 2] : 0);
        hold.push(previous);
    }
    return part1(hold);
}