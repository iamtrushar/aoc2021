export class Instruction {

    match: string;
    inject: string;
    constructor(match: string, inject: string) {
        this.match = match;
        this.inject = inject;
    }
}

export class Counter {
    inject: string;
    count: number;
    constructor(inject: string, count: number) {
        this.count = count;
        this.inject = inject;
    }
}