import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private objs: Obj[];
    public init() {
        this.objs = [];
    }
    public draw() {
        this.canvas.clear();
        this.objs.forEach((obj) => {
            obj.pos.y = obj.targetPos.y - 100;

            this.canvas.lineStyle(1, 0xCCCCCC);
            this.canvas.drawCircle(obj.targetPos.x, obj.targetPos.y, 10);

            this.canvas.drawCircle(obj.pos.x, obj.pos.y, obj.size / 2);

            this.canvas.moveTo(obj.targetPos.x, obj.targetPos.y);
            this.canvas.lineTo(obj.pos.x, obj.pos.y);
        });
        this.objs.forEach((o, id) => {
            o.pos.x += (o.targetPos.x - o.pos.x) * 0.1;
            const po = this.objs[id - 1];
            const no = this.objs[id + 1];
           

            if (no && no.pos.x - no.size / 2 > o.pos.x + o.size / 2) {
                const diff = (no.pos.x - no.size) - (o.pos.x + o.size);
                console.log(diff);
                o.pos.x += (no.pos.x + diff - o.pos.x) * 0.2;
            }
            
        })
    }
    public mousedown() {
        const obj = new Obj(100, {x: this.mouse.x, y: this.size.height / 2});
        this.objs.push(obj);
    }
    public mouseup() {
    }
    public mousemove() {
        this.canvas.clear();
        this.canvas.beginFill(0xff0000);
        this.canvas.drawRect(this.mouse.x - 50, this.mouse.y - 50, 100, 100);
    }
    public resize(width: number, height: number) {
    }
}

interface Pos {
    x: number;
    y: number;
}
class Obj {
    public pos: Pos = {x: 0, y: 0};
    public targetPos: Pos = {x: 0, y: 0};;
    public size: number;
    constructor(size: number, targetPos: Pos) {
        this.size = size;
        this.targetPos = targetPos;
    }
}