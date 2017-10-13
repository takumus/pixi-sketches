import Canvas from '../.src/canvas';
import {Body, Leg} from './bugs';
import Pos from './pos';
export default class Main extends Canvas {
    private body: MyBody;
    private pp: Pos;
    private offsetGUI: dat.GUIController;
    private autoGUI: dat.GUIController;
    public init() {
        this.body = new MyBody();
        this.body.scale.set(0.5, 0.5);
        this.addChild(this.body);

        const props = {
            auto: true,
            offset: 30
        }        
        const d = new dat.GUI();
        this.autoGUI = d.add(props, "auto");
        this.offsetGUI = d.add(props, "offset", -60, 60);
    }
    public mousedown() {}
    public mouseup() {}
    public draw() {
        const mx = this.mouse.x * 1 / this.body.scale.x;
        const my = this.mouse.y * 1 / this.body.scale.x;
        if (!this.pp) {
            this.pp = new Pos(mx, my);
        }
        const vx = mx - this.pp.x;
        const vy = my - this.pp.y
        this.pp.x += vx * 0.04;
        this.pp.y += vy * 0.04;

        const v = Math.sqrt(vx * vx + vy * vy);
        let r = v / 500;
        r = r > 1 ? 1 : r;
        r = 1 - r;
        let o = Math.floor(r * 30);
        if (this.autoGUI.getValue()) {
            this.offsetGUI.setValue(o);
        }else {
            o = Number(this.offsetGUI.getValue());
        }
        this.body.setOffset(o);
        this.body.setHead(this.pp);
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
        rootPointDistanceFromBody: number,
        endPointDistanceFromBody: number,
        stepOffset: number,
        l1l: number,
        l2l: number
    ) {
        super(body);
        this.setDirectionLR(directionLR);
        this.setDirectionFB(directionFB);
        this.setStepDistance(stepDistance);
        this.setEndPointDistanceFromBody(endPointDistanceFromBody);
        this.setRootPointDistanceFromBody(rootPointDistanceFromBody);
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
        this.lineStyle(4, 0x666666);
        this.moveTo(poses.begin.x, poses.begin.y);
        this.lineTo(poses.middle.x, poses.middle.y);
        this.lineStyle(2, 0x666666)
        this.moveTo(poses.middle.x, poses.middle.y);
        this.lineTo(poses.end.x, poses.end.y);
        this.lineStyle();
        this.beginFill(0x666666);
        this.drawCircle(poses.middle.x, poses.middle.y, 2);
        this.drawCircle(poses.end.x, poses.end.y, 3);
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
        const offset = 0;
        const d = 15;
        this.legs.push(new MyLeg(this, 120, offset,      offset + 8,  "front", "left",  10, 50, 0 + d * 2,  60, 50));
        this.legs.push(new MyLeg(this, 120, offset,      offset + 8,  "front", "right", 10, 50, 60 + d * 2, 60, 50));
        this.legs.push(new MyLeg(this, 120, offset + 12, offset + 12, "back",  "left",  20, 60, 60 + d * 1, 70, 80));
        this.legs.push(new MyLeg(this, 120, offset + 12, offset + 12, "back",  "right", 20, 60, 0 + d * 1,  70, 80));
        this.legs.push(new MyLeg(this, 120, offset + 17, offset + 17, "back",  "left",  10, 40, 0,          80, 90));
        this.legs.push(new MyLeg(this, 120, offset + 17, offset + 17, "back",  "right", 10, 40, 60,         80, 90));
        this.legs.forEach((o) => this.addChild(o));
    }
    public setOffset(o: number) {
        this.legs[0].setStepOffset(0 + o * 2);
        this.legs[1].setStepOffset(60 + o * 2);
        this.legs[2].setStepOffset(60 + o * 1);
        this.legs[3].setStepOffset(0 + o * 1);
        this.legs[4].setStepOffset(0);
        this.legs[5].setStepOffset(60);
    }
}