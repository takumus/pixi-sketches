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
	    main.init();
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
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.cr = 0;
	        _this.len = {
	            AB: 15,
	            BC: 50,
	            DC: 41.5,
	            DF: 40.1,
	            CF: 55.8,
	            DE: 39.3,
	            BE: 61.9,
	            EG: 36.7,
	            FG: 39.4,
	            EH: 49.0,
	            GH: 65.7
	        };
	        _this.pos = {
	            A: _this.addPos(0, 0, "A"),
	            B: _this.addPos(0, 0, "B"),
	            C: _this.addPos(0, 0, "C"),
	            D: _this.addPos(0, 0, "D"),
	            E: _this.addPos(0, 0, "E"),
	            F: _this.addPos(0, 0, "F"),
	            G: _this.addPos(0, 0, "G"),
	            H: _this.addPos(0, 0, "H")
	        };
	        return _this;
	    }
	    Main.prototype.init = function () {
	        var _this = this;
	        Object.keys(this.len).forEach(function (k) { return _this.len[k] *= 4; });
	    };
	    Main.prototype.draw = function () {
	        var pos = this.pos;
	        var len = this.len;
	        pos.A.x = this.size.width / 2;
	        pos.A.y = this.size.height / 2;
	        //仮
	        pos.D.x = pos.A.x + 38.0 * 4;
	        pos.D.y = pos.A.y + 7.8 * 4;
	        //
	        this.cr += 0.05;
	        pos.B.x = Math.cos(this.cr) * len.AB + pos.A.x;
	        pos.B.y = Math.sin(this.cr) * len.AB + pos.A.y;
	        var bd = Math.sqrt((pos.B.x - pos.D.x) * (pos.B.x - pos.D.x) + (pos.B.y - pos.D.y) * (pos.B.y - pos.D.y));
	        var cdb = Math.acos((bd * bd + len.DC * len.DC - len.BC * len.BC) / (2 * bd * len.DC));
	        var tr1 = Math.atan2(pos.B.y - pos.D.y, pos.B.x - pos.D.x);
	        pos.C.x = Math.cos(cdb + tr1) * len.DC + pos.D.x;
	        pos.C.y = Math.sin(cdb + tr1) * len.DC + pos.D.y;
	        var cdf = Math.acos((len.DC * len.DC + len.DF * len.DF - len.CF * len.CF) / (2 * len.DC * len.DF));
	        var tr2 = cdb + tr1;
	        pos.F.x = Math.cos(cdf + tr2) * len.DF + pos.D.x;
	        pos.F.y = Math.sin(cdf + tr2) * len.DF + pos.D.y;
	        var bde = Math.acos((bd * bd + len.DE * len.DE - len.BE * len.BE) / (2 * bd * len.DE));
	        pos.E.x = Math.cos(-bde + tr1) * len.DE + pos.D.x;
	        pos.E.y = Math.sin(-bde + tr1) * len.DE + pos.D.y;
	        var ef = Math.sqrt((pos.E.x - pos.F.x) * (pos.E.x - pos.F.x) + (pos.E.y - pos.F.y) * (pos.E.y - pos.F.y));
	        var feg = Math.acos((ef * ef + len.EG * len.EG - len.FG * len.FG) / (2 * ef * len.EG));
	        var tr3 = Math.atan2(pos.F.y - pos.E.y, pos.F.x - pos.E.x);
	        pos.G.x = Math.cos(feg + tr3) * len.EG + pos.E.x;
	        pos.G.y = Math.sin(feg + tr3) * len.EG + pos.E.y;
	        var geh = Math.acos((len.EG * len.EG + len.EH * len.EH - len.GH * len.GH) / (2 * len.EG * len.EH));
	        pos.H.x = Math.cos(feg + tr3 + geh) * len.EH + pos.E.x;
	        pos.H.y = Math.sin(feg + tr3 + geh) * len.EH + pos.E.y;
	        this.canvas.clear();
	        this.line(pos.A, pos.B);
	        this.line(pos.B, pos.C);
	        this.line(pos.D, pos.C);
	        this.line(pos.D, pos.F);
	        this.line(pos.C, pos.F);
	        this.line(pos.B, pos.E);
	        this.line(pos.D, pos.E);
	        this.line(pos.E, pos.G);
	        this.line(pos.F, pos.G);
	        this.line(pos.G, pos.H);
	        this.line(pos.E, pos.H);
	    };
	    Main.prototype.addPos = function (x, y, name) {
	        var pos = new Pos(x, y, name);
	        ;
	        this.addChild(pos);
	        return pos;
	    };
	    Main.prototype.line = function () {
	        var _this = this;
	        var pos = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            pos[_i] = arguments[_i];
	        }
	        this.canvas.lineStyle(2, 0xCCCCCC);
	        pos.forEach(function (p, id) {
	            if (id == 0) {
	                _this.canvas.moveTo(p.x, p.y);
	            }
	            else {
	                _this.canvas.lineTo(p.x, p.y);
	            }
	        });
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
	var Pos = (function (_super) {
	    __extends(Pos, _super);
	    function Pos(x, y, name) {
	        var _this = _super.call(this) || this;
	        _this.x = x;
	        _this.y = y;
	        var style = new PIXI.TextStyle();
	        style.fontSize = 18;
	        style.fill = 0x999999;
	        style.align = "center";
	        _this.label = new PIXI.Text(name, style);
	        _this.label.x = 10;
	        _this.addChild(_this.label);
	        _this.marker = new PIXI.Graphics();
	        _this.marker.beginFill(0x0066ff);
	        _this.marker.drawCircle(0, 0, 5);
	        _this.addChild(_this.marker);
	        return _this;
	    }
	    return Pos;
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