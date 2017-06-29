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
        Object.keys(this.len).forEach((k) => {
            this.len[k] *= 4;
        });
    }
    public draw() {
        const {A, B, C, D, E, F, G, H} = this.pos;
        const {AB, BC, DC, DF, CF, DE, BE, EG, FG, EH, GH} = this.len;
        this.canvas.clear();
        A.x = this.size.width / 2;
        A.y = this.size.height / 2;

        D.x = A.x + 38.0 * 4;
        D.y = A.y + 7.8 * 4;

        this.cr += 0.05;
        B.x = Math.cos(this.cr) * AB + A.x;
        B.y = Math.sin(this.cr) * AB + A.y;

        const bd = Math.sqrt((B.x - D.x) * (B.x - D.x) + (B.y - D.y) * (B.y - D.y));
        const cdb = Math.acos((bd * bd + DC * DC - BC * BC) / (2 * bd * DC));
        const tr1 = Math.atan2(B.y - D.y, B.x - D.x);
        C.x = Math.cos(cdb + tr1) * DC + D.x;
        C.y = Math.sin(cdb + tr1) * DC + D.y;
        
        const cdf = Math.acos((DC * DC + DF * DF - CF * CF) / (2 * DC * DF));

        const tr2 = cdb + tr1;
        F.x = Math.cos(cdf + tr2) * DF + D.x;
        F.y = Math.sin(cdf + tr2) * DF + D.y;

        //const bd = Math.sqrt((B.x - D.x) * (B.x - D.x) + (B.y - D.y) * (B.y - D.y));
        const bde = Math.acos((bd * bd + DE * DE - BE * BE) / (2 * bd * DE));
        E.x = Math.cos(-bde + tr1) * DE + D.x;
        E.y = Math.sin(-bde + tr1) * DE + D.y;

        const ef = Math.sqrt((E.x - F.x) * (E.x - F.x) + (E.y - F.y) * (E.y - F.y));
        const def = Math.acos((DE * DE + ef * ef - DF * DF) / (2 * DE * ef));
        const feg = Math.acos((ef * ef + EG * EG - FG * FG) / (2 * ef * EG));
        const tr3 = Math.atan2(F.y - E.y, F.x - E.x);
        G.x = Math.cos(feg + tr3) * EG + E.x;
        G.y = Math.sin(feg + tr3) * EG + E.y;
        
        const geh = Math.acos((EG * EG + EH * EH - GH * GH) / (2 * EG * EH));

        H.x = Math.cos(feg + tr3 + geh) * EH + E.x;
        H.y = Math.sin(feg + tr3 + geh) * EH + E.y;

        this.line(A, B);
        this.line(B, C);
        this.line(D, C);
        this.line(D, F);
        this.line(C, F);
        this.line(B, E);
        this.line(D, E);
        this.line(E, G);
        this.line(F, G);
        this.line(G, H);
        this.line(E, H);
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