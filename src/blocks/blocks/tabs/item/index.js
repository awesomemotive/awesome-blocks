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
		<path d="M33.168 5.667H2.5a2.5 2.5 0 110-5h30.668a2.5 2.5 0 110 5zm-14.501 4.834a2.5 2.5 0 00-2.5-2.5H2.5a2.5 2.5 0 100 5h13.667a2.5 2.5 0 002.5-2.5zm17.001 7.332a2.5 2.5 0 00-2.5-2.5H2.5a2.5 2.5 0 100 5h30.668a2.5 2.5 0 002.5-2.5zm-17.001 7.334a2.5 2.5 0 00-2.5-2.5H2.5a2.5 2.5 0 100 5h13.667a2.5 2.5 0 002.5-2.5zm17.001 7.334a2.5 2.5 0 00-2.5-2.5H2.5a2.5 2.5 0 100 5h30.668a2.5 2.5 0 002.5-2.5z"></path>
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
