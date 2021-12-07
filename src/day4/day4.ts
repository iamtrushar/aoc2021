import { inputReadString } from "../inFileReader";
import { Space, Bingo } from "./Board";

const inputByLine = inputReadString("./src/day4/input.txt");
const allBingoBoards: Bingo[] = fillAllBoards(inputByLine);
const bingoCalls = inputByLine[0].split(',').map(Number);

console.log(`Part 1, answer: ${part1(allBingoBoards, bingoCalls)}`);
console.log(`Part 2, answer: ${part2(allBingoBoards, bingoCalls)}`);

function part1(bingos: Bingo[], readOut: number[]): number {

    const winningBoardIndex = new Array<number>();
    for (let callIndex = 0; callIndex < readOut.length; callIndex++) {

        const call = readOut[callIndex];
        play(bingos, call);
        let cardIndex = checkForWin(bingos, winningBoardIndex);
        if (cardIndex !== -1) {

            const unmarked = bingos[cardIndex].space.filter((obj => obj.marked === false));
            const sum = unmarked.reduce((accumulator, a) => accumulator + a.value, 0);
            return (sum * call);
        }
    }

    return -1;
}

function part2(bingos: Bingo[], readOut: number[]): number {

    let answer = -1;
    let winningBoardIndex = new Array<number>();

    for (let callIndex = 0; callIndex < readOut.length; callIndex++) {

        const call = readOut[callIndex];
        play(bingos, call);
        let cardIndex = checkForWin(bingos, winningBoardIndex);
        if (cardIndex !== -1) {

            const unmarked = bingos[cardIndex].space.filter((obj => obj.marked === false));
            const sum = unmarked.reduce((accumulator, a) => accumulator + a.value, 0);
            answer = sum * call;
        }
    }

    return answer;
}

function fillAllBoards(report: Array<string>): Bingo[] {

    let spaces: Space[] = new Array<Space>();
    let bingo: Bingo = new Bingo();
    let bingos: Bingo[] = new Array<Bingo>();
    let rowIndex: number = 0;
    report.forEach((line, index) => {

        if (index === 0 || line === '\r') {
            if (spaces && spaces.length !== 0) {
                rowIndex = 0;
                bingo.space = spaces;
                bingos.push(bingo);
                spaces = new Array<Space>();
                bingo = new Bingo();
            }

            return;
        }

        const row = line.split(/[ ]+/,).filter(q => q).map(Number);
        row.forEach((value, column) => {
            let s = new Space();
            s.column = column;
            s.row = rowIndex;
            s.value = value;
            s.marked = false;
            spaces.push(s);
        });

        rowIndex++;
    });

    bingo.space = spaces;
    bingos.push(bingo); // last one

    return bingos;
}

function play(bingos: Bingo[], call: number) {

    bingos.forEach((bingo, index) => {
        const spaceIndex = bingo.space.findIndex((obj => obj.value === call));
        if (spaceIndex !== -1) {
            bingo.space[spaceIndex].marked = true;
        }
    });
}

function addToWinningBoard(winningBoardIndex: number[], cardIndex: number): number[] {

    if (winningBoardIndex.indexOf(cardIndex) === -1) {
        winningBoardIndex.push(cardIndex);
    }

    return winningBoardIndex;
}

function checkForWin(bingos: Bingo[], winningBoardIndex: number[]): number {
    let lastBoard = -1;
    for (let index = 0; index < bingos.length; index++) {

        // exists
        if (winningBoardIndex.indexOf(index) !== -1) {
            continue;
        }

        const bingo = bingos[index];
        const filled = bingo.space.filter((obj => obj.marked === true));

        if (filled.length >= 5) { // minumum fill

            // horizontal
            for (let r = 0; r < 5; r++) {
                let win = true;
                for (let c = 0; c < 5; c++) {
                    if (filled.filter(x => x.column === c && x.row == r).length !== 1) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    lastBoard = index;
                    winningBoardIndex = addToWinningBoard(winningBoardIndex, index);
                }
            }

            // vertical
            for (let c = 0; c < 5; c++) {
                let win = true;
                for (let r = 0; r < 5; r++) {
                    if (filled.filter(x => x.column === c && x.row == r).length !== 1) {
                        win = false;
                        break;
                    }
                }
                if (win) {
                    lastBoard = index;
                    winningBoardIndex = addToWinningBoard(winningBoardIndex, index);
                }
            }
        }
    }

    return lastBoard;
}