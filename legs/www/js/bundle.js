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
	    main.mousePressed = true;
	    main.mousedown();
	};
	var mousemove = function (e) {
	    main.mouse.x = e.clientX;
	    main.mouse.y = e.clientY;
	    main.mousemove();
	};
	var mouseup = function (e) {
	    main.mousePressed = false;
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
	        _this.interval = 10;
	        return _this;
	    }
	    Main.prototype.init = function () {
	        this.poses2 = [];
	    };
	    Main.prototype.draw = function () {
	    };
	    Main.prototype.mousedown = function () {
	    };
	    Main.prototype.mouseup = function () {
	    };
	    Main.prototype.mousemove = function () {
	        var _this = this;
	        var mouse = new PosStack(this.mouse.x, this.mouse.y);
	        if (!this.poses) {
	            this.poses = mouse;
	        }
	        else {
	            mouse.next = this.poses;
	        }
	        this.poses = mouse;
	        var ni = 1;
	        var fp = this.poses;
	        var np = this.poses;
	        var pp = fp;
	        this.poses2 = [];
	        var D = 50;
	        var DD = D * D;
	        var len = 10;
	        var _loop_1 = function (i) {
	            var add = 0;
	            np.forEach(function (p, id) {
	                var dx = p.x - pp.x;
	                var dy = p.y - pp.y;
	                var dd = dx * dx + dy * dy;
	                pp = p;
	                add += dd;
	                if (add > DD) {
	                    var d = Math.sqrt(dd);
	                    var diff = Math.sqrt(add - DD);
	                    var tx = p.x + dx / d * diff;
	                    var ty = p.y + dy / d * diff;
	                    pp = new Pos(tx, ty);
	                    _this.poses2.push(pp.clone());
	                    return false;
	                }
	                np = p;
	                return true;
	            });
	        };
	        for (var i = 0; i < len; i++) {
	            _loop_1(i);
	        }
	        //if (np.next) np.next.next = null;
	        this.canvas.clear();
	        this.canvas.lineStyle(3, 0x666666);
	        this.poses2.forEach(function (p, id) {
	            if (id == 0) {
	                _this.canvas.moveTo(p.x, p.y);
	            }
	            else {
	                _this.canvas.lineTo(p.x, p.y);
	            }
	        });
	        this.canvas.lineStyle();
	        this.poses2.forEach(function (p, id) {
	            _this.canvas.beginFill(0xCCCCCC);
	            _this.canvas.drawCircle(p.x, p.y, 8);
	            _this.canvas.endFill();
	        });
	        var idl = 0;
	        this.poses.forEach(function (p, id) {
	            idl = id;
	            return true;
	        });
	        console.log(idl);
	    };
	    Main.prototype.resize = function (width, height) {
	    };
	    return Main;
	}(canvas_1.default));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Main;
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