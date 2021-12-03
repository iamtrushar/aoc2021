import * as fs from "fs";

export const readFile = (path: string) => fs.readFileSync(path, "utf8").split("\n");

export const inputReadNumbers = (path: string): number[] => readFile(path).map(Number);

export const inputReadString = (path: string): string[] => readFile(path).map(String);