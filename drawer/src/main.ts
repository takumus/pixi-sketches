import Canvas from '../.src/canvas';
import Pos from './pos';
export default class Main extends Canvas {
    public init() {
    }
    public draw() {
        this.canvas.clear();
        ShapeDrawer.drawLine(
            this.canvas,
            new Pos(60, 100),
            new Pos(this.mouse.x, this.mouse.y),
            10,
            60,
            0xff0000,
            100,
            ShapeDrawer.lineStyle.sin
        );
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

class ShapeDrawer {
    public static lineStyle = {
        normal: (n: number) => n,
        sin: (n: number) => (Math.cos(n * Math.PI + Math.PI) + 1) / 2,
        sineHalfB: (n: number) => Math.sin(n * Math.PI / 2),
        sineHalfA: (n: number) => Math.sin(n * Math.PI / 2 - Math.PI / 2) + 1
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