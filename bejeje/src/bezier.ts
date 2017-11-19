export function CubicBezier(
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
            x: _getBezier(t, 0, p1x, p2x, 1),
            t: t
        });
    }
    return function bezier(x: number): number {
        for(let i = 0; i < res; i ++) {
            const a = xtList[i];
            const b = xtList[i + 1];
            if (a.x <= x && x <= b.x) {
                const dx = b.x - a.x;
                const dt = b.t - a.t;
                const t = (x - a.x) / dx * dt + a.t;
                return 1 - _getBezier(t, 1, p1y, p2y, 0);
            }
        }
        return 0;
    }
    function _getBezier(t: number, p0: number, p1: number, p2: number, p3: number): number {
        const mt = 1 - t;
        return p3*t*t*t + 3*mt*p2*t*t + 3*mt*mt*p1*t + mt*mt*mt*p0;
    }
}