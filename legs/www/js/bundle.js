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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
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


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var canvas_1 = __webpack_require__(2);
	var bugs_1 = __webpack_require__(3);
	var pos_1 = __webpack_require__(4);
	var Main = (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Main.prototype.init = function () {
	        this.body = new bugs_1.Body();
	        this.addChild(this.body);
	    };
	    Main.prototype.mousedown = function () {
	    };
	    Main.prototype.mouseup = function () {
	    };
	    Main.prototype.draw = function () {
	        this.body.setHead(new pos_1.default(this.mouse.x, this.mouse.y));
	    };
	    Main.prototype.resize = function (width, height) {
	    };
	    return Main;
	}(canvas_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Canvas = (function (_super) {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Canvas;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var pos_1 = __webpack_require__(4);
	var PosStack = (function (_super) {
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
	    return PosStack;
	}(pos_1.default));
	var Body = (function (_super) {
	    __extends(Body, _super);
	    function Body() {
	        var _this = _super.call(this) || this;
	        _this.interval = 10;
	        _this.D = 18;
	        _this.L = 30;
	        _this.d = 0;
	        _this.legs = [];
	        _this.canvas = new PIXI.Graphics();
	        _this.addChild(_this.canvas);
	        _this.legs.push(new Leg(_this, 120, 0, 8, "front", "left", 50, 0));
	        _this.legs.push(new Leg(_this, 120, 0, 8, "front", "right", 50, 60));
	        _this.legs.push(new Leg(_this, 120, 10, 10, "back", "left", 50, 60));
	        _this.legs.push(new Leg(_this, 120, 10, 10, "back", "right", 50, 0));
	        _this.legs.forEach(function (o) { return _this.addChild(o); });
	        return _this;
	    }
	    Body.prototype.setHead = function (pos) {
	        var _this = this;
	        var np = new PosStack(pos.x, pos.y);
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
	        this.canvas.lineStyle(1, 0xCCCCCC);
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
	                    _this.canvas.drawCircle(tp.x, tp.y, 2);
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
	var Leg = (function (_super) {
	    __extends(Leg, _super);
	    function Leg(body, stepDistance, targetRootIndex, rootIndex, directionFB, directionLR, distanceFromRoot, stepOffset) {
	        var _this = _super.call(this) || this;
	        _this.step = 0;
	        _this.sid2 = 0;
	        _this.c = 0xff5500;
	        _this.nowPos = new pos_1.default(0, 0);
	        _this.nextPos = new pos_1.default(0, 0);
	        _this.prevPos = new pos_1.default(0, 0);
	        _this.setBody(body);
	        _this.setDirectionLR(directionLR);
	        _this.setDirectionFB(directionFB);
	        _this.setStepDistance(stepDistance);
	        _this.setDistanceFromRoot(distanceFromRoot);
	        _this.setTargetRootIndex(targetRootIndex);
	        _this.setStepOffset(stepOffset);
	        _this.setRootIndex(rootIndex);
	        return _this;
	    }
	    Leg.prototype.setDistanceFromRoot = function (value) {
	        this.distanceFromRoot = value;
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
	    Leg.prototype.setDirectionFB = function (value) {
	        this.directionFB = Math.floor(value == "front" ? 1 : -1);
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
	            var nextPos = this.getTargetPos(nextId, this.directionLR, this.distanceFromRoot); //this.body.bone[nextId];
	            if (diffStep == 1) {
	                this.nextPos.copyTo(this.prevPos);
	                nextPos.copyTo(this.nextPos);
	            }
	            else if (diffStep > 1) {
	                this.nextPos = this.getTargetPos(nextId, this.directionLR, this.distanceFromRoot);
	                //this.body.bone[nextId].copyTo(this.nextPos);
	                var prevId = nextId + Math.floor(this.stepDistance / this.body.D);
	                this.prevPos = this.getTargetPos(prevId, this.directionLR, this.distanceFromRoot);
	            }
	        }
	        this.clear();
	        var br = (stepRate > this.stepDistanceHalf) ? 1 : halfStepRate / this.stepDistanceHalf;
	        var r = (Math.cos(Math.PI + Math.PI * br) + 1) / 2;
	        //r = Math.pow(r, 2);
	        this.nowPos.x = (this.nextPos.x - this.prevPos.x) * r + this.prevPos.x;
	        this.nowPos.y = (this.nextPos.y - this.prevPos.y) * r + this.prevPos.y;
	        this.lineStyle(1, 0xCCCCCC);
	        this.moveTo(this.prevPos.x, this.prevPos.y);
	        this.lineTo(this.nextPos.x, this.nextPos.y);
	        this.lineStyle(1, 0xCCCCCC);
	        this.drawRect(this.nextPos.x - 5, this.nextPos.y - 5, 10, 10);
	        this.drawRect(this.prevPos.x - 5, this.prevPos.y - 5, 10, 10);
	        this.lineStyle();
	        this.beginFill(this.c);
	        this.drawRect(this.nowPos.x - 2.5, this.nowPos.y - 2.5, 5, 5);
	        var fromPos = this.body.bone[this.rootIndex];
	        if (fromPos) {
	            this.beginFill(this.c * 0.2);
	            this.drawCircle(fromPos.x, fromPos.y, 5);
	            this.lineStyle(1, this.c * 0.4);
	            this.endFill();
	            this.drawLegs(fromPos, this.nowPos);
	        }
	    };
	    Leg.prototype.drawLegs = function (fromPos, targetPos) {
	        var poses = BugLegs.getPos(fromPos, targetPos, 60, 60, this.directionFB, this.directionLR);
	        this.moveTo(poses.begin.x, poses.begin.y);
	        this.lineTo(poses.middle.x, poses.middle.y);
	        this.lineTo(poses.end.x, poses.end.y);
	    };
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
	var BugLegs = (function () {
	    function BugLegs() {
	    }
	    BugLegs.getPos = function (fromPos, toPos, l1, l2, fb, lr) {
	        //const dr = fromVecPos.r + (this._isLeft ? Math.PI / 2 : -Math.PI / 2);
	        //fromPos.x += Math.cos(dr) * this._distanceFromRoot;
	        //fromPos.y += Math.sin(dr) * this._distanceFromRoot;
	        var r = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
	        var a = fromPos.distance(toPos);
	        var b = l1;
	        var c = l2;
	        var minA = a * 1.02;
	        if (b + c < minA) {
	            b = c / (b + c) * minA;
	            c = minA - b;
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
	    return BugLegs;
	}());


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	var Pos = (function () {
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
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Pos;


/***/ }
/******/ ]);