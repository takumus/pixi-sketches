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
	var pos_1 = __webpack_require__(3);
	var Main = (function (_super) {
	    __extends(Main, _super);
	    function Main() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    Main.prototype.init = function () {
	    };
	    Main.prototype.draw = function () {
	        this.canvas.clear();
	        ShapeDrawer.drawLine(this.canvas, new pos_1.default(60, 100), new pos_1.default(this.mouse.x, this.mouse.y), 10, 60, 0xff0000, 100, ShapeDrawer.lineStyle.sin);
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
	var ShapeDrawer = (function () {
	    function ShapeDrawer() {
	    }
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
	    return ShapeDrawer;
	}());
	ShapeDrawer.lineStyle = {
	    normal: function (n) { return n; },
	    sin: function (n) { return (Math.cos(n * Math.PI + Math.PI) + 1) / 2; },
	    sineHalfB: function (n) { return Math.sin(n * Math.PI / 2); },
	    sineHalfA: function (n) { return Math.sin(n * Math.PI / 2 - Math.PI / 2) + 1; }
	};


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