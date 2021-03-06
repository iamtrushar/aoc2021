import { readFile } from "../inFileReader";

export class Navigation {
    direction: string;
    move: number;
}

export const inputReadNavigations = (path: string): Array<Navigation> => {

    const read = readFile(path, "\n").map(String);
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