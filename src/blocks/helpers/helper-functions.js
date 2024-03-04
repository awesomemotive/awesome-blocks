import { isString, merge } from 'lodash';

/*
 +-------------------------------- CSS Utility functions --------------------------------+
*/
/**
 * Format the value based on the given unit.
 *
 * @param {number} value
 * @param {string} unit
 * @returns {string|undefined}
 */
export const _unit = ( value, unit ) => ( isNumber( value ) ? value + unit : value );

/**
 * Format the value into a `px` unit.
 *
 * @param {any} value The value.
 * @returns {string|undefined}
 */
export const _px = value => _unit( value, 'px' );

/**
 * Format the value into a `em` unit.
 *
 * @param {any} value The value.
 * @returns {string|undefined}
 */
export const _em = value => _unit( value, 'em' );

/**
 * Format the value into a `%` unit.
 *
 * @param {any} value The value.
 * @returns {string|undefined}
 */
export const _percent = value => _unit( value, '%' );

/**
 * Wrap the given value in a box type.
 * @param x The value.
 * @returns
 */
export const makeBox = ( x ) => {
	return {
		top: x,
		left: x,
		right: x,
		bottom: x
	};
};

/**
 * Check if a box value is empty.
 *
 * @param {import('./blocks').BoxType | undefined} box The box.
 * @returns {boolean}
 */
export const isEmptyBox = ( box ) => {
	return ! ( box?.top !== undefined && box?.right !== undefined && box?.bottom !== undefined && box?.left !== undefined );
};


/**
 * Make a box type from a number or an object with Box like props.
 * @param {Object|number|undefined} value
 * @param {import('./blocks').BoxType?} defaultValue
 * @returns {import('./blocks').BoxType}
 */
export const objectOrNumberAsBox = ( value, defaultValue = undefined ) => {
	if ( isNumber( value ) ) {
		return makeBox( _px( value ) );
	}

	if ( value === undefined ) {
		return defaultValue;
	}

	return {
		top: value?.top,
		bottom: value?.bottom,
		right: value?.right,
		left: value?.left
	};
};

/**
 * Wrap a given string in a box object.
 * @param {string|any} s The value.
 * @returns {import('./blocks').BoxType|any}
 */
export const stringToBox = ( s ) => {
	if ( ! isString( s ) ) {
		return s;
	}

	return {
		top: s,
		bottom: s,
		right: s,
		left: s
	};
};

/**
 * Merge the Box objects.
 *
 * @param {import('./blocks').BoxType?} box
 * @param {import('./blocks').BoxType?} defaultBox
 * @return {import('./blocks').BoxType}
 */
export const mergeBoxDefaultValues = ( box, defaultBox ) => {
	return merge(
		{ left: '0px', right: '0px', bottom: '0px', top: '0px' },
		defaultBox,
		box
	);
};

/**
 * Make a box intro a CSS string. If it is a string, wrap it into a box.
 * @param {string|import('./blocks').BoxType | undefined} box The box.
 * @returns
 */
export const boxToCSS = ( box ) => {
	if ( box === undefined ) {
		return undefined;
	}

	const _box = isString( box ) ? mergeBoxDefaultValues( stringToBox( box ) ) : mergeBoxDefaultValues( box );
	return `${_box.top} ${_box.right} ${_box.bottom} ${_box.left}`;
};

