import { inputReadString } from "../inFileReader";
import { Coordinate } from "./Coordinates";

const inputByLine = inputReadString("./src/day5/input.txt");
parts(inputByLine);


function parts(inCoordinates: string[]): void {

    let coordinates = new Array<Coordinate>();
    let hSegCoordinates = new Array<Coordinate>();
    let vSegCoordinates = new Array<Coordinate>();
    let dSegCoordinates = new Array<Coordinate>();

    inCoordinates.forEach(element => {
        const split = element.split(/\s->\s/);
        const start = split[0].split(',').map(Number);
        const end = split[1].split(',').map(Number);

        const s = new Coordinate(start[0], start[1]);
        const e = new Coordinate(end[0], end[1]);

        coordinates.push(s);
        coordinates.push(e);

        if (s.x === e.x) { // vertical

            let startValue: number = 0;
            let endValue: number = 0;
            if (s.y < e.y) {
                startValue = s.y;
                endValue = e.y;
            }
            else {
                startValue = e.y;
                endValue = s.y;
            }

            for (let i = startValue; i <= endValue; i++) {
                vSegCoordinates.push(new Coordinate(s.x, i));
            }
        }
        else if (s.y === e.y) { // horizontal

            let startValue: number = 0;
            let endValue: number = 0;
            if (s.x < e.x) {
                startValue = s.x;
                endValue = e.x;
            }
            else {
                startValue = e.x;
                endValue = s.x;
            }

            for (let i = startValue; i <= endValue; i++) {
                hSegCoordinates.push(new Coordinate(i, s.y));
            }
        }
        else { // diagonal

            let startValueX: number = 0;
            let endValueX: number = 0;
            let startValueY: number = 0;
            let endValueY: number = 0;

            // keep moving direction down
            if (s.x < e.x) {
                startValueX = s.x;
                endValueX = e.x;
                startValueY = s.y;
                endValueY = e.y;
            }
            else {
                startValueX = e.x;
                endValueX = s.x;
                startValueY = e.y;
                endValueY = s.y;
            }

            let tempGrid = new Array<Coordinate>();
            let i = startValueX;
            let j = startValueY;

            if (startValueY > endValueY) { // moving direction left ?
                for (; i <= endValueX && j >= endValueY; i++, j--) {
                    tempGrid.push(new Coordinate(i,j));
                }

                if (i == (endValueX + 1) && j == (endValueY - 1)) { // validate move is one step by match end value
                    tempGrid.forEach(e => { dSegCoordinates.push(e) });
                }
            }
            else {
                for (; i <= endValueX && j <= endValueY; i++, j++) {
                    tempGrid.push(new Coordinate(i,j));
                }

                if (i == (endValueX + 1) && j == (endValueY + 1)) { // validate move is one step by match end value
                    tempGrid.forEach(e => { dSegCoordinates.push(e) });
                }
            }
        }
    });


    let grid = getGrid(coordinates);

    grid = updateGrid(hSegCoordinates, grid);
    grid = updateGrid(vSegCoordinates, grid);
    console.log(`Part 1, answer: ${coutOverlaps(grid)}`);
    
    grid = updateGrid(dSegCoordinates, grid);
    console.log(`Part 2, answer: ${coutOverlaps(grid)}`);
}


function coutOverlaps(grid: Array<Array<String>>): number {
    let count = 0;
    grid.forEach(rows => {
        rows.forEach(columns => {
            if (columns !== ".") {
                const position = parseInt(columns.toString());
                if (position >= 2) {
                    count++;
                }
            }
        })
    });

    return count;
}

function updateGrid(coordinates: Array<Coordinate>, grid: Array<Array<String>>): Array<Array<String>> {
    let updatedGrid = new Array<Array<String>>();
    updatedGrid = grid;

    coordinates.forEach(element => {
        const value = updatedGrid[element.y][element.x];
        updatedGrid[element.y][element.x] = value === "." ? "1" : (parseInt(value.toString()) + 1).toString();
    });

    return updatedGrid;
}

function getGrid(coordinates: Array<Coordinate>): Array<Array<String>> {
    const h = coordinates.map(p => {
        let c = Number();
        c = p.x;
        return c;
    });
    const hMax = Math.max(...h);
    const v = coordinates.map(p => {
        let c = Number();
        c = p.y;
        return c;
    });
    const vMax = Math.max(...v);

    let grid = new Array<Array<String>>();
    for (let i = 0; i <= hMax; i++) {
        let position = new Array<String>();

        for (let j = 0; j <= vMax; j++) {
            position.push('.')
        }
        grid.push(position);
    }

    return grid;
}
