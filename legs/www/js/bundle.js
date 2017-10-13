/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var main_1 = __webpack_require__(1);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var stageWidth = 0, stageHeight = 0;
	var main = new main_1.default();
	var init = function () {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true, resolution: 1, transparent: true });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    window.addEventListener('orientationchange', resize);
	    window.addEventListener('mousedown', function (e) {
	        main.mouse.x = e.clientX;
	        main.mouse.y = e.clientY;
	        main.mousePressed = true;
	        main.mousedown();
	    });
	    window.addEventListener('mouseup', function (e) {
	        main.mousePressed = false;
	        main.mouseup();
	    });
	    window.addEventListener('mousemove', function (e) {
	        main.mouse.x = e.clientX;
	        main.mouse.y = e.clientY;
	        main.mousemove();
	    });
	    window.addEventListener('touchstart', function (e) {
	        main.mouse.x = e.touches[0].clientX;
	        main.mouse.y = e.touches[0].clientY;
	        main.mousePressed = true;
	        main.mousedown();
	    });
	    window.addEventListener('touchmove', function (e) {
	        main.mouse.x = e.touches[0].clientX;
	        main.mouse.y = e.touches[0].clientY;
	        main.mousemove();
	    });
	    window.addEventListener('touchend', function (e) {
	        if (e.touches.length > 0)
	            return;
	        main.mousePressed = false;
	        main.mouseup();
	    });
	    window.addEventListener('touchcancel', function (e) {
	        if (e.touches.length > 0)
	            return;
	        main.mousePressed = false;
	        main.mouseup();
	    });
	    stage.addChild(main);
	    draw();
	    resize();
	};
	var ppos = 0;
	var draw = function () {
	    requestAnimationFrame(draw);
	    main.draw();
	    TWEEN.update();
	    renderer.render(stage);
	};
	var resize = function () {
	    var width = canvas.offsetWidth;
	    var height = canvas.offsetHeight;
	    stageWidth = width;
	    stageHeight = height;
	    main.size.width = width;
	    main.size.height = height;
	    main.resize(width, height);
	    renderer.resize(width, height);
	};
	window.onload = init;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var canvas_1 = __webpack_require__(2);
	var bugs_1 = __webpack_require__(3);
	var pos_1 = __webpack_require__(4);
	var Main = /** @class */ (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Main.prototype.init = function () {
	        this.body = new MyBody();
	        this.body.scale.set(0.5, 0.5);
	        this.addChild(this.body);
	        var props = {
	            auto: true,
	            offset: 30
	        };
	        var d = new dat.GUI();
	        this.autoGUI = d.add(props, "auto");
	        this.offsetGUI = d.add(props, "offset", -60, 60);
	    };
	    Main.prototype.mousedown = function () { };
	    Main.prototype.mouseup = function () { };
	    Main.prototype.draw = function () {
	        var mx = this.mouse.x * 1 / this.body.scale.x;
	        var my = this.mouse.y * 1 / this.body.scale.x;
	        if (!this.pp) {
	            this.pp = new pos_1.default(mx, my);
	        }
	        var vx = mx - this.pp.x;
	        var vy = my - this.pp.y;
	        this.pp.x += vx * 0.04;
	        this.pp.y += vy * 0.04;
	        var v = Math.sqrt(vx * vx + vy * vy);
	        var r = v / 500;
	        r = r > 1 ? 1 : r;
	        r = 1 - r;
	        var o = Math.floor(r * 30);
	        if (this.autoGUI.getValue()) {
	            this.offsetGUI.setValue(o);
	        }
	        else {
	            o = Number(this.offsetGUI.getValue());
	        }
	        this.body.setOffset(o);
	        this.body.setHead(this.pp);
	    };
	    Main.prototype.resize = function (width, height) { };
	    return Main;
	}(canvas_1.default));
	exports.default = Main;
	var MyLeg = /** @class */ (function (_super) {
	    __extends(MyLeg, _super);
	    function MyLeg(body, stepDistance, targetRootIndex, rootIndex, directionFB, directionLR, rootPointDistanceFromBody, endPointDistanceFromBody, stepOffset, l1l, l2l) {
	        var _this = _super.call(this, body) || this;
	        _this.setDirectionLR(directionLR);
	        _this.setDirectionFB(directionFB);
	        _this.setStepDistance(stepDistance);
	        _this.setEndPointDistanceFromBody(endPointDistanceFromBody);
	        _this.setRootPointDistanceFromBody(rootPointDistanceFromBody);
	        _this.setTargetRootIndex(targetRootIndex);
	        _this.setStepOffset(stepOffset);
	        _this.setRootIndex(rootIndex);
	        _this.setL1L(l1l);
	        _this.setL2L(l2l);
	        return _this;
	    }
	    MyLeg.prototype.setL1L = function (value) {
	        this.l1l = value;
	    };
	    MyLeg.prototype.setL2L = function (value) {
	        this.l2l = value;
	    };
	    MyLeg.prototype.setDirectionFB = function (value) {
	        this.directionFB = Math.floor(value == "front" ? 1 : -1);
	    };
	    MyLeg.prototype.drawLegs = function (fromPos, targetPos) {
	        var poses = this.getLegPos(fromPos, targetPos, this.l1l, this.l2l, this.directionFB, this.directionLR);
	        this.lineStyle(4, 0x666666);
	        this.moveTo(poses.begin.x, poses.begin.y);
	        this.lineTo(poses.middle.x, poses.middle.y);
	        this.lineStyle(2, 0x666666);
	        this.moveTo(poses.middle.x, poses.middle.y);
	        this.lineTo(poses.end.x, poses.end.y);
	        this.lineStyle();
	        this.beginFill(0x666666);
	        this.drawCircle(poses.middle.x, poses.middle.y, 2);
	        this.drawCircle(poses.end.x, poses.end.y, 3);
	    };
	    MyLeg.prototype.getLegPos = function (fromPos, toPos, l1, l2, fb, lr) {
	        var r = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
	        var a = fromPos.distance(toPos);
	        var b = l1;
	        var c = l2;
	        var minA = a * 1.05;
	        var bc = b + c;
	        if (b + c < minA) {
	            c = c / bc * minA;
	            b = b / bc * minA;
	        }
	        var rc = Math.acos((a * a + b * b - c * c) / (2 * a * b));
	        var rr = r + (fb * lr < 0 ? rc : -rc);
	        var x = Math.cos(rr) * b + fromPos.x;
	        var y = Math.sin(rr) * b + fromPos.y;
	        return {
	            begin: fromPos.clone(),
	            middle: new pos_1.default(x, y),
	            end: toPos.clone()
	        };
	    };
	    return MyLeg;
	}(bugs_1.Leg));
	var MyBody = /** @class */ (function (_super) {
	    __extends(MyBody, _super);
	    function MyBody() {
	        var _this = _super.call(this) || this;
	        var offset = 0;
	        var d = 15;
	        _this.legs.push(new MyLeg(_this, 120, offset, offset + 8, "front", "left", 10, 50, 0 + d * 2, 60, 50));
	        _this.legs.push(new MyLeg(_this, 120, offset, offset + 8, "front", "right", 10, 50, 60 + d * 2, 60, 50));
	        _this.legs.push(new MyLeg(_this, 120, offset + 12, offset + 12, "back", "left", 20, 60, 60 + d * 1, 70, 80));
	        _this.legs.push(new MyLeg(_this, 120, offset + 12, offset + 12, "back", "right", 20, 60, 0 + d * 1, 70, 80));
	        _this.legs.push(new MyLeg(_this, 120, offset + 17, offset + 17, "back", "left", 10, 40, 0, 80, 90));
	        _this.legs.push(new MyLeg(_this, 120, offset + 17, offset + 17, "back", "right", 10, 40, 60, 80, 90));
	        _this.legs.forEach(function (o) { return _this.addChild(o); });
	        return _this;
	    }
	    MyBody.prototype.setOffset = function (o) {
	        this.legs[0].setStepOffset(0 + o * 2);
	        this.legs[1].setStepOffset(60 + o * 2);
	        this.legs[2].setStepOffset(60 + o * 1);
	        this.legs[3].setStepOffset(0 + o * 1);
	        this.legs[4].setStepOffset(0);
	        this.legs[5].setStepOffset(60);
	    };
	    return MyBody;
	}(bugs_1.Body));


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var Canvas = /** @class */ (function (_super) {
	    __extends(Canvas, _super);
	    function Canvas() {
	        var _this = _super.call(this) || this;
	        _this.mousePressed = false;
	        _this.mouse = { x: 0, y: 0 };
	        _this.size = { width: 0, height: 0 };
	        _this.canvas = new PIXI.Graphics();
	        _this.addChild(_this.canvas);
	        _this.init();
	        return _this;
	    }
	    Canvas.prototype.init = function () {
	    };
	    Canvas.prototype.draw = function () {
	    };
	    Canvas.prototype.mousedown = function () {
	    };
	    Canvas.prototype.mouseup = function () {
	    };
	    Canvas.prototype.mousemove = function () {
	    };
	    Canvas.prototype.resize = function (width, height) {
	    };
	    return Canvas;
	}(PIXI.Container));
	exports.default = Canvas;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	Object.defineProperty(exports, "__esModule", { value: true });
	var pos_1 = __webpack_require__(4);
	var PosStack = /** @class */ (function (_super) {
	    __extends(PosStack, _super);
	    function PosStack() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    PosStack.prototype.forEach = function (callback) {
	        var p = this;
	        var id = 0;
	        while (p) {
	            if (!callback(p, id))
	                break;
	            p = p.next;
	            id++;
	        }
	    };
	    PosStack.fromPos = function (pos) {
	        return new PosStack(pos.x, pos.y);
	    };
	    return PosStack;
	}(pos_1.default));
	var Body = /** @class */ (function (_super) {
	    __extends(Body, _super);
	    function Body() {
	        var _this = _super.call(this) || this;
	        _this.D = 18;
	        _this.legs = [];
	        _this.interval = 10;
	        _this.L = 30;
	        _this.d = 0;
	        _this.canvas = new PIXI.Graphics();
	        _this.addChild(_this.canvas);
	        return _this;
	    }
	    Body.prototype.setHead = function (pos) {
	        var _this = this;
	        var np = PosStack.fromPos(pos);
	        if (this.posStack) {
	            if (np.distance(this.posStack) > 1) {
	                this.d += np.distance(this.posStack);
	                np.next = this.posStack;
	                this.posStack = np;
	            }
	        }
	        else {
	            this.posStack = np;
	        }
	        this.bone = [];
	        this.canvas.clear();
	        this.canvas.lineStyle(1, 0x666666);
	        this.posStack.forEach(function (p, id) {
	            if (id == 0) {
	                _this.canvas.moveTo(p.x, p.y);
	            }
	            else {
	                _this.canvas.lineTo(p.x, p.y);
	            }
	            return true;
	        });
	        this.canvas.lineStyle();
	        var pp = this.posStack;
	        var tp = this.posStack;
	        var body = [];
	        var _loop_1 = function (i) {
	            var ad = 0;
	            var nd = this_1.D;
	            pp.forEach(function (p, id) {
	                if (id == 0)
	                    return true;
	                var dx = p.x - tp.x;
	                var dy = p.y - tp.y;
	                var d = Math.sqrt(dx * dx + dy * dy);
	                ad += d;
	                if (ad > _this.D) {
	                    tp = new PosStack(tp.x + dx / d * nd, tp.y + dy / d * nd);
	                    _this.canvas.beginFill(0x000000);
	                    _this.canvas.drawCircle(tp.x, tp.y, 1.5);
	                    _this.bone.push(tp.clone());
	                    body.push(tp.clone());
	                    _this.canvas.endFill();
	                    nd = _this.D;
	                    return false;
	                }
	                else {
	                    pp = tp = p;
	                    nd = _this.D - ad;
	                }
	                return true;
	            });
	        };
	        var this_1 = this;
	        for (var i = 0; i < this.L; i++) {
	            _loop_1(i);
	        }
	        if (pp.next && pp.next.next) {
	            pp.next.next = null;
	        }
	        this.legs.forEach(function (l) { return l.setMoveDistance(_this.d); });
	    };
	    return Body;
	}(PIXI.Container));
	exports.Body = Body;
	var Leg = /** @class */ (function (_super) {
	    __extends(Leg, _super);
	    function Leg(body) {
	        var _this = _super.call(this) || this;
	        _this.step = 0;
	        _this.sid2 = 0;
	        _this.c = 0xff5500;
	        _this.nowPos = new pos_1.default(0, 0);
	        _this.nextPos = new pos_1.default(0, 0);
	        _this.prevPos = new pos_1.default(0, 0);
	        _this.setBody(body);
	        return _this;
	    }
	    Leg.prototype.setEndPointDistanceFromBody = function (value) {
	        this.endPointDistanceFromBody = value;
	    };
	    Leg.prototype.setRootPointDistanceFromBody = function (value) {
	        this.rootPointDistanceFromBody = value;
	    };
	    Leg.prototype.setBody = function (body) {
	        this.body = body;
	    };
	    Leg.prototype.setStepDistance = function (value) {
	        this.stepDistance = value;
	        this.stepDistanceHalf = value / 2;
	    };
	    Leg.prototype.setTargetRootIndex = function (id) {
	        this.targetRootIndex = Math.floor(id);
	    };
	    Leg.prototype.setRootIndex = function (id) {
	        this.rootIndex = Math.floor(id);
	    };
	    Leg.prototype.setStepOffset = function (value) {
	        this.stepOffset = Math.floor(value);
	    };
	    Leg.prototype.setDirectionLR = function (value) {
	        this.directionLR = Math.floor(value == "left" ? 1 : -1);
	    };
	    Leg.prototype.setMoveDistance = function (value) {
	        value += this.stepOffset;
	        var stepRate = value % this.stepDistance;
	        var halfStepRate = stepRate % this.stepDistanceHalf;
	        var step = Math.floor(value / this.stepDistance);
	        var diffStep = Math.abs(this.step - step);
	        if (diffStep > 0) {
	            this.step = step;
	            var nextId = Math.floor(stepRate / this.body.D) + this.targetRootIndex;
	            var nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
	            if (diffStep == 1) {
	                this.nextPos.copyTo(this.prevPos);
	                nextPos.copyTo(this.nextPos);
	            }
	            else if (diffStep > 1) {
	                this.nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
	                var prevId = nextId + Math.floor(this.stepDistance / this.body.D);
	                this.prevPos = this.getTargetPos(prevId, this.directionLR, this.endPointDistanceFromBody);
	            }
	        }
	        this.clear();
	        var br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
	        var r = (Math.cos(Math.PI + Math.PI * br) + 1) / 2;
	        r = r * r;
	        var a = (1 - r) * 0.6 + 0.4;
	        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
	        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;
	        this.lineStyle(1, 0x0000ff, a);
	        this.moveTo(this.prevPos.x, this.prevPos.y);
	        this.lineTo(this.nextPos.x, this.nextPos.y);
	        this.lineStyle(1, r == 1 ? 0xff0000 : 0x0000ff, r == 1 ? 1 : a);
	        this.drawRect(this.nextPos.x - 5, this.nextPos.y - 5, 10, 10);
	        var rootPos = this.body.bone[this.rootIndex];
	        var fromPos = this.getRootPos(this.rootIndex);
	        if (fromPos && rootPos) {
	            this.lineStyle();
	            this.beginFill(0x333333);
	            this.drawCircle(fromPos.x, fromPos.y, 3);
	            this.endFill();
	            this.lineStyle(1, 0x666666);
	            this.moveTo(rootPos.x, rootPos.y);
	            this.lineTo(fromPos.x, fromPos.y);
	            this.drawLegs(fromPos, this.nowPos);
	        }
	    };
	    Leg.prototype.getRootPos = function (baseId) {
	        var basePos = this.body.bone[baseId];
	        if (!basePos)
	            return null;
	        var pos1 = basePos;
	        var pos2 = this.body.bone[baseId + 1];
	        if (!pos2) {
	            pos1 = this.body.bone[baseId - 1];
	            pos2 = basePos;
	        }
	        var ddx = pos2.x - pos1.x;
	        var ddy = pos2.y - pos1.y;
	        var D = Math.sqrt(ddx * ddx + ddy * ddy);
	        var dx = ddx / D;
	        var dy = ddy / D;
	        return new pos_1.default(basePos.x + -this.directionLR * dy * this.rootPointDistanceFromBody, basePos.y + this.directionLR * dx * this.rootPointDistanceFromBody);
	    };
	    Leg.prototype.drawLegs = function (fromPos, targetPos) { };
	    Leg.prototype.getTargetPos = function (id, d, length) {
	        var bp = this.body.bone[id];
	        var fp = this.body.bone[id];
	        var tp = this.body.bone[id - 1];
	        if (!tp) {
	            tp = fp;
	            fp = this.body.bone[id + 1];
	        }
	        if (!tp || !fp || !bp)
	            return new pos_1.default(0, 0);
	        var ddx = tp.x - fp.x;
	        var ddy = tp.y - fp.y;
	        var D = Math.sqrt(ddx * ddx + ddy * ddy);
	        var dx = ddx / D;
	        var dy = ddy / D;
	        var vx = (d < 0) ? -dy : dy;
	        var vy = (d < 0) ? dx : -dx;
	        bp = bp.clone();
	        bp.x += vx * length;
	        bp.y += vy * length;
	        return bp;
	    };
	    return Leg;
	}(PIXI.Graphics));
	exports.Leg = Leg;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Pos = /** @class */ (function () {
	    function Pos(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Pos.prototype.clone = function () {
	        return new Pos(this.x, this.y);
	    };
	    Pos.prototype.distance = function (pos) {
	        return Math.sqrt((pos.x - this.x) * (pos.x - this.x) + (pos.y - this.y) * (pos.y - this.y));
	    };
	    Pos.prototype.copyTo = function (pos) {
	        pos.x = this.x;
	        pos.y = this.y;
	    };
	    return Pos;
	}());
	exports.default = Pos;


/***/ })
/******/ ]);