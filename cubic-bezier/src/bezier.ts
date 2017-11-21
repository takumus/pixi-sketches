type XT = {x: number, t: number};
export default function CubicBezier(
    p1x: number,
    p1y: number,
    p2x: number,
    p2y: number,
    res: number = 20
){
    const xList: number[] = [];
    const tList: number[] = [];
    p1y = 1 - p1y;
    p2y = 1 - p2y;
    for (let i = 0; i <= res; i ++) {
        const t = i / res;
        xList.push(bezier(t, 0, p1x, p2x, 1));
        tList.push(t);
    }
    return function (x: number): number {
        x = x < 0 ? 0 : x > 1 ? 1 : x;
        const i = search(xList, res, x);
        const ax = xList[i];
        const bx = xList[i + 1];
        const at = tList[i];
        const bt = tList[i + 1];
        return 1 - bezier(
            //tを計算
            (x - ax) / (bx - ax) * (bt - at) + at,
            //yを求める
            1, p1y, p2y, 0
        );
    }
}
//2分探索もどきで探索
function search(arr: number[], len: number, n: number) {
    if (n == 0) return 0;
    let l = 0;
    let r = len - 1;
    while(l <= r) {
       const m = ~~((l + r) * 0.5);
       if (arr[m] < n) {
          l = m + 1;
       }else {
          r = m - 1;
       }
    }
    return r;
 }
// maximaで求めたらこうなったベジェ関数。
function bezier(t: number, p0: number, p1: number, p2: number, p3: number) {
    const mt = 1 - t;
    return p3*t*t*t + 3*mt*p2*t*t + 3*mt*mt*p1*t + mt*mt*mt*p0;
}