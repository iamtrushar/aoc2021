// export class FishyTracker {
//     itemsInbucket: number;
//     rollingDayCounter: number;
//     constructor(rollingDayCounter: number, itemsInbucket: number) {
//         this.rollingDayCounter = rollingDayCounter;
//         this.itemsInbucket = itemsInbucket;
//     }
// }



export class FishyTracker {
    itemsInbucket: number;
    rollingDayCounter: number;
    loop: number;
    constructor(rollingDayCounter: number, itemsInbucket: number, loop: number) {
        this.rollingDayCounter = rollingDayCounter;
        this.itemsInbucket = itemsInbucket;
        this.loop = loop
    }
}