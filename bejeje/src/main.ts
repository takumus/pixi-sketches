import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private pos: Point[];
    private t: number = 0;
    public init() {
        this.pos = [];
        this.pos.push(new Point(30, 600));
        this.pos.push(new Point(60, 150));
        this.pos.push(new Point(900, 60));
        this.pos.push(new Point(1100, 600));
        this.pos.forEach((p) => this.addChild(p));
    }
    public draw() {
        this.t += 0.02;
        const t = (Math.cos(this.t) + 1) / 2;
        const c = this.canvas;
        const p = this.pos;
        const p0x = p[0].x;//始点x
        const p0y = p[0].y;//始点y
        const p1x = p[1].x;//cp1x
        const p1y = p[1].y;//cp1y
        const p2x = p[2].x;//cp2x
        const p2y = p[2].y;//cp2y
        const p3x = p[3].x;//終点x
        const p3y = p[3].y;//終点y

        const bp = this.getBezier(t, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
        c.clear();
        c.lineStyle(10, 0xff0000, 0.3);
        const length = 50;
        for (let i = 0; i <= length; i ++) {
            const tt = i / length;
            const bbp = this.getBezier(tt, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
            if (i == 0) {
                c.moveTo(bbp.x, bbp.y);
            }else {
                c.lineTo(bbp.x, bbp.y);
            }
        }
        c.lineStyle(2, 0x000000, 0.3);
        c.moveTo(p0x, p0y);
        c.lineTo(p1x, p1y);
        c.lineTo(p2x, p2y);
        c.lineTo(p3x, p3y);

        c.lineStyle();
        c.beginFill(0x0000ff);
        c.drawCircle(bp.x, bp.y, 10);
        c.endFill();
    }
    public getBezier(t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number): Pos {
        const mt = 1 - t;
        return {
            x: p3x*t*t*t + 3*mt*p2x*t*t + 3*mt*mt*p1x*t + mt*mt*mt*p0x,
            y: p3y*t*t*t + 3*mt*p2y*t*t + 3*mt*mt*p1y*t + mt*mt*mt*p0y
        };
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public mousemove() {
    }
    public resize(width: number, height: number) {
    }
}
interface Pos {
    x: number;
    y: number;
}
class Point extends PIXI.Container {
    constructor(x: number, y: number, c: number = 0xff0000) {
        super();
        this.x = x;
        this.y = y;
        const g = new PIXI.Graphics();
        g.beginFill(c);
        g.drawCircle(0, 0, 10);
        this.addChild(g);
        this.interactive = true;
        let drag = false;
        let vx = 0;
        let vy = 0;
        this.on("mousedown", () => {
            drag = true;
        });
        this.on("mousemove", (e) => {
            if (drag) {
                this.x = e.data.global.x;
                this.y = e.data.global.y;
            }
        });
        this.on("mouseup", () => {
            drag = false;
        });
        this.on("mouseupoutside", () => {
            drag = false;
        });
    }
}