import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private interval: number = 10;
    private poses: PosStack;
    private poses2: Pos[];
    public init() {
        this.poses2 = [];
    }
    public draw() {
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public mousemove() {
        const mouse = new PosStack(this.mouse.x, this.mouse.y);
        if (!this.poses) {
            this.poses = mouse;
        }else {
            mouse.next = this.poses;
        }
        this.poses = mouse;

        let ni = 1;
        let fp: Pos = this.poses;
        let np: PosStack = this.poses;
        let pp: Pos = fp;

        this.poses2 = [];
        const D = 50;
        const DD = D * D;
        const len = 10;
        for (let i = 0; i < len; i ++) {
            let add = 0;
            np.forEach((p, id) => {
                const dx = p.x - pp.x;
                const dy = p.y - pp.y;
                const dd = dx * dx + dy * dy;
                pp = p;
                add += dd;
                if (add > DD) {
                    const d = Math.sqrt(dd);
                    const diff = Math.sqrt(add - DD);
                    const tx = p.x + dx / d * diff;
                    const ty = p.y + dy / d * diff;
                    pp = new Pos(tx, ty);
                    this.poses2.push(pp.clone());
                    return false;
                }
                np = p;
                return true;
            });
        }
        //if (np.next) np.next.next = null;
        this.canvas.clear();
        this.canvas.lineStyle(3, 0x666666);
        this.poses2.forEach((p, id) => {
            if (id == 0) {
                this.canvas.moveTo(p.x, p.y);
            }else {
                this.canvas.lineTo(p.x, p.y);
            }
        });
        this.canvas.lineStyle();
        this.poses2.forEach((p, id) => {
            this.canvas.beginFill(0xCCCCCC);
            this.canvas.drawCircle(p.x, p.y, 8);
            this.canvas.endFill();
        });
        let idl = 0;
        this.poses.forEach((p, id) => {
            idl = id;
            return true;
        });
        console.log(idl);
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