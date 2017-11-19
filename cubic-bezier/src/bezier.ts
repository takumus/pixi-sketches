export default function CubicBezier(
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    res: number = 20
){
    const xtList: {x: number, t: number}[] = [];
    p1y = 1 - p1y;
    p2y = 1 - p2y;
    for (let i = 0; i <= res; i ++) {
        const t = i / res;
        xtList.push({
            x: bezier(t, 0, p1x, p2x, 1),
            t: t
        });
    }
    return function (x: number): number {
        x = x < 0 ? 0 : x > 1 ? 1 : x;
        const i = search(xtList, res, x);
        const a = xtList[i];
        const b = xtList[i + 1];
        return 1 - bezier(
            //tを計算
            (x - a.x) / (b.x - a.x) * (b.t - a.t) + a.t,
            //yを求める
            1, p1y, p2y, 0
        );
    }
}
//2分探索もどきで探索
function search(xtList: {x: number, t: number}[], length: number, x: number) {
    if (x == 0) return 0;
    if (x == 1) return length - 2;
    let low = 0;
    let high = length - 1;
    while(low <= high){
        var i = Math.floor((low + high) / 2);
        if(xtList[i].x == x) {
            return i;
        }else if(xtList[i].x > x) {
            high = i - 1;
        }else {
            low = i + 1;
        }
    }
    return low - 1;
};
// maximaで求めたらこうなったベジェ関数。
function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;
    return p3*t*t*t + 3*mt*p2*t*t + 3*mt*mt*p1*t + mt*mt*mt*p0;
}