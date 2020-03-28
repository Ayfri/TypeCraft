import p5 from 'p5';
//@ts-ignore
import fontURL from '../OpenSans-Regular.ttf';
import {InputManager} from './client/Inputs/InputManager';
import {Player} from './client/Player/Player';
import {Drawer} from './client/Render/Drawing';
import {initTextures, Textures} from './client/Render/Textures';
import {Tile} from './client/Render/Tile';
import {registerAllBlocks} from './registry/Blocks';
import {Blocks} from './registry/Registry';
import {BlockPos} from './utils/BlockPos';

export class App {
	public readonly player: Player;
	public readonly camera: p5.Camera;
	public readonly inputManager: InputManager;
	public readonly drawer: Drawer;
	
	constructor(public readonly p: p5) {
		this.player = new Player(new BlockPos(1, 0, 0, this.p), 2);
		this.inputManager = new InputManager({
			'move.toward'  : 'Z',
			'move.backward': 'S',
			'move.left'    : 'Q',
			'move.right'   : 'D',
			'move.up'      : 'E',
			'move.down'    : 'A'
		});
		this.drawer = new Drawer(p, this.player);
		this.camera = this.p.createCamera();
	}
	
	step() {
		this.p.background(93, 193, 221);
		this.drawer.drawTiles();
		this.drawer.drawCoords();
		this.inputManager.step(this.p, this.player, this.camera);
	}
	
	init() {
		const font = this.p.loadFont(fontURL);
		this.p.textFont(font);
		this.p.angleMode(this.p.RADIANS);
		
		registerAllBlocks();
		initTextures(this.p);
		console.log(Textures);
		
		const dirt = new Tile(new BlockPos(0, 0, 0, this.p), Blocks.get('dirt'));
		this.drawer.addTile(dirt);
		
		console.log(`[Initialization][Success] Init phase performed.`);
	}
}