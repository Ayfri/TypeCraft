import {Models} from '../../client/Render/Models';
import {Block} from '../../registry/Blocks/Block';


/**
 * Represents a dirt block.
 * @class {Dirt} - A dirt block.
 * @extends {Block} - A block.
 * @see {@link Block}
 */
export class Dirt extends Block {
	constructor() {
		super(Models.block, 'dirt');
	}
}