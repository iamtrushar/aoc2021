import { groupByArray } from "../common";
import { inputReadString } from "../inFileReader";
import { CavePath } from "./CavePath";

part1();
part2();


function part1(): void {

    const inputByLine = inputReadString("./src/day12/input.txt");
    let rows: Array<string> = new Array<string>();
    inputByLine.forEach(row => {
        rows.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
    });

    let pathNotataions = Array<string>();
    let paths = new Array<CavePath>();
    for (let i = 0; i < rows.length; i++) {
        const p = rows[i];
        const items = p.split('-');
        paths.push(new CavePath(items[0], items[1]));

        if (items[0] !== "start" && items[0] !== "end") {
            if (pathNotataions.indexOf(items[0]) === -1) {
                pathNotataions.push(items[0])
            }
        }

        if (items[1] !== "start" && items[1] !== "end") {
            if (pathNotataions.indexOf(items[1]) === -1) {
                pathNotataions.push(items[1])
            }
        }
    }


    // permuations
    let i = 0;
    let j = 0;
    let pathPermutations = Array<string>();
    pathNotataions.forEach(element => {
        if (pathPermutations.indexOf(element) === -1) {
            pathPermutations.push(element);
        }
    });

    let specialPaths = Array<string>();
    pathNotataions.forEach(element => {

        if (paths.filter(x => x.start === element).length > 0
            && paths.filter(x => x.end === element).length > 0) {
            // repeats 
        }
        else {
            if (specialPaths.indexOf(element) === -1) {
                specialPaths.push(element);
            }
        }
    });


    while (i < pathPermutations.length) {

        const previous = pathPermutations[i];
        while (j < pathNotataions.length) {

            const current = pathNotataions[j];
            if (current === previous) {
                j++;
                continue;
            }

            const combined = previous + current;
            const prevTwo = previous.substring(previous.length - 2);
            const currTwo = current.substring(0, 2);

            if (previous !== current // same?
                && prevTwo !== currTwo  // same two char
                // both lower case and same char
                && !(isLastTwoCharLowerCase(previous)
                    && isFirstTwoCharLowerCase(current)
                    && prevTwo === currTwo)
                // combined path is not repeated already
                && paths.map(x => x.start + x.end).filter(x => x.indexOf(combined) !== -1)
                // matches at least one path 
                && (paths.filter(x => x.start === prevTwo && x.end === currTwo).length > 0
                    || paths.filter(x => x.start === currTwo && x.end === prevTwo).length > 0)) {

                if (isFirstTwoCharLowerCase(current)) {
                    // lower case already exist in previous (combined) path, can't include it again
                    if (previous.indexOf(current) !== -1) {
                        j++;
                        continue;
                    }
                }

                if (pathPermutations.indexOf(combined) === -1) {
                    pathPermutations.push(combined);
                }
            }
            j++;
        }

        j = 0;
        i++;
    }

    let validPathPermutations = Array<string>();
    for (let i = 0; i < pathPermutations.length; i++) {

        const ele = pathPermutations[i];
        const s = ele.substring(0, 2);
        const e = ele.substring(ele.length - 2);

        if ((paths.filter(x => x.start === "start" && x.end === s).length > 0
            || paths.filter(x => x.start === s && x.end === "start").length > 0)
            && (paths.filter(x => x.start === "end" && x.end === e).length > 0
                || paths.filter(x => x.start === e && x.end === "end").length > 0)) {

            validPathPermutations.push("start-" + ele.split("").join("-") + "-end");
        }
    }

    console.log(`Answer part 1: ${validPathPermutations.length}`);

}

