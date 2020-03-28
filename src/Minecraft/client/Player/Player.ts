import {BlockPos} from '../../utils/BlockPos';

export class Player {
	/**
	 * Creates a new player.
	 * @param position {BlockPos} - Iniitial position.
	 * @param speed {number} - Speed.
	 */
	constructor(public position: BlockPos, public speed: number) {
	}
	
	/**
	 * Move the player by {@link speed} units in {@link direction} direction.
	 * @param direction {radians} - Direction in radians.
	 * @param speed {number} - Speed.
	 */
	move(direction: number, speed: number) {
		direction = direction > Math.PI ? direction - Math.PI + (Math.PI / 2) : direction + Math.PI / 2;
		this.position.x += Math.cos(direction) * speed;
		this.position.z += Math.sin(direction) * speed;
	}
}