import p5 from 'p5';
import {Player} from '../Player/Player';
import {Inputs} from './Inputs';

type InputsObject = { [key: string]: string }

/**
 * Class for managing keys and inputs.
 * @class InputManager
 */
export class InputManager {
	isOnCamera: boolean;
	rotationZ: number;
	
	/**
	 * Creates a new InputManager.
	 * @param keysMap {Object<string, string>} - List of keys in the same order as {@link keys}, they can change.
	 */
	constructor(public keysMap: InputsObject) {
		
		this.isOnCamera = false;
		this.rotationZ = 0;
		
		let undefinedInputs: string[] = [];
		for (let key of Object.keys(keysMap)) {
			if ( !Inputs.hasOwnProperty(key)) {
				undefinedInputs.push(key);
			}
		}
		if (undefinedInputs.length === 0) {
			console.log(`[InputManagerLoad][Success] InputManager has loaded correctly.`);
		} else {
			console.log(`[InputManagerLoad][Error] InputManager has loaded incorrectly.`);
			console.table([Inputs, Object.keys(keysMap)]);
		}
	}
	
	/**
	 * Lets you change an input by the key passed.
	 * @param newKey {string} - A key in the keyboard.
	 * @param input {string} - The input to change.
	 */
	setKey(newKey: string, input: string) {
		if (Inputs.hasOwnProperty(input)) {
			this.keysMap[input] = newKey;
		} else {
			console.error(`[InputChange][Error] Cannot set input for ${input} as it doesn't exist.`);
		}
	}
	
	/**
	 * Lets you get the input from the {@link key}.
	 * @param key {string} - A key of the keyboard.
	 * @return {string} - The input.
	 */
	getInputWithKey(key: string): string {
		return Object.keys(this.keysMap).find(input => this.keysMap[input] === key);
	}
	
	step(p: p5, player: Player, camera: p5.Camera) {
		
		//@ts-ignore
		const movedX = p.movedX, movedY = p.movedY;
		
		if (this.isOnCamera) {
			camera.pan(-movedX * 0.01);
			camera.tilt(movedY * 0.01);
			this.rotationZ += p.map(movedX * Math.PI, -p.width / 2, p.width / 2, -Math.PI, Math.PI);
			
			for (let key of Object.keys(this.keysMap)) {
				if (p.keyIsDown(this.keysMap[key].charCodeAt(0))) {
					switch (key) {
						case 'move.toward':
							player.move(this.rotationZ, player.speed);
							break;
						
						case 'move.backward':
							player.move(this.rotationZ, -player.speed);
							break;
						
						case 'move.left':
							player.move(this.rotationZ - Math.PI / 2, player.speed);
							break;
						
						case 'move.right':
							player.move(this.rotationZ - Math.PI / 2, -player.speed);
							break;
						
						case 'move.up':
							player.position.y += player.speed;
							break;
						
						case 'move.down':
							player.position.y += -player.speed;
							break;
					}
				}
			}
		}
	}
}