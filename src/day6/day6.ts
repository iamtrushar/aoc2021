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
    tracker.forEach(e => newTracker.push(new FishyTracker(e.rollingDayCounter, e.itemsInbucket, e.loop)));

    let counter = 0;
    let totalFishyCounter = 0;
    let dayCounter = 0;
    while (dayCounter <= day) {

        tracker.forEach(ele => {
            
            if (ele.itemsInbucket === 0) {
                return;
            }

            let newEle = newTracker.filter(x => x.rollingDayCounter === ele.rollingDayCounter)[0];
            counter += ele.loop;
            if (ele.itemsInbucket > 0) {
                if (ele.rollingDayCounter === 0) {
                    let item6 = newTracker.filter(x => x.rollingDayCounter === 6)[0]; 
                    if (item6) {
                        item6.itemsInbucket += ele.loop;
                    }
                    else {
                        newTracker.push(new FishyTracker(6, ele.itemsInbucket, ele.loop));
                    }

                    let item8 = newTracker.filter(x => x.rollingDayCounter === 8)[0];
                    if (item8) {
                        item8.itemsInbucket += ele.loop;
                    }
                    else {
                        newTracker.push(new FishyTracker(8, ele.itemsInbucket, ele.loop));
                    }
                }
                else {
                    const rollingDayCounter = ele.rollingDayCounter - 1;
                    let item = newTracker.filter(x => x.rollingDayCounter === rollingDayCounter)[0];
                    if (item) {
                        item.itemsInbucket += ele.loop;
                    }
                    else {
                        newTracker.push(new FishyTracker(rollingDayCounter, ele.itemsInbucket, ele.loop))
                    }
                }
                newEle.itemsInbucket -= ele.loop;
            }
            else {
                let item8 = newTracker.filter(x => x.rollingDayCounter === 8)[0];
                if (item8) {
                    item8.itemsInbucket += ele.loop;
                    let item6 = newTracker.filter(x => x.rollingDayCounter === 6)[0];
                    if (item6) {
                        item6.itemsInbucket += ele.loop;
                    }
                    else {
                        newTracker.push(new FishyTracker(6, ele.itemsInbucket, ele.loop))
                    }
                }
                else {
                    newTracker.push(new FishyTracker(8, ele.itemsInbucket, ele.loop))
                }
                newEle.itemsInbucket -= ele.loop;
            }
        });

        counter = Math.abs(totalFishyCounter - counter);
        totalFishyCounter = counter;
        tracker = new Array<FishyTracker>();
        newTracker.forEach(e => {
            tracker.push(new FishyTracker(e.rollingDayCounter, e.itemsInbucket, e.itemsInbucket));
        });
        dayCounter++;
    }

    return totalFishyCounter;
}

