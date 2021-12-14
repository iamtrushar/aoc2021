import { inputReadString } from "../inFileReader";
import { Location } from "../day9/Location";
import { sortNumbers } from "../common";

const inputByLine = inputReadString("./src/day9/input.txt");
let points: Array<string> = new Array<string>();
inputByLine.forEach(row => {
    points.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
});
console.log(`Part 1, answer : ${part1()}`);
console.log(`Part 2, answer : ${part2()}`);

function part1(): number {

    let locations = new Array<Location>();
    for (let i = 0; i < points.length; i++) {
        const c = points[i];
        for (let j = 0; j < c.length; j++) {
            locations.push(new Location(i, j, parseInt(c[j])));
        }
    }

    let lowest = new Array<Location>();
    for (let i = 0; i < locations.length; i++) {

        let l = getLowestValues(locations[i], locations);
        if (l) {
            lowest.push(l);
        }
    }

    let sum = 0;
    lowest.forEach(element => {
        sum += (1 + element.reading);
    });

    return sum;
}

function part2(): number {

    let locations = new Array<Location>();
    for (let i = 0; i < points.length; i++) {
        const c = points[i];
        for (let j = 0; j < c.length; j++) {
            locations.push(new Location(i, j, parseInt(c[j])));
        }
    }

    let highest = new Array<number>();
    for (let i = 0; i < locations.length; i++) {

        let l = getBasinCount(locations[i], locations);
        if (l) {
            highest.push(l);
        }
    }

    const pickThreeFromBottom = highest.sort(sortNumbers);
    if (pickThreeFromBottom.length >= 3) {
        return pickThreeFromBottom[pickThreeFromBottom.length - 1] * pickThreeFromBottom[pickThreeFromBottom.length - 2] * pickThreeFromBottom[pickThreeFromBottom.length - 3];
    }
    return -1;
}


function getLowestValues(current: Location, all: Array<Location>): Location {

    const l = checkLeft(current, all);
    const r = checkRight(current, all);
    const t = checkTop(current, all);
    const b = checkBottom(current, all);

    let positions = new Array<number>();

    if (l) { positions.push(l.reading); }
    if (r) { positions.push(r.reading); }
    if (t) { positions.push(t.reading); }
    if (b) { positions.push(b.reading); }

    let lowestValue = -1;
    for (let i = 0; i < positions.length; i++) {
        if (lowestValue === -1) {
            lowestValue = positions[i];
            continue;
        }
        if (positions[i] < lowestValue) {
            lowestValue = positions[i];
        }
    }

    return lowestValue <= current.reading ? null : current;
}

function getBasinCount(current: Location, all: Array<Location>): number {

    const l = checkLeft(current, all);
    const r = checkRight(current, all);
    const t = checkTop(current, all);
    const b = checkBottom(current, all);

    let positions = new Array<Location>();

    if (l) { positions.push(l); }
    if (r) { positions.push(r); }
    if (t) { positions.push(t); }
    if (b) { positions.push(b); }

    let lowestValue = -1;
    for (let i = 0; i < positions.length; i++) {
        if (lowestValue === -1) {
            lowestValue = positions[i].reading;
            continue;
        }
        if (positions[i].reading < lowestValue) {
            lowestValue = positions[i].reading;
        }
    }

    if (lowestValue <= current.reading) {
        return null;
    }

    let depthCollections = new Array<Location>();
    let depthCollection = new Array<Location>();
    depthCollection.push(current);

    while (true) {

        current = depthCollection.pop();
        const currentState = new Location(current.x, current.y, current.reading);
        //  current is lowest
        let currentReading = current.reading;
        let collection = new Array<Location>();
        // collect left
        for (let i = 0; i < all.length; i++) {
            let collect = checkLeft(current, all)
            if (collect && collect.reading !== 9) {
                if (collect.reading > currentReading) {
                    currentReading = collect.reading;
                    current = collect;
                    collection.push(collect);
                }
                else { break; }
            }
            else { break; }
        }


        currentReading = currentState.reading;
        current = currentState;
        // collect right
        for (let i = 0; i < all.length; i++) {
            let collect = checkRight(current, all)
            if (collect && collect.reading !== 9) {
                if (collect.reading > currentReading) {
                    currentReading = collect.reading;
                    current = collect;
                    collection.push(collect)
                }
                else { break; }
            }
            else { break; }
        }


        currentReading = currentState.reading;
        current = currentState;
        // collect top
        for (let i = 0; i < all.length; i++) {
            let collect = checkTop(current, all)
            if (collect && collect.reading !== 9) {
                if (collect.reading > currentReading) {
                    currentReading = collect.reading;
                    current = collect;
                    collection.push(collect)
                }
                else { break; }
            }
            else { break; }
        }


        currentReading = currentState.reading;
        current = currentState;
        // collect bottom
        for (let i = 0; i < all.length; i++) {
            let collect = checkBottom(current, all)
            if (collect && collect.reading !== 9) {
                if (collect.reading > currentReading) {
                    currentReading = collect.reading;
                    current = collect;
                    collection.push(collect)
                }
                else { break; }
            }
            else { break; }
        }

        collection.forEach(ele => {
            if (depthCollections.filter(e => e.x === ele.x && e.y === ele.y).length === 0) {
                depthCollection.push(ele);
                depthCollections.push(ele);
            }
        });

        if (depthCollection.length == 0) {
            break;
        }
    }

    return depthCollections.length + 1; // add 1 for the initial one
}

function checkLeft(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === current.x && (p.y === current.y - 1))[0]
}

function checkRight(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === current.x && p.y === (current.y + 1))[0]
}

function checkTop(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === (current.x - 1) && p.y === current.y)[0]
}

function checkBottom(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === (current.x + 1) && p.y === current.y)[0]
}