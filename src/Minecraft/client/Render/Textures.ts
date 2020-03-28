import p5 from 'p5';
import {Block} from '../../registry/Blocks/Block';
import {Blocks} from '../../registry/Registry';

/**
 * Every texture binded by their path.
 * @type {Map<string, p5.Image>}
 */
export const Textures: Map<string, p5.Image> = new Map();

/**
 * Loads up every texture.
 * @param p {Object} - P5 instance.
 */
export function initTextures(p: p5) {
	Blocks.forEach(async (block: Block) => {
		const path = `./assets/textures/blocks/${block.name}.png`;
		
		const texture = p.loadImage(path);
		texture.resize(1024, 1024);
		
		try {
			Textures.set(`blocks/${block.name}`, texture);
			console.log(`[TextureLoading][Success] Successfully loaded '${path}' !`);
		} catch (e) {
			console.log(`[TextureLoading][Error] Failed to load '${path}'.`);
			console.error(e);
		}
	});
}