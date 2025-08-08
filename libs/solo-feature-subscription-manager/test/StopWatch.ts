export class Stopwatch {
    private readonly id: string;
    private readonly startTime: number;
    private lastTickTime: number;
    private ticks: { time: number; eventName: string }[] = [];

    constructor(id: string) {
        this.id = id;
        this.startTime = Date.now();
        this.lastTickTime = this.startTime;
    }

    tick(eventName: string): void {
        const now = Date.now();
        const timeSinceLastTick = now - this.lastTickTime;
        this.ticks.push({ time: timeSinceLastTick, eventName });
        this.lastTickTime = now;
        console.info(
            `                                [${this.id}] Event "${eventName}": ${timeSinceLastTick}ms since last tick`,
        );
    }

    getTotalTime(): number {
        return Date.now() - this.startTime;
    }

    info(): void {
        this.ticks.forEach((tick) => {
            console.info(`[${this.id}] Event "${tick.eventName}": ${tick.time}ms`);
        });
        console.info(`[${this.id}] Total time: ${this.getTotalTime()}ms`);
    }
}
