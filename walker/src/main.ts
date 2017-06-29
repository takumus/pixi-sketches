import Canvas from '../.src/canvas';
export default class Main extends Canvas {
    private cr: number = 0;
    private len = {
        AB: 15,
        BC: 50,
        DC: 41.5,
        DF: 40.1,
        CF: 55.8,
        DE: 39.3,
        BE: 61.9,
        EG: 36.7,
        FG: 39.4,
        EH: 49.0,
        GH: 65.7
    }
    private pos = {
        A: this.addPos(0, 0, "A"),
        B: this.addPos(0, 0, "B"),
        C: this.addPos(0, 0, "C"),
        D: this.addPos(0, 0, "D"),
        E: this.addPos(0, 0, "E"),
        F: this.addPos(0, 0, "F"),
        G: this.addPos(0, 0, "G"),
        H: this.addPos(0, 0, "H")
    }
    public init() {
        Object.keys(this.len).forEach((k) => this.len[k] *= 4);
    }
    public draw() {
        const pos = this.pos;
        const len = this.len;

        pos.A.x = this.size.width / 2;
        pos.A.y = this.size.height / 2;

        //仮
        pos.D.x = pos.A.x + 38.0 * 4;
        pos.D.y = pos.A.y + 7.8 * 4;
        //

        this.cr += 0.05;
        pos.B.x = Math.cos(this.cr) * len.AB + pos.A.x;
        pos.B.y = Math.sin(this.cr) * len.AB + pos.A.y;

        const bd = Math.sqrt((pos.B.x - pos.D.x) * (pos.B.x - pos.D.x) + (pos.B.y - pos.D.y) * (pos.B.y - pos.D.y));
        const cdb = Math.acos((bd * bd + len.DC * len.DC - len.BC * len.BC) / (2 * bd * len.DC));
        const tr1 = Math.atan2(pos.B.y - pos.D.y, pos.B.x - pos.D.x);
        pos.C.x = Math.cos(cdb + tr1) * len.DC + pos.D.x;
        pos.C.y = Math.sin(cdb + tr1) * len.DC + pos.D.y;
        
        const cdf = Math.acos((len.DC * len.DC + len.DF * len.DF - len.CF * len.CF) / (2 * len.DC * len.DF));

        const tr2 = cdb + tr1;
        pos.F.x = Math.cos(cdf + tr2) * len.DF + pos.D.x;
        pos.F.y = Math.sin(cdf + tr2) * len.DF + pos.D.y;

        const bde = Math.acos((bd * bd + len.DE * len.DE - len.BE * len.BE) / (2 * bd * len.DE));
        pos.E.x = Math.cos(-bde + tr1) * len.DE + pos.D.x;
        pos.E.y = Math.sin(-bde + tr1) * len.DE + pos.D.y;

        const ef = Math.sqrt((pos.E.x - pos.F.x) * (pos.E.x - pos.F.x) + (pos.E.y - pos.F.y) * (pos.E.y - pos.F.y));
        const feg = Math.acos((ef * ef + len.EG * len.EG - len.FG * len.FG) / (2 * ef * len.EG));
        const tr3 = Math.atan2(pos.F.y - pos.E.y, pos.F.x - pos.E.x);
        pos.G.x = Math.cos(feg + tr3) * len.EG + pos.E.x;
        pos.G.y = Math.sin(feg + tr3) * len.EG + pos.E.y;
        
        const geh = Math.acos((len.EG * len.EG + len.EH * len.EH - len.GH * len.GH) / (2 * len.EG * len.EH));

        pos.H.x = Math.cos(feg + tr3 + geh) * len.EH + pos.E.x;
        pos.H.y = Math.sin(feg + tr3 + geh) * len.EH + pos.E.y;

        this.canvas.clear();
        
        this.line(pos.A, pos.B);
        this.line(pos.B, pos.C);
        this.line(pos.D, pos.C);
        this.line(pos.D, pos.F);
        this.line(pos.C, pos.F);
        this.line(pos.B, pos.E);
        this.line(pos.D, pos.E);
        this.line(pos.E, pos.G);
        this.line(pos.F, pos.G);
        this.line(pos.G, pos.H);
        this.line(pos.E, pos.H);
    }
    public addPos(x: number, y: number, name: string): Pos {
        const pos = new Pos(x, y, name);;
        this.addChild(pos);
        return pos;
    }
    public line(...pos: Pos[]) {
        this.canvas.lineStyle(2, 0xCCCCCC);
        pos.forEach((p, id) => {
            if (id == 0) {
                this.canvas.moveTo(p.x, p.y);
            }else {
                this.canvas.lineTo(p.x, p.y);
            }
        })
    }
    public mousedown() {
    }
    public mouseup() {
    }
    public mousemove() {
    }
    public resize(width: number, height: number) {
    }
}
class Pos extends PIXI.Container{
    private label: PIXI.Text;
    private marker: PIXI.Graphics;
    constructor(x: number, y: number, name: string) {
        super();
        this.x = x;
        this.y = y;

        const style = new PIXI.TextStyle();
        style.fontSize = 18;
        style.fill = 0x999999;
        style.align = "center";
        this.label = new PIXI.Text(name, style);
        this.label.x = 10;

        this.addChild(this.label);

        this.marker = new PIXI.Graphics();
        this.marker.beginFill(0x0066ff);
        this.marker.drawCircle(0, 0, 5);

        this.addChild(this.marker);
    }
}