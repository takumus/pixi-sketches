import Main from '../src/main';
let renderer:PIXI.WebGLRenderer|PIXI.CanvasRenderer;
const stage:PIXI.Container = new PIXI.Container();
let canvas:HTMLCanvasElement;
let stageWidth:number = 0, stageHeight:number = 0;
const main = new Main();
const init = ()=> {
	renderer = PIXI.autoDetectRenderer(800, 800, {antialias: true, resolution:2, transparent:true});
	canvas = <HTMLCanvasElement>document.getElementById("content");
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
}
let ppos = 0;
const mousedown = (e: MouseEvent) => {
	main.mouse.x = e.clientX;
	main.mouse.y = e.clientY;
	main.mousePressed = true;
	main.mousedown();
}
const mousemove = (e: MouseEvent) => {
	main.mouse.x = e.clientX;
	main.mouse.y = e.clientY;
	main.mousemove();
}
const mouseup = (e: MouseEvent) => {
	main.mousePressed = false;
	main.mouseup();
}
const draw = ()=> {
	requestAnimationFrame(draw);
	main.draw();
	TWEEN.update();
	renderer.render(stage);
}
const resize = ()=> {
	const width:number = canvas.offsetWidth;
	const height:number = canvas.offsetHeight;
	stageWidth = width;
	stageHeight = height;
	main.size.width = width;
	main.size.height = height;
	main.resize(width, height);
	renderer.resize(width, height);
}

window.onload = init;