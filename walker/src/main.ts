import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    public init() {
    }
    public draw() {
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public mousemove() {
        this.canvas.clear();
        this.canvas.beginFill(0xff0000);
        this.canvas.drawRect(this.mouse.x - 50, this.mouse.y - 50, 100, 100);
    }
    public resize(width: number, height: number) {
    }
}