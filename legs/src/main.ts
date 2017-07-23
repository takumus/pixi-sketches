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

    private D = 18;
    private L = 30;

    private d: number = 0;

    public bone: Pos[];

    private legs: Leg[] = [];
    constructor() {
        super();
        this.canvas = new PIXI.Graphics();
        this.addChild(this.canvas);
        for (let i = 0; i < 23; i ++) {
            const ox = 0 + i * 6;
            const oy = 30 + i * 6;
            this.legs.push(new Leg(this, 60, this.D, i, i + 3, 1, ox));
            this.legs.push(new Leg(this, 60, this.D, i, i + 3, -1, oy));
        }
        
        this.legs.forEach((o) => this.addChild(o));
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
        this.legs.forEach((l) => l.setMoveDistance(this.d));
    }
}
class Leg extends PIXI.Graphics {
    private stepDistance: number;
    private stepDistanceHalf: number;
    private step: number = 0;
    private sid2: number = 0;
    private boneDistance: number;
    private body: Body;
    private c: number = 0xff5500;
    private targetRootIndex: number;
    private rootIndex: number;
    private nextPos: Pos;
    private prevPos: Pos;
    private nowPos: Pos;
    private direction: number;
    private stepOffset: number;
    constructor(
        body: Body, 
        stepDistance: number, 
        boneDistance: number, 
        targetRootIndex: number, 
        rootIndex: number, 
        direction: number,
        stepOffset: number) {
        super();
        this.direction = direction;
        this.nowPos = new Pos(0, 0);
        this.nextPos = new Pos(0, 0);
        this.prevPos = new Pos(0, 0);
        this.setBody(body);
        this.setStepDistance(stepDistance);
        this.setBoneDistance(boneDistance);
        this.setTargetRootIndex(targetRootIndex);
        this.setStepOffset(stepOffset);
        this.setRootIndex(rootIndex);
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
    public setTargetRootIndex(id: number): void {
        this.targetRootIndex = id;
    }
    public setRootIndex(id: number): void {
        this.rootIndex = id;
    }
    public setStepOffset(offset: number): void {
        this.stepOffset = offset;
    }
    public setMoveDistance(distance: number): void {
        distance += this.stepOffset;
        const stepRate = distance % this.stepDistance;
        const halfStepRate = stepRate % this.stepDistanceHalf;
        const step = Math.floor(distance / this.stepDistance);
        const diffStep = Math.abs(this.step - step);
        if (diffStep > 0) {
            this.step = step;
            const nextId = Math.floor(stepRate / this.boneDistance) + this.targetRootIndex;
            const nextPos = this.getTargetPos(nextId, this.direction, 30);//this.body.bone[nextId];
            if (diffStep == 1) {
                this.nextPos.copyTo(this.prevPos);
                nextPos.copyTo(this.nextPos);
            }else if (diffStep > 1) {
                this.nextPos = this.getTargetPos(nextId, this.direction, 30);
                //this.body.bone[nextId].copyTo(this.nextPos);
                const prevId = nextId + Math.floor(this.stepDistance / this.boneDistance);
                this.prevPos = this.getTargetPos(prevId, this.direction, 30);
                //this.body.bone[prevId].copyTo(this.prevPos);
            }
        }
        this.clear();
        const br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
        let r = (Math.cos(Math.PI + Math.PI * br) + 1) / 2;
        //r = Math.pow(r, 2);
        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;

        //this.lineStyle(1, this.c * 0.2);
        //this.moveTo(this.prevPos.x, this.prevPos.y);
        //this.lineTo(this.nextPos.x, this.nextPos.y);
        //this.lineStyle(1, this.c);
        this.drawRect(this.nextPos.x - 5, this.nextPos.y - 5, 10, 10);
        this.drawRect(this.prevPos.x - 5, this.prevPos.y - 5, 10, 10);
        this.lineStyle();
        this.beginFill(this.c);
        this.drawRect(this.nowPos.x - 2.5, this.nowPos.y - 2.5, 5, 5);

        const p = this.body.bone[this.rootIndex];
        if (p) {
            this.beginFill(this.c * 0.2);
            this.drawCircle(p.x, p.y, 5);
            this.lineStyle(1, this.c * 0.4);
            this.endFill();

            const poses = BugLegs.getPos(p, this.nowPos, 25, 25, this.direction);
            this.moveTo(poses.begin.x, poses.begin.y);
            this.lineTo(poses.middle.x, poses.middle.y);
            this.lineTo(poses.end.x, poses.end.y);
        }
    }
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

class BugLegs {
    public static getPos(fromPos: Pos, toPos: Pos, l1: number, l2: number, d: number) {
        //const dr = fromVecPos.r + (this._isLeft ? Math.PI / 2 : -Math.PI / 2);
        //fromPos.x += Math.cos(dr) * this._distanceFromRoot;
        //fromPos.y += Math.sin(dr) * this._distanceFromRoot;

        const r = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const a = fromPos.distance(toPos);
        let b = l1;
        let c = l2;
        const minA = a * 1.02;
        if (b + c < minA) {
            const ratio = b / (b + c);
            b = ratio * minA;
            c = minA - b;
        }
        const ra = Math.acos((b * b + c * c - a * a) / (2 * b * c));
        const rb = Math.acos((a * a + c * c - b * b) / (2 * a * c));
        const rc = Math.acos((a * a + b * b - c * c) / (2 * a * b));
        const rr = r + (d < 0 ? rc : -rc);
        const x = Math.cos(rr) * b + fromPos.x;
        const y = Math.sin(rr) * b + fromPos.y;
        return {
            begin: fromPos.clone(),
            middle: new Pos(x, y),
            end: toPos.clone()
        };
    }
}