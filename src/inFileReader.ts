import * as fs from "fs";

const readFile = (path: string) => fs.readFileSync(path, "utf8").split("\n");

export const inputReadNumbers = (path: string): number[] => readFile(path).map(Number);

export class Navigation {
    direction: string;
    move: number;
}

export const inputReadNavigations = (path: string): Array<Navigation> => {

    const read = readFile(path).map(String);
    let nav = new Array<Navigation>();
    read.forEach(element => {

        var n = new Navigation();
        if (element.startsWith("forward")) {
            n.direction = "F";
            n.move = parseInt(element.substring("forward".length).trim());
        }
        else if (element.startsWith("down")) {
            n.direction = "D";
            n.move = parseInt(element.substring("down".length).trim());
        }
        else if (element.startsWith("up")) {
            n.direction = "U";
            n.move = parseInt(element.substring("up".length).trim());
        }
        nav.push(n);
    });
    return nav;
}