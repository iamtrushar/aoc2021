import { inputReadString } from "../inFileReader";
import { Counter, Instruction } from "./Instruction";

const inputByLine = inputReadString("./src/day14/input.txt");
let rows: Array<string> = new Array<string>();
inputByLine.forEach(row => {
    rows.push(row.indexOf('\r') !== -1 ? row.substring(0, row.length - 1) : row)
});

part();

function part(): void {

    const initialInput = rows[0];

    let instructions = Array<Instruction>();
    rows.forEach((e, index) => {

        if (index > 1) {
            const array = e.split(" -> ");
            instructions.push(new Instruction(array[0], array[1]));
        }

    });


    let modifiedStrain = "";
    let steps = 10;
    while (steps-- > 0) {

        let elastic = getPolymerTemplate(modifiedStrain === "" ? initialInput : modifiedStrain);
        modifiedStrain = "";
        elastic.forEach(e => {

            let find = instructions.filter(p => p.match === e);
            if (find.length > 0) {

                modifiedStrain = modifiedStrain.endsWith(e[0])
                    ? modifiedStrain + (find[0].inject + e[1])
                    : modifiedStrain + (e[0] + find[0].inject + e[1]);
            }
        });
    }

    console.log(`B ${modifiedStrain.match(/B/g).length}`);
    console.log(`H ${modifiedStrain.match(/H/g).length}`);
    console.log(modifiedStrain.length);

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
    console.log(max - min);
    //console.log(countChar(modifiedStrain, "H"));


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