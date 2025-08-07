declare module 'raf-stub' {
    export interface RafStub {
        add(callback: (time: number) => void): number;
        remove(id: number): void;
        reset(): void;
        flush(duration?: number): void;
        step(steps?: number, duration?: number): void;
    }

    export function createStub(frameDuration?: number, startTime?: number): RafStub;
    export default createStub;
}
