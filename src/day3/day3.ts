import { inputReadString } from "../inFileReader";
import { Readings } from "./readings";

const inputByLine = inputReadString("./src/day3/input.txt");
console.log(`Part 1, answer: ${part1(inputByLine)}`);
console.log(`Part 2, answer: ${part2(inputByLine)}`);


function part1(report: Array<string>): number {

    const [bit0, bit1, bit2, bit3, bit4, bit5, bit6, bit7, bit8, bit9, bit10, bit11] = getBits(report);

    const pos0 = getMax(bit0);
    const pos1 = getMax(bit1);
    const pos2 = getMax(bit2);
    const pos3 = getMax(bit3);
    const pos4 = getMax(bit4);
    const pos5 = getMax(bit5);
    const pos6 = getMax(bit6);
    const pos7 = getMax(bit7);
    const pos8 = getMax(bit8);
    const pos9 = getMax(bit9);
    const pos10 = getMax(bit10);
    const pos11 = getMax(bit11);

    var gammaRate = pos0 + pos1 + pos2 + pos3 + pos4 + pos5 + pos6 + pos7 + pos8 + pos9 + pos10 + pos11;
    var epsilonRate = flip(pos0) + flip(pos1) + flip(pos2) + flip(pos3) + flip(pos4) + flip(pos5) + flip(pos6) + flip(pos7) + flip(pos8) + flip(pos9) + flip(pos10) + flip(pos11);

    return (parseInt(gammaRate, 2) * parseInt(epsilonRate, 2));
}

function part2(report: Array<string>): number {

    return getRating(report, getOxygenRatings) * getRating(report, getCarbonRatings);
}

function getMax(bits: Array<Readings>): string {

    const zeros = bits.filter(b => b.bits === "0").length;
    return (zeros > bits.length - zeros) ? "0" : "1";
}

function flip(bit: string): string {

    return bit === "1" ? "0" : "1";
}

function spliter(bits: Array<Readings>, reportAll: Array<string>): Array<Array<string>> {

    let zeros = new Array<string>();
    let ones = new Array<string>();
    bits.forEach((element, index) => {

        if (element.bits === "0") {
            zeros.push(reportAll[index]);
        }
        else {
            ones.push(reportAll[index]);
        }
    });

    const s = new Array<Array<string>>();
    s.push(zeros);
    s.push(ones);
    return s;
}

function getOxygenRatings(bits: Array<Readings>, reportAll: Array<string>): Array<string> {

    const [zeros, ones] = spliter(bits, reportAll);
    return (ones.length >= bits.length - ones.length) || ones.length === 0 ? ones : zeros;
}

function getCarbonRatings(bits: Array<Readings>, reportAll: Array<string>): Array<string> {

    const [zeros, ones] = spliter(bits, reportAll);
    return (ones.length >= bits.length - ones.length) || ones.length === 0 ? zeros : ones;
}

function getRating(report: Array<string>, callback: (a: Array<Readings>, b: Array<string>) => Array<string>): number {

    const length = report[0].length; // length of the bit string
    let bits = getBits(report);
    let bitPostion = 0;
    let ratings = callback(bits[bitPostion++], report);

    while (true) {
        bits = getBits(ratings);
        ratings = callback(bits[bitPostion++], ratings);
        if (ratings.length == 1 || bitPostion >= length) {
            return parseInt(ratings[0], 2);
        }
    }
}

function getBits(report: string[]): Array<Array<Readings>> {
    
    let bit0 = new Array<Readings>();
    let bit1 = new Array<Readings>();
    let bit2 = new Array<Readings>();
    let bit3 = new Array<Readings>();
    let bit4 = new Array<Readings>();
    let bit5 = new Array<Readings>();
    let bit6 = new Array<Readings>();
    let bit7 = new Array<Readings>();
    let bit8 = new Array<Readings>();
    let bit9 = new Array<Readings>();
    let bit10 = new Array<Readings>();
    let bit11 = new Array<Readings>();

    report.forEach((element, index) => {
        bit0.push(new Readings(element[0], index));
        bit1.push(new Readings(element[1], index));
        bit2.push(new Readings(element[2], index));
        bit3.push(new Readings(element[3], index));
        bit4.push(new Readings(element[4], index));
        bit5.push(new Readings(element[5], index));
        bit6.push(new Readings(element[6], index));
        bit7.push(new Readings(element[7], index));
        bit8.push(new Readings(element[8], index));
        bit9.push(new Readings(element[9], index));
        bit10.push(new Readings(element[10], index));
        bit11.push(new Readings(element[11], index));
    });

    var bits = new Array<Array<Readings>>();
    bits.push(bit0);
    bits.push(bit1);
    bits.push(bit2);
    bits.push(bit3);
    bits.push(bit4);
    bits.push(bit5);
    bits.push(bit6);
    bits.push(bit7);
    bits.push(bit8);
    bits.push(bit9);
    bits.push(bit10);
    bits.push(bit11);
    return bits;
}
