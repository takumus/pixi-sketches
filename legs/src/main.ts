import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private interval: number = 10;
    private posStack: PosStack;

    private D = 120;
    private L = 15;
    public init() {
    }
    public draw() {
        const np = new PosStack(
            this.mouse.x,
            this.mouse.y
        );
        if (this.posStack) {
            if (np.distance(this.posStack) > 1) {
                np.next = this.posStack;
                this.posStack = np;
            }
        }else {
            this.posStack = np;
        }

        this.canvas.clear();

        this.canvas.lineStyle(1, 0xCCCCCC);
        this.posStack.forEach((p, id) => {
            if (id == 0) {
                this.canvas.moveTo(p.x, p.y);
            }else {
                this.canvas.lineTo(p.x, p.y);
            }
            return true;
        });
        this.canvas.lineStyle();

        let pp: PosStack = this.posStack;
        let tp: Pos = this.posStack;
        for (let i = 0; i < this.L; i ++) {
            let ad = 0;
            let nd = this.D;
            pp.forEach((p, id) => {
                if (id == 0) return true;
                const dx = p.x - tp.x;
                const dy = p.y - tp.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                ad += d;
                if (ad > this.D) {
                    tp = new PosStack(
                        tp.x + dx / d * nd,
                        tp.y + dy / d * nd
                    );
                    this.canvas.beginFill(0x000000);
                    this.canvas.drawCircle(tp.x, tp.y, 5);
                    this.canvas.endFill();
                    nd = this.D;
                    return false;
                }else {
                    pp = tp = p;
                    nd = this.D - ad;
                }
                return true;
            });
        }
        if (pp.next && pp.next.next) {
            pp.next.next = null;
        }
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public resize(width: number, height: number) {
    }
}
class Pos {
    public x: number;
    public y: number;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    public distance(pos: Pos): number {
        return Math.sqrt((pos.x - this.x) * (pos.x - this.x) + (pos.y - this.y) * (pos.y - this.y));
    }
    public clone(): Pos {
        return new Pos(this.x, this.y);
    }
}
class PosStack extends Pos {
    public next: PosStack;
    public forEach(callback: (v: PosStack, id: number) => boolean): void {
        let p: PosStack = this;
        let id = 0;
        while(p) {
            if (!callback(p, id)) break;
            p = p.next;
            id ++;
        }
    }
}