import {Block} from './Blocks/Block';
import {Dirt} from './Blocks/Dirt';
import {Blocks} from './Registry';

/**
 * Lets you register one block at a time.
 * @param block {Block} - The block you want to register.
 */
export function registerBlock(block: Block) {
	Blocks.set(block.name, block);
	console.log(`[Registering][Success] Block ${block.name} registered.`);
}

/**
 * Lets you register all the blocks by creating instances.
 */
export function registerAllBlocks() {
	new Dirt();
}
