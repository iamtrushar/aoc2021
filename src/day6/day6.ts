import { inputReadSingleLineNumbers } from "../inFileReader";
import { FishyTracker } from "./FishyTracker";

const inputByLine = inputReadSingleLineNumbers("./src/day6/input.txt");
console.log(`Part 1, answer (brute force): ${part1(inputByLine, 80)}`);
console.log(`Part 2, answer (take a long time, just wait): ${part2(inputByLine, 256)}`);

function part1(fishy: Array<number>, day: number): number {

    let newFishy = new Array<number>();
    fishy.forEach(element => { newFishy.push(element); });

    let count = 0;
    while (count < day) {

        fishy.forEach((ele, index) => {

            if (ele === 0) {

                newFishy[index] = 6;
                newFishy.push(8);
            }
            else {

                newFishy[index] = --ele;
            }
        })
        fishy = newFishy;
        count++;
    }
    return fishy.length;
}

function part2(fishy: Array<number>, day: number): number {

    let tracker = new Array<FishyTracker>();
    fishy.forEach(d => {

        const item = tracker.filter(x => x.rollingDayCounter === d);
        if (item.length > 0) { //exist?

            item[0].itemsInbucket++;
            item[0].loop++;
        }
        else {

            tracker.push(new FishyTracker(d, 1, 1)) // add new day item
        }
    });

    let newTracker = new Array<FishyTracker>();
    tracker.forEach(e => newTracker.push(e));

    let counter = 0;
    let previousCounter = 0;
    let dayCounter = 0;
    while (dayCounter <= day) {

        console.log(`day: ${dayCounter}`);
        
        tracker.forEach(ele => {

            let newEle = newTracker.filter(x => x.rollingDayCounter === ele.rollingDayCounter);
            for (let i = 0; i < ele.loop; i++) {

                counter++;
                if (ele.itemsInbucket > 0) {

                    if (ele.rollingDayCounter === 0) {

                        let item6 = newTracker.filter(x => x.rollingDayCounter === 6); // find number 6 rolling counter
                        if (item6.length > 0) { //exist?

                            item6[0].itemsInbucket++;
                            newEle[0].itemsInbucket--;
                        }
                        else {

                            newTracker.push(new FishyTracker(6, 1, 1)) // add new day 6 item
                            newEle[0].itemsInbucket--;
                        }

                        let item8 = newTracker.filter(x => x.rollingDayCounter === 8); // find number 8 rolling counter
                        if (item8.length > 0) //exist?
                        {

                            item8[0].itemsInbucket++;
                        }
                        else {

                            newTracker.push(new FishyTracker(8, 1, 1)) // add new day 8 item
                        }
                    }
                    else {

                        const rollingDayCounter = ele.rollingDayCounter - 1;
                        let item = newTracker.filter(x => x.rollingDayCounter === rollingDayCounter);
                        if (item.length > 0) //exist?
                        {

                            item[0].itemsInbucket++;
                            newEle[0].itemsInbucket--;
                        }
                        else {

                            newTracker.push(new FishyTracker(rollingDayCounter, 1, 1)) // add new day item
                            newEle[0].itemsInbucket--;
                        }
                    }
                }
                else {

                    let item8 = newTracker.filter(x => x.rollingDayCounter === 8); // find number 8 rolling counter
                    if (item8.length > 0) {//exist?

                        item8[0].itemsInbucket++;
                        let item6 = newTracker.filter(x => x.rollingDayCounter === 6); // find number 6 rolling counter
                        if (item6.length > 0) { //exist?

                            item6[0].itemsInbucket++;
                            newEle[0].itemsInbucket--;
                        }
                        else {

                            newTracker.push(new FishyTracker(6, 1, 1)) // add new day 6 item
                            newEle[0].itemsInbucket--;
                        }
                    }
                    else {

                        newTracker.push(new FishyTracker(8, 1, 1)) // add new day 8 item
                        newEle[0].itemsInbucket--;
                    }
                }
            }
        });
        previousCounter = counter;
        
        tracker = new Array<FishyTracker>();
        newTracker.forEach((e, index) => {

            tracker.push(e);
            tracker[index].loop = e.itemsInbucket; // reset to new loop count
        });
        dayCounter++;
    }

    return previousCounter;
}
