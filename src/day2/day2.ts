import { inputReadNavigations, Navigation } from "./navigation";

const inputByLine = inputReadNavigations("./src/day2/input.txt");
console.log(`Part 1, answer: ${part1(inputByLine)}`);
console.log(`Part 2, answer: ${part2(inputByLine)}`);


function part1(report: Array<Navigation>): number {

    let forward = 0;
    let depth = 0;
    let vertical = "";

    report.forEach(element => {

        if (element.direction === "F") {

            forward = forward + element.move;
        }
        else {

            if (vertical === "") { vertical = element.direction; }
            depth = (element.direction === vertical)
                ? depth + element.move
                : depth - element.move;
        }
    });
    return (forward * depth);
}


function part2(report: Array<Navigation>): number {

    let forward = 0;
    let depth = 0;
    let aim = 0;
    let vertical = "";

    report.forEach(element => {

        if (element.direction === "F") {

            forward = forward + element.move;
            if (aim !== 0) { depth = depth + (element.move * aim); }
        }
        else {

            if (vertical === "") { vertical = element.direction; }
            aim = element.direction === vertical && element.direction == "D"
                ? aim + element.move
                : aim = aim - element.move;
        }
    });
    return (forward * depth);
}