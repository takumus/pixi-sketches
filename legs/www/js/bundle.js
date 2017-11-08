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
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true, resolution: window.devicePixelRatio, transparent: true });
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
	var drawer_1 = __webpack_require__(5);
	var Main = /** @class */ (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Main.prototype.init = function () {
	        this.bodyRenderer = new MyBodyRenderer();
	        this.bodyRenderer.scale.set(0.8, 0.8);
	        this.addChild(this.bodyRenderer);
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
	        var mx = this.mouse.x * 1 / this.bodyRenderer.scale.x;
	        var my = this.mouse.y * 1 / this.bodyRenderer.scale.x;
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
	        this.bodyRenderer.setOffset(o);
	        this.bodyRenderer.setHead(this.pp);
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
	        _this.rootPos = new pos_1.default(0, 0);
	        _this.middlePos = new pos_1.default(0, 0);
	        _this.endPos = new pos_1.default(0, 0);
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
	    MyLeg.prototype.calcLeg = function (fromPos, targetPos) {
	        var poses = this.getLegPos(fromPos, targetPos, this.l1l, this.l2l, this.directionFB, this.directionLR);
	        this.rootPos.x = poses.begin.x;
	        this.rootPos.y = poses.begin.y;
	        this.middlePos.x = poses.middle.x;
	        this.middlePos.y = poses.middle.y;
	        this.endPos.x = poses.end.x;
	        this.endPos.y = poses.end.y;
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
	var MyBodyRenderer = /** @class */ (function (_super) {
	    __extends(MyBodyRenderer, _super);
	    function MyBodyRenderer() {
	        var _this = _super.call(this) || this;
	        _this.body = new MyBody();
	        _this.canvas = new PIXI.Graphics();
	        _this.addChild(_this.canvas);
	        return _this;
	    }
	    MyBodyRenderer.prototype.setHead = function (o) {
	        var _this = this;
	        this.body.setHead(o);
	        this.canvas.clear();
	        this.canvas.lineStyle(1, 0xCCCCCC);
	        this.body.bone.forEach(function (p, id) {
	            if (id == 0) {
	                _this.canvas.moveTo(p.x, p.y);
	            }
	            else {
	                _this.canvas.lineTo(p.x, p.y);
	            }
	        });
	        this.body.bone.forEach(function (p, id) {
	            _this.canvas.beginFill(0x666666);
	            _this.canvas.drawCircle(p.x, p.y, 2);
	            _this.canvas.endFill();
	        });
	        this.canvas.lineStyle();
	        for (var i = 0; i < this.body.legs.length; i += 2) {
	            var l1 = this.body.legs[i];
	            var l2 = this.body.legs[i + 1];
	            drawer_1.ShapeDrawer.drawMuscleLine(this.canvas, [
	                {
	                    pos: l1.rootPos,
	                    radius: 21,
	                    ratio: 1
	                },
	                {
	                    pos: l1.middlePos,
	                    radius: 11,
	                    ratio: 1
	                },
	                {
	                    pos: l1.endPos,
	                    radius: 6,
	                    ratio: 1
	                }
	            ], [drawer_1.ShapeDrawer.lineStyle.sineHalfA, drawer_1.ShapeDrawer.lineStyle.sin], 0x666666, 5);
	            drawer_1.ShapeDrawer.drawMuscleLine(this.canvas, [
	                {
	                    pos: l2.rootPos,
	                    radius: 21,
	                    ratio: 1
	                },
	                {
	                    pos: l2.middlePos,
	                    radius: 11,
	                    ratio: 1
	                },
	                {
	                    pos: l2.endPos,
	                    radius: 6,
	                    ratio: 1
	                }
	            ], [drawer_1.ShapeDrawer.lineStyle.sineHalfA, drawer_1.ShapeDrawer.lineStyle.sin], 0x666666, 5);
	            drawer_1.ShapeDrawer.drawMuscleLine(this.canvas, [
	                {
	                    pos: l1.rootPos,
	                    radius: 20,
	                    ratio: 1
	                },
	                {
	                    pos: l1.middlePos,
	                    radius: 10,
	                    ratio: 1
	                },
	                {
	                    pos: l1.endPos,
	                    radius: 5,
	                    ratio: 1
	                }
	            ], [drawer_1.ShapeDrawer.lineStyle.sineHalfA, drawer_1.ShapeDrawer.lineStyle.sin], 0xffffff, 5);
	            drawer_1.ShapeDrawer.drawMuscleLine(this.canvas, [
	                {
	                    pos: l2.rootPos,
	                    radius: 20,
	                    ratio: 1
	                },
	                {
	                    pos: l2.middlePos,
	                    radius: 10,
	                    ratio: 1
	                },
	                {
	                    pos: l2.endPos,
	                    radius: 5,
	                    ratio: 1
	                }
	            ], [drawer_1.ShapeDrawer.lineStyle.sineHalfA, drawer_1.ShapeDrawer.lineStyle.sin], 0xffffff, 5);
	        }
	        this.body.legs.forEach(function (leg) {
	            ///*
	            var a = (1 - leg.moveProgress) * 0.6 + 0.4;
	            _this.canvas.lineStyle(1, 0x0000ff, a);
	            _this.canvas.moveTo(leg.beginMovePos.x, leg.beginMovePos.y);
	            _this.canvas.lineTo(leg.endMovePos.x, leg.endMovePos.y);
	            _this.canvas.lineStyle(1, leg.moveProgress == 1 ? 0xff0000 : 0x0000ff, leg.moveProgress == 1 ? 1 : a);
	            _this.canvas.drawRect(leg.endMovePos.x - 5, leg.endMovePos.y - 5, 10, 10);
	            //*/
	        });
	    };
	    MyBodyRenderer.prototype.setOffset = function (o) {
	        this.body.setOffset(o);
	    };
	    return MyBodyRenderer;
	}(PIXI.Container));
	var MyBody = /** @class */ (function (_super) {
	    __extends(MyBody, _super);
	    function MyBody() {
	        var _this = _super.call(this, 18, 60) || this;
	        _this.legs = [];
	        var offset = 0;
	        var d = 15;
	        _this.legs.push(new MyLeg(_this, 120, offset, offset + 8, "front", "left", 10, 50, 0 + d * 2, 60, 50));
	        _this.legs.push(new MyLeg(_this, 120, offset, offset + 8, "front", "right", 10, 50, 60 + d * 2, 60, 50));
	        _this.legs.push(new MyLeg(_this, 120, offset + 12, offset + 12, "back", "left", 20, 70, 60 + d * 1, 70, 80));
	        _this.legs.push(new MyLeg(_this, 120, offset + 12, offset + 12, "back", "right", 20, 70, 0 + d * 1, 70, 80));
	        _this.legs.push(new MyLeg(_this, 120, offset + 17, offset + 17, "back", "left", 10, 60, 0, 80, 90));
	        _this.legs.push(new MyLeg(_this, 120, offset + 17, offset + 17, "back", "right", 10, 60, 60, 80, 90));
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
	    MyBody.prototype.move = function (moved) {
	        this.legs.forEach(function (l) { return l.setMoveDistance(moved); });
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
	var Body = /** @class */ (function () {
	    function Body(boneLength, jointCount) {
	        this._jointCount = 60;
	        this.moved = 0;
	        this._boneLength = boneLength;
	        this._jointCount = jointCount;
	    }
	    Object.defineProperty(Body.prototype, "jointCount", {
	        get: function () {
	            return this._jointCount;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Body.prototype, "boneLength", {
	        get: function () {
	            return this._boneLength;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Body.prototype, "bone", {
	        get: function () {
	            return this._bone;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Body.prototype.setHead = function (pos) {
	        var _this = this;
	        var np = PosStack.fromPos(pos);
	        if (this.posStack) {
	            if (np.distance(this.posStack) > 0) {
	                this.moved += np.distance(this.posStack);
	                np.next = this.posStack;
	                this.posStack = np;
	            }
	        }
	        else {
	            this.posStack = np;
	        }
	        this._bone = [];
	        var pp = this.posStack;
	        var tp = this.posStack;
	        var body = [];
	        var _loop_1 = function (i) {
	            var ad = 0;
	            var nd = this_1._boneLength;
	            pp.forEach(function (p, id) {
	                if (id == 0)
	                    return true;
	                var dx = p.x - tp.x;
	                var dy = p.y - tp.y;
	                var d = Math.sqrt(dx * dx + dy * dy);
	                ad += d;
	                if (ad > _this._boneLength) {
	                    tp = new PosStack(tp.x + dx / d * nd, tp.y + dy / d * nd);
	                    _this._bone.push(tp.clone());
	                    body.push(tp.clone());
	                    nd = _this._boneLength;
	                    return false;
	                }
	                else {
	                    pp = tp = p;
	                    nd = _this._boneLength - ad;
	                }
	                return true;
	            });
	        };
	        var this_1 = this;
	        for (var i = 0; i < this._jointCount; i++) {
	            _loop_1(i);
	        }
	        if (pp.next && pp.next.next) {
	            pp.next.next = null;
	        }
	        this.move(this.moved);
	    };
	    Body.prototype.move = function (move) {
	    };
	    return Body;
	}());
	exports.Body = Body;
	var Leg = /** @class */ (function () {
	    function Leg(body) {
	        this.step = 0;
	        this.nowPos = new pos_1.default(0, 0);
	        this.nextPos = new pos_1.default(0, 0);
	        this.prevPos = new pos_1.default(0, 0);
	        this._beginMovePos = new pos_1.default(0, 0);
	        this._endMovePos = new pos_1.default(0, 0);
	        this.setBody(body);
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
	            var nextId = Math.floor(stepRate / this.body.jointCount) + this.targetRootIndex;
	            var nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
	            if (diffStep == 1) {
	                this.nextPos.copyTo(this.prevPos);
	                nextPos.copyTo(this.nextPos);
	            }
	            else if (diffStep > 1) {
	                this.nextPos = this.getTargetPos(nextId, this.directionLR, this.endPointDistanceFromBody);
	                var prevId = nextId + Math.floor(this.stepDistance / this.body.jointCount);
	                this.prevPos = this.getTargetPos(prevId, this.directionLR, this.endPointDistanceFromBody);
	            }
	        }
	        var br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
	        var r = (Math.cos(Math.PI + Math.PI * br) + 1) / 2;
	        r = Math.pow(r, 1.5);
	        this._moveProgress = r;
	        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
	        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;
	        this._beginMovePos.x = this.prevPos.x;
	        this._beginMovePos.y = this.prevPos.y;
	        this._endMovePos.x = this.nextPos.x;
	        this._endMovePos.y = this.nextPos.y;
	        var rootPos = this.body.bone[this.rootIndex];
	        var fromPos = this.getRootPos(this.rootIndex);
	        if (fromPos && rootPos)
	            this.calcLeg(fromPos, this.nowPos);
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
	    Leg.prototype.calcLeg = function (fromPos, targetPos) { };
	    Object.defineProperty(Leg.prototype, "moveProgress", {
	        get: function () {
	            return this._moveProgress;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Leg.prototype, "beginMovePos", {
	        get: function () {
	            return this._beginMovePos;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Leg.prototype, "endMovePos", {
	        get: function () {
	            return this._endMovePos;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Leg.prototype.getTargetPos = function (id, d, length) {
	        var bp = this.body.bone[id];
	        var fp = bp;
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
	}());
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


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var ShapeDrawer = /** @class */ (function () {
	    function ShapeDrawer() {
	    }
	    ShapeDrawer.drawMuscleLine = function (graphics, kelps, styles, color, resolution) {
	        for (var i = 0; i < kelps.length; i++) {
	            var fk = kelps[i];
	            if (i < kelps.length - 1) {
	                var tk = kelps[i + 1];
	                this._drawLine2(graphics, fk, tk, color, resolution, styles[i]);
	            }
	            graphics.lineStyle();
	            graphics.beginFill(color);
	            graphics.drawCircle(fk.pos.x, fk.pos.y, fk.radius);
	            graphics.endFill();
	        }
	    };
	    ShapeDrawer._drawLine2 = function (graphics, fromKelp, toKelp, color, resolution, style) {
	        var dx = toKelp.pos.x - fromKelp.pos.x;
	        var dy = toKelp.pos.y - fromKelp.pos.y;
	        var d = Math.sqrt(dx * dx + dy * dy);
	        var vx = dx / d;
	        var vy = dy / d;
	        graphics.beginFill(color);
	        var vxA = -vy;
	        var vyA = vx;
	        var dr = toKelp.radius - fromKelp.radius;
	        for (var a = 0; a <= resolution; a++) {
	            var r = a / resolution;
	            var rr = style(r);
	            var radius = fromKelp.radius + dr * rr;
	            var x = fromKelp.pos.x + dx * r + vxA * radius;
	            var y = fromKelp.pos.y + dy * r + vyA * radius;
	            if (a == 0) {
	                graphics.moveTo(x, y);
	                continue;
	            }
	            graphics.lineTo(x, y);
	        }
	        var vxB = vy;
	        var vyB = -vx;
	        for (var b = 0; b <= resolution; b++) {
	            var r = (1 - b / resolution);
	            var rr = style(r);
	            var radius = fromKelp.radius + dr * rr;
	            var x = fromKelp.pos.x + dx * r + vxB * radius;
	            var y = fromKelp.pos.y + dy * r + vyB * radius;
	            graphics.lineTo(x, y);
	        }
	    };
	    ShapeDrawer.drawLine = function (graphics, fromPos, toPos, fromThickness, toThickness, color, boneLength, style) {
	        if (style === void 0) { style = ShapeDrawer.lineStyle.normal; }
	        var dx = toPos.x - fromPos.x;
	        var dy = toPos.y - fromPos.y;
	        var D = Math.sqrt(dx * dx + dy * dy);
	        var ii = 1 / boneLength;
	        for (var i = 0; i < 1; i += ii) {
	            this._drawLine(graphics, fromPos, dx, dy, fromThickness, toThickness, color, style, i);
	        }
	        this._drawLine(graphics, fromPos, dx, dy, fromThickness, toThickness, color, style, 1);
	        graphics.lineStyle();
	        graphics.beginFill(color);
	        graphics.drawCircle(fromPos.x, fromPos.y, fromThickness / 2);
	        graphics.drawCircle(toPos.x, toPos.y, toThickness / 2);
	    };
	    ShapeDrawer._drawLine = function (graphics, fromPos, dx, dy, fromThickness, toThickness, color, style, i) {
	        var dt = toThickness - fromThickness;
	        graphics.lineStyle(fromThickness + dt * style(i), color);
	        if (i == 0) {
	            graphics.moveTo(fromPos.x, fromPos.y);
	        }
	        else {
	            graphics.lineTo(fromPos.x + dx * i, fromPos.y + dy * i);
	        }
	    };
	    ShapeDrawer.lineStyle = {
	        normal: function (n) { return n; },
	        sin: function (n) { return (Math.cos(n * Math.PI + Math.PI) + 1) / 2; },
	        sineHalfB: function (n) { return Math.sin(n * Math.PI / 2); },
	        sineHalfA: function (n) { return Math.sin(n * Math.PI / 2 - Math.PI / 2) + 1; }
	    };
	    return ShapeDrawer;
	}());
	exports.ShapeDrawer = ShapeDrawer;


/***/ })
/******/ ]);