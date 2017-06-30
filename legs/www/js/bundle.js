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
	    window.addEventListener('mousedown', mousedown);
	    window.addEventListener('mouseup', mouseup);
	    window.addEventListener('mousemove', mousemove);
	    stage.addChild(main);
	    draw();
	    resize();
	};
	var ppos = 0;
	var mousedown = function (e) {
	    main.mouse.x = e.clientX;
	    main.mouse.y = e.clientY;
	    main.mousedown();
	};
	var mousemove = function (e) {
	    main.mouse.x = e.clientX;
	    main.mouse.y = e.clientY;
	    main.mousemove();
	};
	var mouseup = function (e) {
	    main.mouseup();
	};
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
	    };
	    Main.prototype.draw = function () {
	    };
	    Main.prototype.mousedown = function () {
	    };
	    Main.prototype.mouseup = function () {
	    };
	    Main.prototype.mousemove = function () {
	        this.canvas.clear();
	        this.canvas.beginFill(0xff0000);
	        this.canvas.drawRect(this.mouse.x - 50, this.mouse.y - 50, 100, 100);
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


/***/ }
/******/ ]);