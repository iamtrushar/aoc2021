import * as fs from "fs";

export const readFile = (path: string, splitBy: string) => fs.readFileSync(path, "utf8").split(splitBy);

export const inputReadNumbers = (path: string): number[] => readFile(path, "\n").map(Number);

export const inputReadString = (path: string): string[] => readFile(path, "\n").map(String);

export const inputReadSingleLineNumbers = (path: string): number[] => readFile(path, ",").map(Number);