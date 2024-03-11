import { __ } from '@wordpress/i18n';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import classnames from 'classnames';

import Inspector from './inspector.js';

const Edit = ( { attributes, setAttributes, clientId } ) => {
	const contentRef = useRef( null );

	const { parentClientId } = useSelect( ( select ) => {
		const { getBlock, getBlockRootClientId } =
			select( 'core/block-editor' );

		const parentClientId = getBlockRootClientId( clientId );
		const parentBlock = getBlock( parentClientId );

		return {
			parentClientId: parentBlock.clientId,
		};
	}, [] );

	const { selectBlock } = useDispatch( 'core/block-editor' );

	const switchActiveState = () => {
		if ( contentRef.current ) {
			const otherTabsComponents =
				contentRef.current?.parentNode?.querySelectorAll(
					':scope > .wp-block-awesome-blocks-tabs-item  > .wp-block-awesome-blocks-tabs-item__header, :scope > .wp-block-awesome-blocks-tabs-item  > .wp-block-awesome-blocks-tabs-item__content'
				) ?? [];

			otherTabsComponents?.forEach( ( component ) =>
				component?.classList?.remove( 'active' )
			);

			contentRef.current
				.querySelector(
					':scope > .wp-block-awesome-blocks-tabs-item__header'
				)
				?.classList.add( 'active' );
			contentRef.current
				.querySelector(
					':scope > .wp-block-awesome-blocks-tabs-item__content'
				)
				?.classList.add( 'active' );
		}
	};

	const blockProps = useBlockProps( {
		// ref: contentRef
	} );

	return (
		<>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				selectParent={ () => selectBlock( parentClientId ) }
			/>

			<div { ...blockProps }>
				<RichText
					placeholder={ __( 'Add title…', 'awesome-blocks' ) }
					value={ attributes.title }
					onChange={ ( value ) => setAttributes( { title: value } ) }
					className={ classnames(
						'wp-block-awesome-blocks-tabs-item__header',
						{
							active: attributes.defaultOpen
								? attributes.defaultOpen
								: false,
						}
					) }
					tagName={ 'div' }
					onClick={ switchActiveState }
					withoutInteractiveFormatting
				/>

				<div className="wp-block-awesome-blocks-tabs-item__content">
					<InnerBlocks template={ [ [ 'core/paragraph' ] ] } />
				</div>
			</div>
		</>
	);
};

export default Edit;
