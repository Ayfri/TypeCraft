import p5 from 'p5';
import {App} from './Minecraft/App';

function sketch(p: p5) {
	let Minecraft: App = null;
	p.setup = () => {
		p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL);
		console.log('[P5][Success] Starting canvas.');
		
		Minecraft = new App(p);
	};
	
	p.draw = () => {
		Minecraft.step();
	};
	
	p.mousePressed = () => {
		if ( !Minecraft.inputManager.isOnCamera) {
			Minecraft.inputManager.isOnCamera = true;
			//@ts-ignore
			p.requestPointerLock();
		}
	};
	
	p.keyPressed = () => {
		if (p.keyCode === p.ESCAPE && Minecraft.inputManager.isOnCamera) {
			Minecraft.inputManager.isOnCamera = false;
			//@ts-ignore
			p.exitPointerLock();
		}
	};
}

document.addEventListener('DOMContentLoaded', async (): Promise<p5> => {
	return new p5(p => sketch(p), document.getElementById('p5'));
});