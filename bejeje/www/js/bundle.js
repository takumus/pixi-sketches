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
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true, resolution: 2, transparent: true });
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
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.t = 0;
	        return _this;
	    }
	    Main.prototype.init = function () {
	        var _this = this;
	        this.pos = [];
	        this.pos.push(new Point(30, 600));
	        this.pos.push(new Point(60, 150));
	        this.pos.push(new Point(900, 60));
	        this.pos.push(new Point(1100, 600));
	        this.pos.forEach(function (p) { return _this.addChild(p); });
	    };
	    Main.prototype.draw = function () {
	        this.t += 0.02;
	        var t = (Math.cos(this.t) + 1) / 2;
	        var c = this.canvas;
	        var p = this.pos;
	        var p0x = p[0].x; //始点x
	        var p0y = p[0].y; //始点y
	        var p1x = p[1].x; //cp1x
	        var p1y = p[1].y; //cp1y
	        var p2x = p[2].x; //cp2x
	        var p2y = p[2].y; //cp2y
	        var p3x = p[3].x; //終点x
	        var p3y = p[3].y; //終点y
	        var bp = this.getBezier(t, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
	        c.clear();
	        c.lineStyle(10, 0xff0000, 0.3);
	        var length = 50;
	        for (var i = 0; i <= length; i++) {
	            var tt = i / length;
	            var bbp = this.getBezier(tt, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);
	            if (i == 0) {
	                c.moveTo(bbp.x, bbp.y);
	            }
	            else {
	                c.lineTo(bbp.x, bbp.y);
	            }
	        }
	        c.lineStyle(2, 0x000000, 0.3);
	        c.moveTo(p0x, p0y);
	        c.lineTo(p1x, p1y);
	        c.lineTo(p2x, p2y);
	        c.lineTo(p3x, p3y);
	        c.lineStyle();
	        c.beginFill(0x0000ff);
	        c.drawCircle(bp.x, bp.y, 10);
	        c.endFill();
	    };
	    Main.prototype.getBezier = function (t, p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y) {
	        var mt = 1 - t;
	        return {
	            x: p3x * t * t * t + 3 * mt * p2x * t * t + 3 * mt * mt * p1x * t + mt * mt * mt * p0x,
	            y: p3y * t * t * t + 3 * mt * p2y * t * t + 3 * mt * mt * p1y * t + mt * mt * mt * p0y
	        };
	    };
	    Main.prototype.mousedown = function () {
	    };
	    Main.prototype.mouseup = function () {
	    };
	    Main.prototype.mousemove = function () {
	    };
	    Main.prototype.resize = function (width, height) {
	    };
	    return Main;
	}(canvas_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;
	var Point = (function (_super) {
	    __extends(Point, _super);
	    function Point(x, y, c) {
	        if (c === void 0) { c = 0xff0000; }
	        var _this = _super.call(this) || this;
	        _this.x = x;
	        _this.y = y;
	        var g = new PIXI.Graphics();
	        g.beginFill(c);
	        g.drawCircle(0, 0, 10);
	        _this.addChild(g);
	        _this.interactive = true;
	        var drag = false;
	        var vx = 0;
	        var vy = 0;
	        _this.on("mousedown", function () {
	            drag = true;
	        });
	        _this.on("mousemove", function (e) {
	            if (drag) {
	                _this.x = e.data.global.x;
	                _this.y = e.data.global.y;
	            }
	        });
	        _this.on("mouseup", function () {
	            drag = false;
	        });
	        _this.on("mouseupoutside", function () {
	            drag = false;
	        });
	        return _this;
	    }
	    return Point;
	}(PIXI.Container));


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