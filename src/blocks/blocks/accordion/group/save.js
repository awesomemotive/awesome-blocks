/**
 * External dependencies
 */
import classnames from 'classnames';
import {
	InnerBlocks,
	useBlockProps
} from '@wordpress/block-editor';
import {useCSSNode} from "../../../helpers/block-utility";
import {useEffect} from "@wordpress/element";
import {useDarkBackground} from "../../../helpers/utility-hooks";

const Save = ({
	attributes
}) => {

	const blockProps = useBlockProps.save({
		id: attributes.id,
		'data-has-schema': attributes.FAQSchema,
		className: classnames({
			exclusive: false === attributes.alwaysOpen,
			[ `is-${ attributes.gap }-gap` ]: attributes.gap && 'string' === typeof attributes.gap,
			'no-gap': 0 === attributes.gap,
			'has-gap': attributes.gap && 'string' !== typeof attributes.gap && 0 !== attributes.gap,
			'icon-first': attributes.iconFirst
		}),
	});

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
};

export default Save;
