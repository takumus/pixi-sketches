export default class Pos {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public clone(): Pos {
        return new Pos(this.x, this.y);
    }
    public distance(pos: Pos): number {
        return Math.sqrt((pos.x - this.x) * (pos.x - this.x) + (pos.y - this.y) * (pos.y - this.y));
    }
    public copyTo(pos: Pos): void {
        pos.x = this.x;
        pos.y = this.y;
    }
}