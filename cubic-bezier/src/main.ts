import Canvas from '../.src/canvas';
import CubicBezier from './bezier';
export default class Main extends Canvas {
    private t: number;
    private cbs: ((n: number) => number)[];
    public init() {
        this.t = 0;
        this.cbs = [];
        this.cbs.push(CubicBezier(0.455, 0.03, 0.515, 0.955, 20)); //easeInOutQuad
        this.cbs.push(CubicBezier(0.77, 0, 0.175, 1, 20)); //easeInOutQuart
        this.cbs.push(CubicBezier(1, 0, 0, 1)); //easeInOutExpo
        this.cbs.push(CubicBezier(0.68, -0.55, 0.265, 1.55, 20)); //easeInOutBack
    }
    public draw() {
        this.t += this.mousePressed ? (this.mouse.x / this.size.width) * 2 : 1;
        const t = this.t % 60 / 60;
        const iy = this.size.height * 0.5 / this.cbs.length;
        const w = this.size.width * 0.5;
        const bx = this.size.width * 0.25;
        const by = this.size.height * 0.25 + iy / 2;
        this.canvas.clear();
        this.canvas.lineStyle(20, 0xCCCCCC);
        this.canvas.moveTo(bx, 0);
        this.canvas.lineTo(bx, this.size.height);
        this.canvas.moveTo(bx + w, 0);
        this.canvas.lineTo(bx + w, this.size.height);
        this.canvas.lineStyle();
        this.cbs.forEach((cb, id) => {
            this.canvas.beginFill(0x0000ff);
            let r = cb(t);
            if (Math.floor(this.t / 60) % 2 == 0) r = 1 - r;
            this.canvas.drawRect(bx + r * w - 10, by + id * iy, 20, 20);
        });
    }
}