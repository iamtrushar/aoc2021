import { inputReadString } from "../inFileReader";
import { GridLocation } from "../day13/GridLocation";
import { sortNumbers } from "../common";

const inputByLine = inputReadString("./src/day13/input.txt");
let points: Array<string> = new Array<string>();
inputByLine.forEach(row => {
    points.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
});

console.log(part());

function part(): void {

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

    // fold instructions
    for (let i = 0; i < instructions.length; i++) {
        let element = instructions[i];
        if (element.y !== -1) {
            locations = foldUp(element.y, locations);
        }
        else {
            locations = foldLeft(element.x, locations);
        }

        if (i == 0) {
            console.log(`Part 1, answer : ${locations.filter(l => l.reading === "#").length}`);
        }
    }

    const xMax = Math.max(...locations.map(l => l.x));
    const yMax = Math.max(...locations.map(l => l.y));

    let print = Array(xMax + 1).fill(".").map(x => Array(yMax + 1).fill("."))

    for (let i = 0; i <= xMax; i++) {
        let printer = "";
        for (let j = 0; j <= yMax; j++) {

            if (locations.filter(l => l.x === i && l.y === j).length > 0) {
               printer = printer + "#";
               print[i][j] = "#";
            }
            printer = printer + " ";
        }
        console.log(printer);
    }

    console.log(`Part 2, answer (visualize in debugger instead) : ${print}`);
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
    firstHalf.forEach(ele => {
        gls.push(new GridLocation(ele.x, ele.y, ele.reading))
    });
    secondHalf.forEach(ele => {

        if (gls.filter(p => p.x === ele.x && p.y === ele.y).length == 0) {
            gls.push(new GridLocation(ele.x, ele.y, ele.reading));
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
    leftHalf.forEach(ele => { 
        gls.push(new GridLocation(ele.x, ele.y, ele.reading));
    });
    rightHalf.forEach(ele => {
        if (gls.filter(p => p.x === ele.x && p.y === ele.y).length == 0) {
            gls.push(new GridLocation(ele.x, ele.y, ele.reading));
        }
    });
    return gls;
}