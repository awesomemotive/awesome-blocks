import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';
import {boxToCSS} from "../../../helpers/helper-functions";
const Save = ( { attributes } ) => {
	const inlineStyles = {
		'--border-color': attributes?.borderColor,
		'--title-color':attributes?.titleColor,
		'--title-background': attributes?.titleBackgroundColor,
		'--content-background-color': attributes?.contentBackgroundColor,
		'--active-title-color': attributes?.activeTitleColor,
		'--active-title-background': attributes?.activeTitleBackgroundColor,
		'--active-title-border-color': attributes?.activeBorderColor,
		'--content-text-color': attributes?.contentTextColor,
		'--title-padding': boxToCSS( attributes?.titlePadding ),
		'--content-padding': boxToCSS( attributes?.contentPadding )
	};
	const blockProps = useBlockProps.save( {
		style: inlineStyles,
		className: classNames(
			attributes.className,
			attributes.titleAlignment &&
				`is-align-${ attributes.titleAlignment }`
		),
	} );

	return (
		<div { ...blockProps }>
			<div className="wp-block-awesome-blocks-tabs__content">
				<InnerBlocks.Content />
			</div>
		</div>
	);
};

export default Save;
