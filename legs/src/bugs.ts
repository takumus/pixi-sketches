import Pos from './pos';
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
    public static fromPos(pos: Pos) {
        return new PosStack(pos.x, pos.y);
    }
}
export class Body extends PIXI.Container {
    public canvas: PIXI.Graphics;
    public D = 18;
    public bone: Pos[];
    public legs: Leg[] = [];
    private interval: number = 10;
    private posStack: PosStack;
    private L = 30;
    private d: number = 0;
    constructor() {
        super();
        this.canvas = new PIXI.Graphics();
        this.addChild(this.canvas);
    }
    public setHead(pos: Pos) {
        const np = PosStack.fromPos(pos);
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
        this.canvas.lineStyle(1, 0x666666);
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
                    this.canvas.drawCircle(tp.x, tp.y, 1.5);
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
        this.legs.forEach((l) => l.setMoveDistance(this.d));
    }
}
export class Leg extends PIXI.Graphics {
    private stepDistance: number;
    private stepDistanceHalf: number;
    private step: number = 0;
    private sid2: number = 0;
    private targetDistance: number;
    private body: Body;
    private c: number = 0xff5500;
    private targetRootIndex: number;
    private rootIndex: number;
    private nextPos: Pos;
    private prevPos: Pos;
    private nowPos: Pos;
    protected directionLR: number;
    private stepOffset: number;
    private endPointDistanceFromBody: number;
    private rootPointDistanceFromBody: number;
    constructor(body: Body) {
        super();
        this.nowPos = new Pos(0, 0);
        this.nextPos = new Pos(0, 0);
        this.prevPos = new Pos(0, 0);
        this.setBody(body);
    }
    public setEndPointDistanceFromBody(value: number): void {
        this.endPointDistanceFromBody = value;
    }
    public setRootPointDistanceFromBody(value: number): void {
        this.rootPointDistanceFromBody = value;
    }
    public setBody(body: Body): void {
        this.body = body;
    }
    public setStepDistance(value: number): void {
        this.stepDistance = value;
        this.stepDistanceHalf = value / 2;
    }
    public setTargetRootIndex(id: number): void {
        this.targetRootIndex = Math.floor(id);
    }
    public setRootIndex(id: number): void {
        this.rootIndex = Math.floor(id);
    }
    public setStepOffset(value: number): void {
        this.stepOffset = Math.floor(value);
    }
    public setDirectionLR(value: string): void {
        this.directionLR = Math.floor(value=="left"?1:-1);
    }
    public setMoveDistance(value: number): void {
        value += this.stepOffset;
        const stepRate = value % this.stepDistance;
        const halfStepRate = stepRate % this.stepDistanceHalf;
        const step = Math.floor(value / this.stepDistance);
        const diffStep = Math.abs(this.step - step);
        if (diffStep > 0) {
            this.step = step;
            const nextId = Math.floor(stepRate / this.body.D) + this.targetRootIndex;
            const nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
            if (diffStep == 1) {
                this.nextPos.copyTo(this.prevPos);
                nextPos.copyTo(this.nextPos);
            }else if (diffStep > 1) {
                this.nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
                const prevId = nextId + Math.floor(this.stepDistance / this.body.D);
                this.prevPos = this.getTargetPos(prevId, this.directionLR, this.endPointDistanceFromBody);
            }
        }
        this.clear();
        const br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
        let r = (Math.cos(Math.PI + Math.PI * br) + 1) / 2;
        r = r * r;
        const a = (1 - r) * 0.6 + 0.4;
        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;
        this.lineStyle(1, 0x0000ff, a);
        this.moveTo(this.prevPos.x, this.prevPos.y);
        this.lineTo(this.nextPos.x, this.nextPos.y);
        this.lineStyle(1, r == 1 ? 0xff0000 : 0x0000ff, r == 1 ? 1 : a);
        this.drawRect(this.nextPos.x - 5, this.nextPos.y - 5, 10, 10);
        
        const rootPos = this.body.bone[this.rootIndex];
        const fromPos = this.getRootPos(this.rootIndex);
        if (fromPos && rootPos) {
            this.lineStyle();
            this.beginFill(0x333333);
            this.drawCircle(fromPos.x, fromPos.y, 3);
            this.endFill();
            this.lineStyle(1, 0x666666);
            this.moveTo(rootPos.x, rootPos.y);
            this.lineTo(fromPos.x, fromPos.y);
            this.drawLegs(fromPos, this.nowPos);
        }
    }
    private getRootPos(baseId: number) {
        const basePos = this.body.bone[baseId];
        if (!basePos) return null;
        let pos1 = basePos;
        let pos2 = this.body.bone[baseId + 1];
        if (!pos2) {
            pos1 = this.body.bone[baseId - 1];
            pos2 = basePos;
        }
        const ddx = pos2.x - pos1.x;
        const ddy = pos2.y - pos1.y;
        const D = Math.sqrt(ddx * ddx + ddy * ddy);
        const dx = ddx / D;
        const dy = ddy / D;
        return new Pos(
            basePos.x + -this.directionLR * dy * this.rootPointDistanceFromBody,
            basePos.y + this.directionLR * dx * this.rootPointDistanceFromBody
        )
    }
    protected drawLegs(fromPos: Pos, targetPos: Pos): void {}
    private getTargetPos(id: number, d: number, length: number): Pos {
        let bp = this.body.bone[id];
        let fp: Pos = this.body.bone[id];
        let tp: Pos = this.body.bone[id - 1];
        if (!tp) {
            tp = fp;
            fp = this.body.bone[id + 1];
        }
        if (!tp || !fp || !bp) return new Pos(0, 0);
        const ddx = tp.x - fp.x;
        const ddy = tp.y - fp.y;
        const D = Math.sqrt(ddx * ddx + ddy * ddy);
        const dx = ddx / D;
        const dy = ddy / D;
        const vx = (d < 0) ? -dy : dy;
        const vy = (d < 0) ? dx : -dx;
        bp = bp.clone();
        bp.x += vx * length;
        bp.y += vy * length;
        return bp;
    }
}