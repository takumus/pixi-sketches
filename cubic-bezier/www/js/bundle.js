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
	var bezier_1 = __webpack_require__(3);
	var Main = (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Main.prototype.init = function () {
	        this.t = 0;
	        this.cbs = [];
	        this.cbs.push(bezier_1.default(0.455, 0.03, 0.515, 0.955)); //easeInOutQuad
	        this.cbs.push(bezier_1.default(0.77, 0, 0.175, 1)); //easeInOutQuart
	        this.cbs.push(bezier_1.default(1, 0, 0, 1)); //easeInOutExpo
	        this.cbs.push(bezier_1.default(0.68, -0.55, 0.265, 1.55)); //easeInOutBack
	    };
	    Main.prototype.draw = function () {
	        var _this = this;
	        this.t += this.mousePressed ? (this.mouse.x / this.size.width) * 2 : 1;
	        var t = this.t % 60 / 60;
	        var iy = this.size.height * 0.5 / this.cbs.length;
	        var w = this.size.width * 0.5;
	        var bx = this.size.width * 0.25;
	        var by = this.size.height * 0.25 + iy / 2;
	        this.canvas.clear();
	        this.canvas.lineStyle(20, 0xCCCCCC);
	        this.canvas.moveTo(bx, 0);
	        this.canvas.lineTo(bx, this.size.height);
	        this.canvas.moveTo(bx + w, 0);
	        this.canvas.lineTo(bx + w, this.size.height);
	        this.canvas.lineStyle();
	        this.cbs.forEach(function (cb, id) {
	            _this.canvas.beginFill(0x0000ff);
	            var r = cb(t);
	            if (Math.floor(_this.t / 60) % 2 == 0)
	                r = 1 - r;
	            _this.canvas.drawRect(bx + r * w - 10, by + id * iy, 20, 20);
	        });
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
/***/ function(module, exports) {

	"use strict";
	function CubicBezier(p1x, p1y, p2x, p2y, res) {
	    if (res === void 0) { res = 20; }
	    var xList = [];
	    var tList = [];
	    p1y = 1 - p1y;
	    p2y = 1 - p2y;
	    for (var i = 0; i <= res; i++) {
	        var t = i / res;
	        xList.push(bezier(t, 0, p1x, p2x, 1));
	        tList.push(t);
	    }
	    return function (x) {
	        x = x < 0 ? 0 : x > 1 ? 1 : x;
	        var i = search(xList, res, x);
	        var ax = xList[i];
	        var bx = xList[i + 1];
	        var at = tList[i];
	        var bt = tList[i + 1];
	        return 1 - bezier(
	        //tを計算
	        (x - ax) / (bx - ax) * (bt - at) + at, 
	        //yを求める
	        1, p1y, p2y, 0);
	    };
	}
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = CubicBezier;
	//2分探索もどきで探索
	function search(arr, len, n) {
	    if (n == 0)
	        return 0;
	    var l = 0;
	    var r = len - 1;
	    while (l <= r) {
	        var m = ~~((l + r) * 0.5);
	        if (arr[m] < n) {
	            l = m + 1;
	        }
	        else {
	            r = m - 1;
	        }
	    }
	    return r;
	}
	// maximaで求めたらこうなったベジェ関数。
	function bezier(t, p0, p1, p2, p3) {
	    var mt = 1 - t;
	    return p3 * t * t * t + 3 * mt * p2 * t * t + 3 * mt * mt * p1 * t + mt * mt * mt * p0;
	}


/***/ }
/******/ ]);