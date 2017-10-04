import Canvas from '../.src/canvas';
import {Body} from './bugs';
import Pos from './pos';
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