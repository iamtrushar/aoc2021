import { inputReadString } from "../inFileReader";
import { Location } from "../day9/Location";

parts();

function parts(): void {

    const inputByLine = inputReadString("./src/day11/input.txt");
    let points: Array<string> = new Array<string>();
    inputByLine.forEach(row => {
        points.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
    });

    let locations = new Array<Location>();
    for (let i = 0; i < points.length; i++) {
        const c = points[i];
        for (let j = 0; j < c.length; j++) {
            locations.push(new Location(i, j, parseInt(c[j])));
        }
    }


    let sum = 0;
    let stepCoutner = 0;
    while (++stepCoutner) {

        let flashed = new Array<Location>();
        let flash = new Array<Location>();
        for (let i = 0; i < locations.length; i++) {

            let loc = locations[i];
            let r = loc.reading;
            if (r === 9) {
                loc.reading = 0; // set 0 for flashed
                const l = new Location(loc.x, loc.y, loc.reading);
                flash.push(l);
                flashed.push(l);
                sum++;
            }
            else {
                loc.reading++;
            }
        }


        while (flash.length !== 0) {

            let current = flash.pop();
            let adjacents = getAdjacents(current, locations);

            for (let i = 0; i < adjacents.length; i++) {

                let loc = adjacents[i];
                let r = loc.reading;
                if (r === 9) {
                    loc.reading = 0; // set 0 for flashed
                    const l = new Location(loc.x, loc.y, loc.reading);
                    flash.push(l);
                    flashed.push(l);
                    sum++;
                }
                else {
                    // do not increment already flahsed once
                    let f = flashed.filter(o => o.x === loc.x && o.y === loc.y)[0];
                    if (!f) {
                        loc.reading++;
                    }
                }
            }
        }

        if (stepCoutner == 100) {
            console.log(`Part 1, answer : ${sum}`);
        }

        if (flashed.length == 100) {
            console.log(`Part 2, answer : ${stepCoutner}`);
            break;
        }
    }


}

function getAdjacents(current: Location, all: Array<Location>): Array<Location> {

    let l = checkLeft(current, all);
    let r = checkRight(current, all);
    let t = checkTop(current, all);
    let b = checkBottom(current, all);
    let ne = checkNorthEast(current, all);
    let nw = checkNorthWest(current, all);
    let se = checkSouthEast(current, all);
    let sw = checkSouthWest(current, all);

    let positions = new Array<Location>();

    if (l) { positions.push(l); }
    if (r) { positions.push(r); }
    if (t) { positions.push(t); }
    if (b) { positions.push(b); }

    if (ne) { positions.push(ne); }
    if (nw) { positions.push(nw); }
    if (se) { positions.push(se); }
    if (sw) { positions.push(sw); }

    return positions;
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


function checkNorthEast(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === (current.x + 1) && p.y === (current.y + 1))[0]
}

function checkNorthWest(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === (current.x - 1) && p.y === (current.y + 1))[0]
}

function checkSouthEast(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === (current.x + 1) && p.y === (current.y - 1))[0]
}

function checkSouthWest(current: Location, all: Array<Location>): Location {

    return all.filter(p => p.x === (current.x - 1) && p.y === (current.y - 1))[0]
}