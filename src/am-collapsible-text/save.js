/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

import { textMaxLength } from './constants';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save( { attributes } ) {


	const CustomTag = attributes.htmlTag;
	let extraControl;
	if ( 'expand' == attributes.buttonDo ) {
		extraControl = (
			<>
				<button className="am-collapsible-btn" data-expand-button-text={ attributes.expandButtonText } data-collapse-button-text={ attributes.collapseButtonText }>{ attributes.expandButtonText }</button>
			</>
		);
	} else {
		extraControl = '';
	}

	return (
		<div { ...useBlockProps.save() }>
			<CustomTag data-content={ attributes.content }>
				{ attributes.content.slice(0, textMaxLength) } { attributes.content.length > textMaxLength && '...' }
			</CustomTag>
			<div>
				{extraControl}
			</div>
		</div>
	);
}

