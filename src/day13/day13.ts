import { inputReadString } from "../inFileReader";
import { GridLocation } from "../day13/GridLocation";
import { sortNumbers } from "../common";

const inputByLine = inputReadString("./src/day13/input.txt");
let points: Array<string> = new Array<string>();
inputByLine.forEach(row => {
    points.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
});

console.log(`Part 1, answer : ${part1()}`);
//console.log(`Part 2, answer : ${part2()}`);

function part1(): number {

    let locations = new Array<GridLocation>();
    let instructions = new Array<GridLocation>();

    for (let i = 0; i < points.length; i++) {

        const c = points[i];
        const items = c.split(",");
        if (items.length === 2) {
            locations.push(new GridLocation(parseInt(items[1]), parseInt(items[0]), "#"));
        }
        else {
            if (c === "") {
                continue;
            }

            if (c.startsWith("fold along y=")) {
                instructions.push(new GridLocation(-1, parseInt(c.substring("fold along y=".length)), "-"));
            }
            else {
                instructions.push(new GridLocation(parseInt(c.substring("fold along x=".length)), -1, "-"));
            }
        }
    }

    const xMax = Math.max(...locations.map(l => l.x));
    const yMax = Math.max(...locations.map(l => l.y));

    // for (let i = 0; i <= xMax; i++) {
    //     for (let j = 0; j <= yMax; j++) {
    //         if (locations.findIndex(l => l.x === i && l.y === j) === -1) {
    //             locations.push(new GridLocation(i, j, "."));
    //         }
    //     }
    // }


    console.log(`Previous: ${locations.filter(l => l.reading === "#").length}`);
    for (let i = 0; i < instructions.length; i++) {

        let element = instructions[i];
        if (element.y !== -1) {
            locations = foldUp(element.y, locations);
        }
        else {
            locations = foldLeft(element.x, locations);

        }

        console.log(locations.filter(l => l.reading === "#").length);
        break;
    }

    return -1;
}


function foldUp(y: number, locations: Array<GridLocation>): Array<GridLocation> {
    let firstHalf = locations.filter(l => l.x < y && l.reading === "#");
    let secondHalf = locations.filter(l => l.x > y && l.reading === "#");

    secondHalf.forEach(ele => {
        ele.x = (y - (ele.x - y));
    });

    secondHalf.forEach(ele => {
        locations.filter(p => p.x == ele.x && p.y == ele.y)[0].reading == ele.reading
    });

    let gls = new Array<GridLocation>();
    //const gl = locations.filter(l => l.x < y);
    //gl.forEach(ele => { gls.push(new GridLocation(ele.x, ele.y, ele.reading)) });

    firstHalf.forEach(ele => { gls.push(new GridLocation(ele.x, ele.y, ele.reading)) });
    secondHalf.forEach(ele => {


        if (gls.filter(p => p.x === ele.x && p.y === ele.y).length == 0) {
            gls.push(new GridLocation(ele.x, ele.y, ele.reading));
        }
        else {
            //console.log(`x:${ele.x},y${ele.y}`)
        }
    });

    return gls;
}

function foldLeft(x: number, locations: Array<GridLocation>): Array<GridLocation> {
    let leftHalf = locations.filter(l => l.y < x && l.reading === "#");
    let rightHalf = locations.filter(l => l.y > x && l.reading === "#");

    rightHalf.forEach(ele => {
        ele.y = (x - (ele.y - x));
    });

    rightHalf.forEach(ele => {
        locations.filter(p => p.x == ele.x && p.y == ele.y)[0].reading == ele.reading
    });

    let gls = new Array<GridLocation>();
    // const gl = locations.filter(l => l.y < x);
    // gl.forEach(ele => { gls.push(new GridLocation(ele.x, ele.y, ele.reading)) });

    leftHalf.forEach(ele => { gls.push(new GridLocation(ele.x, ele.y, ele.reading)) });
    rightHalf.forEach(ele => {

        if (gls.filter(p => p.x === ele.x && p.y === ele.y).length == 0) {
            gls.push(new GridLocation(ele.x, ele.y, ele.reading)) ;
        }
        else {
            //console.log(`x:${ele.x},y${ele.y}`)
        }
    });
    return gls;
}

// function checkLeft(current: Location, all: Array<Location>): Location {

//     return all.filter(p => p.x === current.x && (p.y === current.y - 1))[0]
// }

// function checkRight(current: Location, all: Array<Location>): Location {

//     return all.filter(p => p.x === current.x && p.y === (current.y + 1))[0]
// }

// function checkTop(current: Location, all: Array<Location>): Location {

//     return all.filter(p => p.x === (current.x - 1) && p.y === current.y)[0]
// }

// function checkBottom(current: Location, all: Array<Location>): Location {

//     return all.filter(p => p.x === (current.x + 1) && p.y === current.y)[0]
// }