import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private body: Body;
    public init() {
        this.body = new Body();
        this.addChild(this.body);
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public draw() {
        this.body.setHead(new Pos(this.mouse.x, this.mouse.y));
    }
    public resize(width: number, height: number) {
    }
}
class Body extends PIXI.Container {
    private canvas: PIXI.Graphics;
    private interval: number = 10;
    private posStack: PosStack;

    private D = 30;
    private L = 20;

    private d: number = 0;

    public bone: Pos[];

    private leg: Leg;
    private leg2: Leg;
    constructor() {
        super();
        this.canvas = new PIXI.Graphics();
        this.addChild(this.canvas);
        this.leg = new Leg(this, 200, this.D);
        this.leg2 = new Leg(this, 200, this.D);
        this.leg.setRootIndex(2);
        this.leg2.setRootIndex(2);
        this.addChild(this.leg, this.leg2);
    }
    public setHead(pos: Pos) {
        const np = new PosStack(
            pos.x,
            pos.y
        );
        if (this.posStack) {
            if (np.distance(this.posStack) > 1) {
                this.d += np.distance(this.posStack);
                np.next = this.posStack;
                this.posStack = np;
            }
        }else {
            this.posStack = np;
        }
        this.bone = [];

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
        const body: Pos[] = [];
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
                    this.canvas.drawCircle(tp.x, tp.y, 2);
                    this.bone.push(tp.clone());
                    body.push(tp.clone());
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
        this.leg.setMoveDistance(this.d);
        //this.leg2.setMoveDistance(this.d + 100);
    }
}
class Leg extends PIXI.Graphics {
    private stepDistance: number;
    private stepDistanceHalf: number;
    private sid: number = 0;
    private sid2: number = 0;
    private boneDistance: number;
    private body: Body;
    private c: number = Math.random() * 0xffffff;
    private rootIndex: number;
    private tp: Pos;
    private tp2: Pos;
    constructor(body: Body, stepDistance: number, boneDistance: number) {
        super();
        this.setBody(body);
        this.setStepDistance(stepDistance);
        this.setBoneDistance(boneDistance);
    }
    public setBody(body: Body): void {
        this.body = body;
    }
    public setStepDistance(stepDistance: number): void {
        this.stepDistance = stepDistance;
        this.stepDistanceHalf = stepDistance / 2;
    }
    public setBoneDistance(boneDistance: number): void {
        this.boneDistance = boneDistance;
    }
    public setRootIndex(id: number): void {
        this.rootIndex = id;
    }
    public setMoveDistance(distance: number): void {
        const step = distance % this.stepDistance;
        const halfStep = step % this.stepDistanceHalf;
        const sid = Math.floor(distance / this.stepDistance);
        if (this.sid != sid) {
            this.sid = sid;
            const id = Math.floor(step / this.boneDistance);
            this.tp2 = this.tp?this.tp.clone():null;
            this.tp = this.body.bone[id].clone();
        }
        this.clear();
        if (this.tp) {
            this.beginFill(this.c);
            this.drawCircle(this.tp.x, this.tp.y, 10);
        }
        if (this.tp2) {
            this.beginFill(this.c);
            this.drawCircle(this.tp2.x, this.tp2.y, 20);
        }

        const p = this.body.bone[this.rootIndex];
        if (p) {
            this.beginFill(this.c);
            this.drawRect(this.body.bone[this.rootIndex].x - 5, this.body.bone[this.rootIndex].y - 5, 10, 10);
        }
        console.log(Math.floor(halfStep), Math.floor(step));
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