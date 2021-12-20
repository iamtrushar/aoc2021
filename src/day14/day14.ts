import { inputReadString } from "../inFileReader";
import { Counter, Instruction } from "./Instruction";

const inputByLine = inputReadString("./src/day14/input.txt");
let rows: Array<string> = new Array<string>();
inputByLine.forEach(row => {
    rows.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
});

console.log(`Part 1, answer : ${part(10)}`);
console.log(`Part 2, answer : ${part(40)}`);

function part(steps: number): number {

    const initialInput = rows[0];

    let instructions = Array<Instruction>();
    rows.forEach((e, index) => {

        if (index > 1) {
            const array = e.split(" -> ");
            instructions.push(new Instruction(array[0], array[1]));
        }
    });


    let modifiedStrain = "";
    while (steps-- > 0) {

        const elastic = getPolymerTemplate(modifiedStrain === "" ? initialInput : modifiedStrain);
        modifiedStrain = "";
        elastic.forEach(e => {

            const find = instructions.filter(p => p.match === e);
            if (find.length > 0) {

                modifiedStrain = modifiedStrain.endsWith(e[0])
                    ? modifiedStrain + (find[0].inject + e[1])
                    : modifiedStrain + (e[0] + find[0].inject + e[1]);
            }
        });
        console.log(modifiedStrain.length);
    }

    let uniquePolymer = Array<string>();
    instructions.forEach(e => {
        if (uniquePolymer.indexOf(e.inject) === -1) {
            uniquePolymer.push(e.inject);
        }
    });

    let counters = new Array<Counter>();
    uniquePolymer.forEach(element => {
        counters.push(new Counter(element, countChar(modifiedStrain, element)));
    });

    const max = counters.filter(x => x.count === Math.max(...counters.map(x => x.count)))[0].count;
    const min = counters.filter(x => x.count === Math.min(...counters.map(x => x.count)))[0].count;
    return (max - min);
}

function countChar(polymerChain: string, matchChar: string): number {
    return polymerChain.match(new RegExp(matchChar, 'g')).length;
}

function getPolymerTemplate(initialInput: string): Array<string> {

    const inputs = initialInput.split("");
    let elastic = new Array<string>();
    inputs.forEach((element, index) => {
        if (index + 1 < inputs.length) {
            elastic.push(element + inputs[index + 1]);
        }
    });

    return elastic;
}