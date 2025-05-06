export class Error<T extends Object> {
    err: T;
    title: string;
    detail?: string;

    constructor(err: T, title: string, detail?: string) {
        this.err = err;
        this.title = title;
        this.detail = detail;
        console.error(this);
    }

    toString(): string {
        let errStr = "";
        if (this.err.toString !== Object.prototype.toString) {
            errStr = ` (${this.err.toString()})`;
        }
        return `Error: ${this.title}${this.detail !== undefined ? ": " + this.detail : ""}${errStr}`;
    }
}
// TODO: Is this needed? Where and how will it be used?
