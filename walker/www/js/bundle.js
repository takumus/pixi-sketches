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
	        Object.keys(this.len).forEach(function (k) {
	            _this.len[k] *= 4;
	        });
	    };
	    Main.prototype.draw = function () {
	        var _a = this.pos, A = _a.A, B = _a.B, C = _a.C, D = _a.D, E = _a.E, F = _a.F, G = _a.G, H = _a.H;
	        var _b = this.len, AB = _b.AB, BC = _b.BC, DC = _b.DC, DF = _b.DF, CF = _b.CF, DE = _b.DE, BE = _b.BE, EG = _b.EG, FG = _b.FG, EH = _b.EH, GH = _b.GH;
	        this.canvas.clear();
	        A.x = this.size.width / 2;
	        A.y = this.size.height / 2;
	        D.x = A.x + 38.0 * 4;
	        D.y = A.y + 7.8 * 4;
	        this.cr += 0.05;
	        B.x = Math.cos(this.cr) * AB + A.x;
	        B.y = Math.sin(this.cr) * AB + A.y;
	        var bd = Math.sqrt((B.x - D.x) * (B.x - D.x) + (B.y - D.y) * (B.y - D.y));
	        var cdb = Math.acos((bd * bd + DC * DC - BC * BC) / (2 * bd * DC));
	        var tr1 = Math.atan2(B.y - D.y, B.x - D.x);
	        C.x = Math.cos(cdb + tr1) * DC + D.x;
	        C.y = Math.sin(cdb + tr1) * DC + D.y;
	        var cdf = Math.acos((DC * DC + DF * DF - CF * CF) / (2 * DC * DF));
	        var tr2 = cdb + tr1;
	        F.x = Math.cos(cdf + tr2) * DF + D.x;
	        F.y = Math.sin(cdf + tr2) * DF + D.y;
	        //const bd = Math.sqrt((B.x - D.x) * (B.x - D.x) + (B.y - D.y) * (B.y - D.y));
	        var bde = Math.acos((bd * bd + DE * DE - BE * BE) / (2 * bd * DE));
	        E.x = Math.cos(-bde + tr1) * DE + D.x;
	        E.y = Math.sin(-bde + tr1) * DE + D.y;
	        var ef = Math.sqrt((E.x - F.x) * (E.x - F.x) + (E.y - F.y) * (E.y - F.y));
	        var def = Math.acos((DE * DE + ef * ef - DF * DF) / (2 * DE * ef));
	        var feg = Math.acos((ef * ef + EG * EG - FG * FG) / (2 * ef * EG));
	        var tr3 = Math.atan2(F.y - E.y, F.x - E.x);
	        G.x = Math.cos(feg + tr3) * EG + E.x;
	        G.y = Math.sin(feg + tr3) * EG + E.y;
	        var geh = Math.acos((EG * EG + EH * EH - GH * GH) / (2 * EG * EH));
	        H.x = Math.cos(feg + tr3 + geh) * EH + E.x;
	        H.y = Math.sin(feg + tr3 + geh) * EH + E.y;
	        this.line(A, B);
	        this.line(B, C);
	        this.line(D, C);
	        this.line(D, F);
	        this.line(C, F);
	        this.line(B, E);
	        this.line(D, E);
	        this.line(E, G);
	        this.line(F, G);
	        this.line(G, H);
	        this.line(E, H);
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