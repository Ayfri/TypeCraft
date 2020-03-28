import {registerBlock} from '../Blocks';

/**
 * Represents a block.
 * @class {Block}
 */
export class Block {
	
	/**
	 * Creates a new block.
	 * @param model {number}
	 * @see {@link Models}
	 * @param name {string}
	 */
	constructor(
		public model: number,
		public name: string
	) {
		try {
			registerBlock(this);
			console.log(`[Registering][Success] Block ${name} valid.`);
		} catch (e) {
			console.log(`[Registering][Error] Block ${name} invalid !`);
			console.error(e);
		}
	}
}