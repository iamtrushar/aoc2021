import * as fs from "fs";

export function inputReadNumbers(path: string): number[] {
    const input: string = fs.readFileSync(path, "utf8");
    return input.split("\n").map(Number);
}

export class Navigation {
    direction: string;
    move: number;
}

export function inputReadNavigations(path: string): Array<Navigation> {
    const input: string = fs.readFileSync(path, "utf8");
    const read =  input.split("\n").map(String);

    let nav = new Array<Navigation>();

    read.forEach(element => {

        var n =new Navigation();
        if(element.startsWith("forward")){
            n.direction = "F";
            n.move = parseInt(element.substring("forward".length).trim());
        }
        else if(element.startsWith("down")){
            n.direction = "D";
            n.move = parseInt(element.substring("down".length).trim());
        }
        else if(element.startsWith("up")){
            n.direction = "U";
            n.move = parseInt(element.substring("up".length).trim());
        }
        nav.push(n);
    });

    return nav;
}