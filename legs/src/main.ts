import Canvas from '../.src/canvas';
import {Body, Leg} from './bugs';
import Pos from './pos';
export default class Main extends Canvas {
    private body: Body;
    public init() {
        this.body = new MyBody();
        this.addChild(this.body);
    }
    public mousedown() {}
    public mouseup() {}
    public draw() {
        this.body.setHead(new Pos(this.mouse.x, this.mouse.y));
    }
    public resize(width: number, height: number) {}
}
class MyLeg extends Leg {
    private directionFB: number;
    private l1l: number;
    private l2l: number;
    constructor(
        body: Body, 
        stepDistance: number, 
        targetRootIndex: number, 
        rootIndex: number, 
        directionFB: string, 
        directionLR: string,
        distanceFromRoot: number,
        stepOffset: number,
        l1l: number,
        l2l: number
    ) {
        super(body);
        this.setDirectionLR(directionLR);
        this.setDirectionFB(directionFB);
        this.setStepDistance(stepDistance);
        this.setDistanceFromRoot(distanceFromRoot);
        this.setTargetRootIndex(targetRootIndex);
        this.setStepOffset(stepOffset);
        this.setRootIndex(rootIndex);
        this.setL1L(l1l);
        this.setL2L(l2l);
    }
    public setL1L(value: number) {
        this.l1l = value;
    }
    public setL2L(value: number) {
        this.l2l = value;
    }
    public setDirectionFB(value: string) {
        this.directionFB = Math.floor(value=="front"?1:-1);
    }
    protected drawLegs(fromPos: Pos, targetPos: Pos) {
        const poses = this.getLegPos(
            fromPos,
            targetPos,
            this.l1l, this.l2l,
            this.directionFB,
            this.directionLR
        );
        this.moveTo(poses.begin.x, poses.begin.y);
        this.lineTo(poses.middle.x, poses.middle.y);
        this.lineTo(poses.end.x, poses.end.y);
    }
    private getLegPos(fromPos: Pos, toPos: Pos, l1: number, l2: number, fb: number, lr: number) {
        const r = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
        const a = fromPos.distance(toPos);
        let b = l1;
        let c = l2;
        const minA = a * 1.05;
        const bc = b + c;
        if (b + c < minA) {
            c = c / bc * minA;
            b = b / bc * minA;
        }
        const rc = Math.acos((a * a + b * b - c * c) / (2 * a * b));
        const rr = r + (fb * lr < 0 ? rc : -rc);
        const x = Math.cos(rr) * b + fromPos.x;
        const y = Math.sin(rr) * b + fromPos.y;
        return {
            begin: fromPos.clone(),
            middle: new Pos(x, y),
            end: toPos.clone()
        };
    }
}
class MyBody extends Body {
    constructor() {
        super();
        this.legs.push(new MyLeg(this, 120, 0, 8, "front", "left", 50, 20, 60, 50));
        this.legs.push(new MyLeg(this, 120, 0, 8, "front", "right", 50, 80, 60, 50));
        this.legs.push(new MyLeg(this, 120, 12, 12, "back", "left", 50, 60, 80, 70));
        this.legs.push(new MyLeg(this, 120, 12, 12, "back", "right", 50, 0, 80, 70));
        this.legs.forEach((o) => this.addChild(o));
    }
}