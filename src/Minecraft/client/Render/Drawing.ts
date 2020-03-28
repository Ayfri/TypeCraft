import p5 from 'p5';
import {Block} from '../../registry/Blocks/Block';
import {BlockPos} from '../../utils/BlockPos';
import {Player} from '../Player/Player';
import {Models} from './Models';
import {Textures} from './Textures';
import {Tile} from './Tile';


export class Drawer {
	/**
	 * All the tiles that are drawed.
	 * @type {Tile[]}
	 */
	private tiles: Tile[];
	
	constructor(public p: p5, public player: Player) {
	}
	
	/**
	 *
	 * Draw a block with his texture/model/position.
	 * @param p {Object}
	 * @param block {Block}
	 * @param position {BlockPos}
	 * @param playerPosition
	 * @see {@link p5}
	 */
	drawBlock(p: p5, block: Block, position: BlockPos, playerPosition: BlockPos) {
		switch (block.model) {
			case Models.block:
				const texture = Textures.get(`blocks/${block.name}`);
				
				p.noSmooth();
				p.strokeWeight(0.7);
				p.imageMode(p.CENTER);
				p.texture(texture);
				p.textureMode(p.NORMAL);
				let x = position.x * 100 + playerPosition.x,
				    y = position.y * 100 + playerPosition.y,
				    z = position.z * 100 + playerPosition.z;
				
				p.push();
				p.translate(x, y, z);
				
				if ( !this.tiles.some(b => b.position.x === position.x && b.position.y + 1 === position.y && b.position.z === b.position.z)) {
					
					p.quad(x - 50, y - 50, z - 50, x + 50, y - 50, z - 50, x + 50, y - 50, z + 50, x - 50, y - 50, z + 50);
				}
				if ( !this.tiles.some(b => b.position.x === position.x && b.position.y - 1 === position.y && b.position.z === b.position.z)) {
					p.quad(x - 50, y + 50, z - 50, x + 50, y + 50, z - 50, x + 50, y + 50, z + 50, x - 50, y + 50, z + 50);
					
				}
				if ( !this.tiles.some(b => b.position.x === position.x && b.position.y === position.y && b.position.z + 1 === b.position.z)) {
					p.quad(x - 50, y - 50, z - 50, x + 50, y - 50, z - 50, x + 50, y + 50, z - 50, x - 50, y + 50, z - 50);
					
				}
				if ( !this.tiles.some(b => b.position.x === position.x && b.position.y === position.y && b.position.z - 1 === b.position.z)) {
					p.quad(x - 50, y - 50, z + 50, x + 50, y - 50, z + 50, x + 50, y + 50, z + 50, x - 50, y + 50, z + 50);
					
				}
				if ( !this.tiles.some(b => b.position.x + 1 === position.x && b.position.y === position.y && b.position.z === b.position.z)) {
					p.quad(x + 50, y - 50, z - 50, x + 50, y - 50, z + 50, x + 50, y + 50, z + 50, x + 50, y + 50, z - 50);
					
				}
				if ( !this.tiles.some(b => b.position.x - 1 === position.x && b.position.y === position.y && b.position.z === b.position.z)) {
					p.quad(x - 50, y - 50, z - 50, x - 50, y - 50, z + 50, x - 50, y + 50, z + 50, x - 50, y + 50, z - 50);
					
				}
				p.pop();
				break;
			
			case Models.semiBloc:
				break;
			
			case Models.stairBlock:
				break;
		}
	}
	
	addTile(tile: Tile) {
		this.tiles.push(tile);
	}
	
	removeTile(tile: Tile) {
		if (this.tiles.includes(tile)) {
			this.tiles.splice(this.tiles.indexOf(tile), 1);
		} else {
			console.log(`[RemoveTile][Error] Tried to delete ${tile} not in tiles.`);
		}
	}
	
	/**
	 * Draw all the tiles on the screen.
	 * Must be executed every frame.
	 */
	drawTiles() {
		for (const tile of this.tiles) {
			this.drawBlock(this.p, tile.block, tile.position, this.player.position);
		}
	}
	
	drawCoords() {
		this.p.textSize(25);
		this.p.text(`x : ${this.player.position.x / 100}`, -this.p.width / 2 + 50, this.p.height / 2 - 50);
		this.p.text(`y : ${this.player.position.y / 100}`, -this.p.width / 2 + 50, this.p.height / 2 - 75);
		this.p.text(`z : ${this.player.position.z / 100}`, -this.p.width / 2 + 50, this.p.height / 2 - 100);
		this.p.text(`fps : ${Math.round(this.p.frameRate())}`, -this.p.width / 2 + 50, this.p.height / 2 - 140);
	}
}