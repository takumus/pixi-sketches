import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private line: Pos[];
    private pos: Point[];
    private t: number = 0;
    public init() {
        this.line = [];
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
        /*
        const _p0x = p1x*t + (1-t)*p0x;
        const _p0y = p1y*t + (1-t)*p0y;
        const _p1x = p2x*t + (1-t)*p1x;
        const _p1y = p2y*t + (1-t)*p1y;
        const _p2x = p3x*t + (1-t)*p2x;
        const _p2y = p3y*t + (1-t)*p2y;
        const __p0x = _p1x*t + (1-t)*_p0x;
        const __p0y = _p1y*t + (1-t)*_p0y;
        const __p1x = _p2x*t + (1-t)*_p1x;
        const __p1y = _p2y*t + (1-t)*_p1y;
        const ___p0x = __p1x*t + (1-t)*__p0x;//これがベジェ点のx！！！
        const ___p0y = __p1y*t + (1-t)*__p0y;//これがベジェ点のy！！！
        */

        const ___p0x = p3x*t*t*t + 3*(1-t)*p2x*t*t + 3*(1-t)*(1-t)*p1x*t + (1-t)*(1-t)*(1-t)*p0x;//これがベジェ点のx！！！
        const ___p0y = p3y*t*t*t + 3*(1-t)*p2y*t*t + 3*(1-t)*(1-t)*p1y*t + (1-t)*(1-t)*(1-t)*p0y;//これがベジェ点のy！！！
        
        c.clear();

        c.lineStyle(2, 0x000000, 0.3);
        c.moveTo(p0x, p0y);
        c.lineTo(p1x, p1y);
        c.lineTo(p2x, p2y);
        c.lineTo(p3x, p3y);
        /*
        c.lineStyle(2, 0x000000, 0.6);
        c.moveTo(_p0x, _p0y);
        c.lineTo(_p1x, _p1y);
        c.lineTo(_p2x, _p2y);

        c.lineStyle(2, 0x000000, 0.9);
        c.moveTo(__p0x, __p0y);
        c.lineTo(__p1x, __p1y);
        */

        c.lineStyle();
        c.beginFill(0x0000ff);
        c.drawCircle(___p0x, ___p0y, 10);
        c.endFill();

        c.beginFill(0x0000ff);
        this.line.push({x: ___p0x, y: ___p0y});
        this.line.forEach((p, i) => {
            c.drawCircle(p.x, p.y, 2);
        });
        if (this.line.length > 100) {
            this.line.shift();
        }
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