import p5 from 'p5';

/**
 * Sets out the position of a block.
 * @class BlockPos
 */
export class BlockPos {
	constructor(
		public x: number,
		public y: number,
		public z: number,
		public p: p5
	) {
	}
	
	/**
	 * Get the distance between this block and another block.
	 * @param pos {BlockPos} - The block you want to get the distance from.
	 * @return {number} - Distance from the block.
	 */
	distanceFrom(pos: BlockPos) {
		return this.p.dist(this.x, this.y, this.z, pos.x, pos.y, pos.z);
	}
}