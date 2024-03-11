/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

const Icon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="32"
		height="32"
		version="1"
		viewBox="0 0 24 24"
	>
		<path
			d="M4 217c-3-8-3-56-2-108l3-94h230l3 75c2 56-1 82-15 107l-18 33h-98c-72 0-99-3-103-13zm76-27c0-18 7-20 70-20h70V30H20v180h30c23 0 30-4 30-20zm60 10c0-5-9-10-20-10s-20 5-20 10c0 6 9 10 20 10s20-4 20-10zm60 0c0-5-9-10-20-10s-20 5-20 10c0 6 9 10 20 10s20-4 20-10z"
			transform="matrix(.1 0 0 -.1 0 24)"
		></path>
	</svg>
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( metadata.name, {
	icon: Icon,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
} );
