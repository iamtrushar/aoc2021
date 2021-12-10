import { inputReadSingleLineNumbers } from "../inFileReader";
import { PositionTracker } from "./Tracker";


const inputByLine = inputReadSingleLineNumbers("./src/day7/input.txt");
const s = inputByLine.sort(compare);

//console.log(`Part 1, answer: ${part1a(s)}`);
//console.log(`Part 2, answer : ${part1(s)}`);
//console.log(`Part 2, answer : ${part2(s)}`);
console.log(`Part 1, answer : ${parts(s, "steady")}`);
console.log(`Part 2, answer : ${parts(s, "increment")}`);


function compare(a: number, b: number) {
    if (a === b) { return 0 };
    return a < b ? -1 : 1;
}


function part1(positions: Array<number>): number {

    let tracker = new Array<PositionTracker>();
    positions.forEach(element => {

        let p = tracker.filter(x => x.position === element);
        if (p.length > 0) {
            p[0].count++;
        }
        else {
            tracker.push(new PositionTracker(element, 1));
        }
    });

    const min = tracker[0].position;
    const max = tracker[tracker.length - 1].position;


    let cost = -1;
    //let position = 0;

    for (let i = min; i < max; i++) {

        let e = tracker[i];

        if (!e) { continue; }
        let currentCost = 0;
        tracker.forEach(ele => {
            const differnce = Math.abs(e.position - ele.position);
            currentCost = currentCost + (differnce * ele.count);
        });

        if (cost === -1 || currentCost < cost) {
            cost = currentCost;
            //position = e.position;
        }
    }

    return cost;
}


function parts(positions: Array<number>, burnRate: string ): number {

    let tracker = new Array<PositionTracker>();
    positions.forEach(element => {

        let p = tracker.filter(x => x.position === element);
        if (p.length > 0) {
            p[0].count++;
        }
        else {
            tracker.push(new PositionTracker(element, 1));
        }
    });

    const min = tracker[0].position;
    const max = tracker[tracker.length - 1].position;


    let cost = -1;
    let position = 0;

    for (let i = min; i < max; i++) {

        let currentCost = 0;
        tracker.forEach(ele => {
            const differnce = Math.abs(i - ele.position);
            const burn = burnRate == "steady" ? differnce: calualteBurn(differnce);
            currentCost = currentCost + (burn * ele.count);
        });

        if (cost === -1 || currentCost < cost) {
            cost = currentCost;
            position = i;
        }
    }

    return cost;
}

function calualteBurn(differnce: number): number {

    let burn = 0;
    for (let i = 1; i <= differnce; i++) {
        burn += i;
    }
    return burn;
}