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
        this.leg = new Leg(this, 100, this.D, 1);
        this.leg2 = new Leg(this, 100, this.D, -1);
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
        this.leg2.setMoveDistance(this.d + 50);
    }
}
class Leg extends PIXI.Graphics {
    private stepDistance: number;
    private stepDistanceHalf: number;
    private step: number = 0;
    private sid2: number = 0;
    private boneDistance: number;
    private body: Body;
    private c: number = Math.random() * 0xffffff;
    private rootIndex: number;
    private nextPos: Pos;
    private prevPos: Pos;
    private nowPos: Pos;
    private d: number;
    constructor(body: Body, stepDistance: number, boneDistance: number, d: number) {
        super();
        this.d = d;
        this.nowPos = new Pos(0, 0);
        this.nextPos = new Pos(0, 0);
        this.prevPos = new Pos(0, 0);
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
        const stepRate = distance % this.stepDistance;
        const halfStepRate = stepRate % this.stepDistanceHalf;
        const step = Math.floor(distance / this.stepDistance);
        const diffStep = Math.abs(this.step - step);
        if (diffStep > 0) {
            this.step = step;
            const nextId = Math.floor(stepRate / this.boneDistance);
            const nextPos = this.getTargetPos(nextId, this.d, 50);//this.body.bone[nextId];
            if (diffStep == 1) {
                this.nextPos.copyTo(this.prevPos);
                nextPos.copyTo(this.nextPos);
            }else if (diffStep > 1) {
                this.nextPos = this.getTargetPos(nextId, this.d, 50);
                //this.body.bone[nextId].copyTo(this.nextPos);
                const prevId = nextId + Math.floor(this.stepDistance / this.boneDistance);
                this.prevPos = this.getTargetPos(prevId, this.d, 50);
                //this.body.bone[prevId].copyTo(this.prevPos);
            }
        }
        this.clear();
        const br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
        const r = (Math.cos(Math.PI + Math.PI * br) + 1) / 2;
        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;

        //const p = this.body.bone[this.rootIndex];
        //if (p) {
            //this.beginFill(this.c * 0.2);
            //this.drawCircle(this.body.bone[this.rootIndex].x, this.body.bone[this.rootIndex].y, 10);
        //}
        this.lineStyle(1, this.c * 0.2);
        this.moveTo(this.prevPos.x, this.prevPos.y);
        this.lineTo(this.nextPos.x, this.nextPos.y);
        this.lineStyle(1, this.c);
        this.drawRect(this.nextPos.x - 5, this.nextPos.y - 5, 10, 10);
        this.drawRect(this.prevPos.x - 5, this.prevPos.y - 5, 10, 10);
        this.lineStyle();
        this.beginFill(this.c);
        this.drawRect(this.nowPos.x - 5, this.nowPos.y - 5, 10, 10);
    }
    private getTargetPos(id: number, d: number, length: number): Pos {
        const bp: Pos = this.body.bone[id].clone();
        let fp: Pos = this.body.bone[id];
        let tp: Pos = this.body.bone[id - 1];
        if (!tp) {
            tp = fp;
            fp = this.body.bone[id + 1];
        }
        const ddx = tp.x - fp.x;
        const ddy = tp.y - fp.y;
        const D = Math.sqrt(ddx * ddx + ddy * ddy);
        const dx = ddx / D;
        const dy = ddy / D;
        const vx = (d < 0) ? -dy : dy;
        const vy = (d < 0) ? dx : -dx;
        bp.x += vx * length;
        bp.y += vy * length;
        return bp;
    }
}
class Pos {
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