function part2(): void {

    const inputByLine = inputReadString("./src/day12/input.txt");
    let rows: Array<string> = new Array<string>();
    inputByLine.forEach(row => {
        rows.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
    });

    let reversePaths = new Array<CavePath>();
    let pathNotataions = Array<string>();
    let paths = new Array<CavePath>();
    for (let i = 0; i < rows.length; i++) {
        const p = rows[i];
        const items = p.split('-');
        paths.push(new CavePath(items[0], items[1]));
        reversePaths.push(new CavePath(items[1], items[0])); // reverse paths

        if (items[0] !== "start" && items[0] !== "end") {
            if (pathNotataions.indexOf(items[0]) === -1) {
                pathNotataions.push(items[0])
            }
        }

        if (items[1] !== "start" && items[1] !== "end") {
            if (pathNotataions.indexOf(items[1]) === -1) {
                pathNotataions.push(items[1])
            }
        }
    }


    // permuations
    let i = 0;
    let j = 0;
    let pathPermutations = Array<string>();
    pathNotataions.forEach(element => {
        if (pathPermutations.indexOf(element) === -1) {
            pathPermutations.push(element);
        }
    });

    while (i < pathPermutations.length) {

        const previous = pathPermutations[i];
        while (j < pathNotataions.length) {

            const current = pathNotataions[j];
            if (current === previous) {
                j++;
                continue;
            }

            const combined = previous + current;
            // const prevTwo = previous.substring(previous.length - 1);;
            // const currTwo = current.substring(0, 1);;

            const prevTwo = previous.substring(previous.length - 2);
            const currTwo = current.substring(0, 2);

            if (previous !== current // same?
                && prevTwo !== currTwo  // same two char
                // both lower case and same char
                && !(isLastTwoCharLowerCase(previous)
                    && isFirstTwoCharLowerCase(current)
                    && prevTwo === currTwo)
                // both lower case and same char
                && !(!isLastTwoCharLowerCase(previous)
                    && !isFirstTwoCharLowerCase(current)
                    && prevTwo === currTwo)
                // combined path is not repeated already
                && paths.map(x => x.start + x.end).filter(x => x.indexOf(combined) !== -1)
                // matches at least one path 
                && (paths.filter(x => x.start === prevTwo && x.end === currTwo).length > 0
                    || paths.filter(x => x.start === currTwo && x.end === prevTwo).length > 0)) {

                if (isFirstTwoCharLowerCase(current)) {
                    // lower case already exist in previous (combined) path, can't include it again

                    if (chunk(combined, currTwo.length).filter(x => x === currTwo).length > 2) {
                        j++;
                        continue;
                    }
                }

                if (pathPermutations.indexOf(combined) === -1) {

                    const array = chunk(combined, 2);
                    let count = {};
                    array.forEach(item => {
                        if (isFirstTwoCharLowerCase(item)) {
                            if (count[item]) { count[item]++; }
                            else { count[item] = 1; }
                        }
                    })

                    let counter = 0;
                    for (const [key, value] of Object.entries(count)) { if (value === 2) { counter++; } }

                    if (counter < 2) {
                        pathPermutations.push(combined);
                    }
                }
            }

            j++;
        }

        j = 0;
        i++;
    }

    console.log(`Final path permutations: ${pathPermutations.length}`);


    let validTrimmedPathPermutations = Array<string>();

    for (let i = 0; i < pathPermutations.length; i++) {

        const ele = pathPermutations[i];
        // const s = ele.substring(0, 1); 
        // const e = ele.substring(ele.length - 1);
        const s = ele.substring(0, 2);
        const e = ele.substring(ele.length - 2);

        if ((paths.filter(x => x.start === "start" && x.end === s).length > 0
            || paths.filter(x => x.start === s && x.end === "start").length > 0)
            && (paths.filter(x => x.start === "end" && x.end === e).length > 0
                || paths.filter(x => x.start === e && x.end === "end").length > 0)) {

            validTrimmedPathPermutations.push(ele); // for part 2
        }
    }

    console.log(`Answer part 2: ${validTrimmedPathPermutations.length}`);
}


function chunk(str: string, size: number) {
    return str.match(new RegExp('.{1,' + size + '}', 'g'));
}

function isLastTwoCharLowerCase(input: string) {
    //return input[input.length - 1] === input[input.length - 1].toLowerCase();
    return input[input.length - 1] === input[input.length - 1].toLowerCase()
        && input[input.length - 2] === input[input.length - 2].toLowerCase();
}

function isFirstTwoCharLowerCase(input: string) {
    //return input[0] === input[0].toLowerCase();
    return input[0] === input[0].toLowerCase()
        && input[1] === input[1].toLowerCase();
}