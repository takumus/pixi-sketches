import Pos from './pos';
export interface Kelp {
    pos: Pos,
    radius: number,
    ratio: number
}
export default class ShapeDrawer {
    public static lineStyle = {
        normal: (n: number) => n,
        sin: (n: number) => (Math.cos(n * Math.PI + Math.PI) + 1) / 2,
        sineHalfB: (n: number) => Math.sin(n * Math.PI / 2),
        sineHalfA: (n: number) => Math.sin(n * Math.PI / 2 - Math.PI / 2) + 1
    }
    public static drawMuscleLine(
        graphics: PIXI.Graphics,
        kelps: Kelp[],
        color: number,
        resolution: number
    ) {
        for(let i = 0; i < kelps.length - 1; i ++) {
            const fk = kelps[i];
            const tk = kelps[i + 1];
            this._drawLine2(
                graphics, 
                fk, tk, 
                color, 
                resolution
            );
        }
    }
    private static _drawLine2(
        graphics: PIXI.Graphics,
        fromKelp: Kelp,
        toKelp: Kelp,
        color: number,
        resolution: number
    ) {
        const dx = toKelp.pos.x - fromKelp.pos.x;
        const dy = toKelp.pos.y - fromKelp.pos.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        const vx = dx / d;
        const vy = dy / d;
        graphics.lineStyle(10, 0);
        graphics.moveTo(fromKelp.pos.x, fromKelp.pos.y);
        graphics.lineTo(toKelp.pos.x, toKelp.pos.y);
    }

    public static drawLine(
        graphics: PIXI.Graphics,
        fromPos: Pos,
        toPos: Pos,
        fromThickness: number,
        toThickness: number,
        color: number,
        boneLength: number,
        style: (n: number) => number = ShapeDrawer.lineStyle.normal,
    ) {
        const dx = toPos.x - fromPos.x;
        const dy = toPos.y - fromPos.y;
        const D = Math.sqrt(dx * dx + dy * dy);
        const ii = 1 / boneLength;
        for (let i = 0; i < 1; i += ii) {
            this._drawLine(graphics, fromPos, dx, dy, fromThickness, toThickness, color, style, i);
        }
        this._drawLine(graphics, fromPos, dx, dy, fromThickness, toThickness, color, style, 1);
        graphics.lineStyle();
        graphics.beginFill(color);
        graphics.drawCircle(fromPos.x, fromPos.y, fromThickness / 2);
        graphics.drawCircle(toPos.x, toPos.y, toThickness / 2);
    }
    private static _drawLine(
        graphics: PIXI.Graphics,
        fromPos: Pos,
        dx: number,
        dy: number,
        fromThickness: number,
        toThickness: number,
        color: number,
        style: (n: number) => number,
        i: number
    ) {
        const dt = toThickness - fromThickness;
        graphics.lineStyle(fromThickness + dt * style(i), color);
        if (i == 0) {
            graphics.moveTo(fromPos.x, fromPos.y);
        }else {
            graphics.lineTo(
                fromPos.x + dx * i,
                fromPos.y + dy * i
            );
        }
    }
}