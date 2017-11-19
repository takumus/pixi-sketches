import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private pos: Point[];
    private t: number = 0;
    public init() {
        this.pos = [];
        this.pos.push(new Point(0, 400));
        this.pos.push(new Point(400, 400));
        this.pos.push(new Point(0, 0));
        this.pos.push(new Point(400, 0));
        this.pos.forEach((p) => this.addChild(p));
    }
    public draw() {
        this.t += 0.5;
        let t =  (this.t % 60 / 60);
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

        c.clear();
        c.lineStyle(10, 0xff0000, 0.3);
        for (let i = 0; i <= 100; i ++) {
            const t = i / 100;
            const bp = this.getBezierXY(t, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
            if (i == 0) {
                c.moveTo(bp.x, bp.y);
            }else {
                c.lineTo(bp.x, bp.y);
            }
        }

        const bp = this.getBezierXY(t, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
        
        c.lineStyle(2, 0x000000, 0.3);
        c.moveTo(p0x, p0y);
        c.lineTo(p1x, p1y);
        c.moveTo(p2x, p2y);
        c.lineTo(p3x, p3y);

        c.lineStyle();
        c.beginFill(0x0000ff);
        c.drawCircle(bp.x, bp.y, 10);
        c.endFill();
    }
    public getBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
        const mt = 1 - t;
        return p3*t*t*t + 3*mt*p2*t*t + 3*mt*mt*p1*t + mt*mt*mt*p0;
    }
    public getBezierXY(t: number, p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number, p3x: number, p3y: number): Pos {
        return {
            x: this.getBezier(t, p0x, p1x, p2x, p3x),
            y: this.getBezier(t, p0y, p1y, p2y, p3y)
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
        this.x = x + 100;
        this.y = y + 100;
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