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
export class Body {
    private _boneLength: number;
    private _bone: Pos[];
    private posStack: PosStack;
    private _jointCount = 60;
    private moved: number = 0;
    constructor(boneLength: number, jointCount: number) {
        this._boneLength = boneLength;
        this._jointCount = jointCount;
    }
    public get jointCount() {
        return this._jointCount;
    }
    public get boneLength() {
        return this._boneLength;
    }
    public get bone() {
        return this._bone;
    }
    public setHead(pos: Pos) {
        const np = PosStack.fromPos(pos);
        if (this.posStack) {
            if (np.distance(this.posStack) > 0) {
                this.moved += np.distance(this.posStack);
                np.next = this.posStack;
                this.posStack = np;
            }
        }else {
            this.posStack = np;
        }
        this._bone = [];
        let pp: PosStack = this.posStack;
        let tp: Pos = this.posStack;
        const body: Pos[] = [];
        for (let i = 0; i < this._jointCount; i ++) {
            let ad = 0;
            let nd = this._boneLength;
            pp.forEach((p, id) => {
                if (id == 0) return true;
                const dx = p.x - tp.x;
                const dy = p.y - tp.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                ad += d;
                if (ad > this._boneLength) {
                    tp = new PosStack(
                        tp.x + dx / d * nd,
                        tp.y + dy / d * nd
                    );
                    this._bone.push(tp.clone());
                    body.push(tp.clone());
                    nd = this._boneLength;
                    return false;
                }else {
                    pp = tp = p;
                    nd = this._boneLength - ad;
                }
                return true;
            });
        }
        if (pp.next && pp.next.next) {
            pp.next.next = null;
        }
        this.move(this.moved);
    }
    public move(move: number) {
    }
}
export type LegMoveStyle = (n: number) => number;
export namespace legMoveStyles {
    export const normal: LegMoveStyle = (n: number) => n;
    export const sin: LegMoveStyle = (n: number) => (Math.cos(n * Math.PI + Math.PI) + 1) / 2;
    export const sinHalfB: LegMoveStyle = (n: number) => Math.sin(n * Math.PI / 2);
    export const sinHalfA: LegMoveStyle = (n: number) => Math.sin(n * Math.PI / 2 - Math.PI / 2) + 1;
}
export class Leg{
    private stepDistance: number;
    private stepDistanceHalf: number;
    private step: number = 0;
    private targetDistance: number;
    private body: Body;
    private targetRootIndex: number;
    private rootIndex: number;
    private nextPos: Pos;
    private prevPos: Pos;
    private nowPos: Pos;
    protected directionLR: number;
    private stepOffset: number;
    private endPointDistanceFromBody: number;
    private rootPointDistanceFromBody: number;
    private _beginMovePos: Pos;
    private _endMovePos: Pos;
    private _moveProgress: number;
    private _moveStyle: LegMoveStyle;
    constructor(body: Body) {
        this.nowPos = new Pos(0, 0);
        this.nextPos = new Pos(0, 0);
        this.prevPos = new Pos(0, 0);
        this._beginMovePos = new Pos(0, 0);
        this._endMovePos = new Pos(0, 0);
        this.setBody(body);
        this.setMoveStyle(legMoveStyles.sin);
    }
    public setMoveStyle(style: LegMoveStyle): void {
        this._moveStyle = style;
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
            const nextId = Math.floor(stepRate / this.body.jointCount) + this.targetRootIndex;
            const nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
            if (diffStep == 1) {
                this.nextPos.copyTo(this.prevPos);
                nextPos.copyTo(this.nextPos);
            }else if (diffStep > 1) {
                this.nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
                const prevId = nextId + Math.floor(this.stepDistance / this.body.jointCount);
                this.prevPos = this.getTargetPos(prevId, this.directionLR, this.endPointDistanceFromBody);
            }
        }
        const br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
        let r = this._moveStyle(br);
        this._moveProgress = r;
        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;
        
        this._beginMovePos.x = this.prevPos.x;
        this._beginMovePos.y = this.prevPos.y;
        this._endMovePos.x = this.nextPos.x;
        this._endMovePos.y = this.nextPos.y;

        const rootPos = this.body.bone[this.rootIndex];
        const fromPos = this.getRootPos(this.rootIndex);

        if (fromPos && rootPos) this.calcLeg(fromPos, this.nowPos);
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
    public calcLeg(fromPos: Pos, targetPos: Pos): void {}
    public get moveProgress() {
        return this._moveProgress;
    }
    public get beginMovePos() {
        return this._beginMovePos;
    }
    public get endMovePos() {
        return this._endMovePos;
    }
    private getTargetPos(id: number, d: number, length: number): Pos {
        let bp = this.body.bone[id];
        let fp: Pos = bp;
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