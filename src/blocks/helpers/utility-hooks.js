import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { lightnessFromColor } from './helper-functions.js';


/**
 * Utility hook to get/set dark background class.
 *
 * @param {string|false|undefined} backgroundColor - The background color.
 * @param {Object} attributes - The block attributes.
 * @param {Function} setAttributes - The setAttributes function from the block.
 * @param {string} darkClassName - The dark-bg class name to add/remove.
 * @param {string} lightClassName - The light-bg class name to add/remove.
 */
export const useDarkBackground = ( backgroundColor, attributes, setAttributes, darkClassName = 'has-dark-bg', lightClassName = 'has-light-bg' ) => {
	useEffect( () => {
		const isDark = 'dark' === lightnessFromColor( backgroundColor );
		const isLight = 'light' === lightnessFromColor( backgroundColor );

		let classes = attributes.className || '';

		const addClass = ( className ) => {
			classes = classes.split( ' ' );
			classes.push( className );
			classes = classes.join( ' ' ).trim();
		};

		const removeClass = ( className ) => {
			classes = classes.replace( className, '' ).trim();
		};

		if ( isDark && ! attributes?.className?.includes( darkClassName ) ) {
			addClass( darkClassName );
		} else if ( ! isDark && attributes?.className?.includes( darkClassName ) ) {
			removeClass( darkClassName );
		}

		if ( isLight && ! attributes?.className?.includes( lightClassName ) ) {
			addClass( lightClassName );
		} else if ( ! isLight && attributes?.className?.includes( lightClassName ) ) {
			removeClass( lightClassName );
		}

		setAttributes({ className: classes });
	}, [ backgroundColor ]);
};
