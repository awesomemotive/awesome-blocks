import { v4 as uuidv4 } from 'uuid';

import {
	zip
} from 'lodash';

import { useEffect, useState } from '@wordpress/element';

/**
 * Create a Style node for handling `head` Node change when working in a Tablet, Mobile mode or in FSE Editor.
 *
 * @param {import('./blocks.js').OtterNodeCSSOptions } options The options.
 * @returns {import('./blocks.js').OtterNodeCSSReturn} The name of the node and function handler.
 */
export const useCSSNode = ( options = {}) => {
	const [ cssList, setCSSProps ] = useState({
		css: [],
		media: []
	});
	const [ settings, setSettings ] = useState({
		node: null,
		cssNodeName: ''
	});

	/**
	 *	Set CSS of the node.
	 *
	 * The `css` and `media` have a 1-1 relationship.
	 *
	 * @param {string[]} css A list with CSS code.
	 * @param {string[]} media A list CSS media options. One for each CSS item.
	 *
	 * @example Simple usage.
	 *
	 * setNodeCSS([
	 * 			`.o-review-comparison_buttons span {
	 * 				background: ${ attributes.buttonColor } !important;
	 * 				color: ${ attributes.buttonText } !important;
	 * 			}`
	 * ]);
	 *
	 * @example CSS with Media.
	 * setNodeCSS([
	 * 			`{
	 * 				${ attributes.customTitleFontSize && `--title-text-size: ${ attributes.customTitleFontSize }px;` }
	 * 				${ attributes.customDescriptionFontSize && `--description-text-size: ${ attributes.customDescriptionFontSize }px;` }
	 * 			}`,
	 * 			`{
	 * 				${ attributes.customTitleFontSizeTablet && `--title-text-size: ${ attributes.customTitleFontSizeTablet }px;` }
	 * 				${ attributes.customDescriptionFontSizeTablet && `--description-text-size: ${ attributes.customDescriptionFontSizeTablet }px;` }
	 * 			}`,
	 * 			`{
	 * 				${ attributes.customTitleFontSizeMobile && `--title-text-size: ${ attributes.customTitleFontSizeMobile }px;` }
	 * 				${ attributes.customDescriptionFontSizeMobile && `--description-text-size: ${ attributes.customDescriptionFontSizeMobile }px;` }
	 * 			}`
	 * 		], [
	 * 			'@media ( min-width: 960px )',
	 * 			'@media ( min-width: 600px ) and ( max-width: 960px )',
	 * 			'@media ( max-width: 600px )'
	 * 		]
	 * );
	 *
	 */
	const setNodeCSS = ( css = [], media = []) => {
		setCSSProps({
			css,
			media
		});
	};

	useEffect( () => {

		let anchor;

		// Create the CSS node.
		const n = document.createElement( 'style' );
		n.type = 'text/css';
		n.setAttribute( 'data-generator', 'otter-blocks' );

		setTimeout( () => {

			// A small delay for the iFrame to properly initialize.
			anchor = parent.document.querySelector( 'iframe[name="editor-canvas"]' )?.contentWindow.document.head || document.head;
			anchor?.appendChild( n );
		}, 500 );

		setSettings({
			node: n,
			cssNodeName: options?.selector ?? `o-node-${uuidv4()}`
		});

		return () => {
			anchor?.removeChild( n );
		};
	}, [ ]);

	useEffect( () => {
		if ( settings.node && settings.cssNodeName && cssList.media !== undefined ) {

			// Create the CSS text by combining the list of CSS items with their media..
			const text =  zip( cssList.css, cssList.media )
				.map( x => {
					const [ css, media ] = x;
					if ( media ) {
						return `${media} { \n\t .${settings.cssNodeName}${options?.appendToRoot ? '' : ' '}${css} }`;
					}
					return `.${settings.cssNodeName}${options?.appendToRoot ? '' : ' '}${css}`;
				})
				.join( '\n' ) || '';
			settings.node.textContent = text;
		}
	}, [ cssList.css, cssList.media, settings.node, settings.cssNodeName ]);

	return [ settings.cssNodeName, setNodeCSS, setSettings ];
};
