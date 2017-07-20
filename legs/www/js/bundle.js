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
	var Main = (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Main.prototype.init = function () {
	        this.body = new Body();
	        this.addChild(this.body);
	    };
	    Main.prototype.mousedown = function () {
	    };
	    Main.prototype.mouseup = function () {
	    };
	    Main.prototype.draw = function () {
	        this.body.setHead(new Pos(this.mouse.x, this.mouse.y));
	    };
	    Main.prototype.resize = function (width, height) {
	    };
	    return Main;
	}(canvas_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;
	var Body = (function (_super) {
	    __extends(Body, _super);
	    function Body() {
	        var _this = _super.call(this) || this;
	        _this.interval = 10;
	        _this.D = 30;
	        _this.L = 20;
	        _this.d = 0;
	        _this.canvas = new PIXI.Graphics();
	        _this.addChild(_this.canvas);
	        _this.leg = new Leg(_this, 200, _this.D);
	        _this.leg2 = new Leg(_this, 200, _this.D);
	        _this.leg.setRootIndex(2);
	        _this.leg2.setRootIndex(2);
	        _this.addChild(_this.leg, _this.leg2);
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
	        this.leg.setMoveDistance(this.d);
	        //this.leg2.setMoveDistance(this.d + 100);
	    };
	    return Body;
	}(PIXI.Container));
	var Leg = (function (_super) {
	    __extends(Leg, _super);
	    function Leg(body, stepDistance, boneDistance) {
	        var _this = _super.call(this) || this;
	        _this.sid = 0;
	        _this.sid2 = 0;
	        _this.c = Math.random() * 0xffffff;
	        _this.setBody(body);
	        _this.setStepDistance(stepDistance);
	        _this.setBoneDistance(boneDistance);
	        return _this;
	    }
	    Leg.prototype.setBody = function (body) {
	        this.body = body;
	    };
	    Leg.prototype.setStepDistance = function (stepDistance) {
	        this.stepDistance = stepDistance;
	        this.stepDistanceHalf = stepDistance / 2;
	    };
	    Leg.prototype.setBoneDistance = function (boneDistance) {
	        this.boneDistance = boneDistance;
	    };
	    Leg.prototype.setRootIndex = function (id) {
	        this.rootIndex = id;
	    };
	    Leg.prototype.setMoveDistance = function (distance) {
	        var step = distance % this.stepDistance;
	        var halfStep = step % this.stepDistanceHalf;
	        var sid = Math.floor(distance / this.stepDistance);
	        if (this.sid != sid) {
	            this.sid = sid;
	            var id = Math.floor(step / this.boneDistance);
	            this.tp2 = this.tp ? this.tp.clone() : null;
	            this.tp = this.body.bone[id].clone();
	        }
	        this.clear();
	        if (this.tp) {
	            this.beginFill(this.c);
	            this.drawCircle(this.tp.x, this.tp.y, 10);
	        }
	        if (this.tp2) {
	            this.beginFill(this.c);
	            this.drawCircle(this.tp2.x, this.tp2.y, 20);
	        }
	        var p = this.body.bone[this.rootIndex];
	        if (p) {
	            this.beginFill(this.c);
	            this.drawRect(this.body.bone[this.rootIndex].x - 5, this.body.bone[this.rootIndex].y - 5, 10, 10);
	        }
	        console.log(Math.floor(halfStep), Math.floor(step));
	    };
	    return Leg;
	}(PIXI.Graphics));
	var Pos = (function () {
	    function Pos(x, y) {
	        this.x = x;
	        this.y = y;
	    }
	    Pos.prototype.distance = function (pos) {
	        return Math.sqrt((pos.x - this.x) * (pos.x - this.x) + (pos.y - this.y) * (pos.y - this.y));
	    };
	    Pos.prototype.clone = function () {
	        return new Pos(this.x, this.y);
	    };
	    return Pos;
	}());
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
	}(Pos));


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


/***/ }
/******/ ]);