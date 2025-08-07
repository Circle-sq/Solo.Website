export {};

declare global {
    export interface Console {
        set?(x: any): any;
    }
}
