import {Block} from '../../registry/Blocks/Block';
import {BlockPos} from '../../utils/BlockPos';


/**
 * Represents a block in the client.
 * @class {Tile}
 * @exemple
 * import {Tile} from './Tile';
 * import {BlockPos} from '../utils/BlockPos';
 * import {Blocks} from '../registry/Blocks';
 * const tile = new Tile(new BlockPos(1, 1, 1), Blocks.get('tilename'));
 */
export class Tile {
	public texture: Promise<File>;
	
	
	/**
	 * Creates a new Tile.
	 * @param position {BlockPos}
	 * @param block {Block}
	 */
	constructor(readonly position: BlockPos, readonly block: Block) {
		this.texture = import(`../../../assets/textures/blocks/${block.name}.png`);
		
		if (block) {
			console.log(`[Rendering][Success] Loading ${this.block.name} block.`);
		} else {
			throw new Error(`[Rendering][Errored] The block that you tried to load isn't in the registry.`);
		}
	}
}