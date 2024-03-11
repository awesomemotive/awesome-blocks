import classnames from 'classnames';

import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import Inspector from './inspector.js';
import BlockAppender from '../../../components/block-appender-button';
/*
import { _px, boxValues, hex2rgba } from '../../../helpers/helper-functions';
*/
import { useCSSNode } from '../../../helpers/block-utility.js';

import { useDarkBackground } from '../../../helpers/utility-hooks.js';
import './editor.scss';

const Edit = ({
	attributes,
	setAttributes,
	clientId,
	isSelected
}) => {

	const children = useSelect( select => {
		return select( 'core/block-editor' ).getBlocksByClientId( clientId )[0].innerBlocks;
	});

	useEffect( () => {
		if ( attributes.alwaysOpen === undefined ) {
			setAttributes( { alwaysOpen: 1 < children.filter( child => true === child.attributes.initialOpen ).length } );
		}
	}, []);

	const blockProps = useBlockProps({
		id: attributes.id,
		className: classnames({
			[ `is-${ attributes.gap }-gap` ]: 'string' === typeof attributes.gap,
			'no-gap': 0 === attributes.gap,
			'has-gap': 'string' !== typeof attributes.gap && 0 < attributes.gap,
			'icon-first': attributes.iconFirst,
			'has-icon': !! attributes.icon,
			'has-open-icon': !! attributes.openItemIcon
		} ),
	});

	return (
		<>
			<Inspector
				clientId={ clientId }
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>

			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ [ 'awesome-blocks/accordion-item' ] }
					template={ [
						[ 'awesome-blocks/accordion-item', { title: __( 'Accordion title 1', 'awesome-blocks' ) }],
						[ 'awesome-blocks/accordion-item', { title: __( 'Accordion title 2', 'awesome-blocks' ) }]
					] }
					renderAppender={ isSelected ? () =>
						<BlockAppender
							buttonText={ __( 'Add Accordion Item', 'awesome-blocks' ) }
							variant="primary"
							allowedBlock="awesome-blocks/accordion-item"
							clientId={ clientId }
						/> : undefined
					}
				/>
			</div>
		</>
	);
};

export default Edit;
