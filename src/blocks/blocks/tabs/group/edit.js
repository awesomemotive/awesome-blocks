import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';
import classnames from 'classnames';

import Controls from './controls.js';
import Inspector from './inspector.js';
import BlockAppender from '../../../components/block-appender-button';
import { boxToCSS, objectOrNumberAsBox, _px } from '../../../helpers/helper-functions';

import './editor.scss';

const TabHeader = ( { tag, title, onClick, active, onChangeTitle } ) => {
	return (
		<div
			className={ classnames(
				'wp-block-awesome-blocks-tabs__header_item',
				{
					active: active,
				}
			) }
			onClick={ onClick }
		>
			<RichText
				placeholder={ __( 'Add title…', 'awesome-blocks' ) }
				value={ title }
				onChange={ onChangeTitle }
				tagName={ tag ?? 'div' }
				withoutInteractiveFormatting
				multiline={ false }
			/>
		</div>
	);
};

const AddTabHeader = ( { clientId, addTab } ) => {
	return (
		<div className="add-header-container">
			<div className="add-header-item">
				<BlockAppender
					buttonText={ __( 'Add Tab', 'awesome-blocks' ) }
					variant="primary"
					allowedBlock="awesome-blocks/tabs-item"
					clientId={ clientId }
					onClick={ addTab }
				/>
			</div>
		</div>
	);
};

const Edit = ( props ) => {
	const { attributes, setAttributes, isSelected, clientId, name } = props;

	const contentRef = useRef( null );

	const children = useSelect( ( select ) => {
		const { getBlock } = select( 'core/block-editor' );
		return getBlock( clientId ).innerBlocks;
	}, [] );

	const [ activeTab, setActiveTab ] = useState(
		children.find( ( child ) => true === child.attributes.defaultOpen )
			?.clientId
	);

	const { insertBlock, removeBlock, selectBlock, moveBlockToPosition } =
		useDispatch( 'core/block-editor' );

	const toggleActiveTab = ( blockId ) => {
		if ( contentRef.current ) {
			children.forEach( ( block ) => {
				const blockContent = contentRef.current.querySelector(
					`#block-${ block.clientId } > .wp-block-awesome-blocks-tabs-item__content`
				);

				const blockHeader = contentRef.current.querySelector(
					`#block-${ block.clientId } > .wp-block-awesome-blocks-tabs-item__header`
				);

				blockContent?.classList.toggle(
					'active',
					block.clientId === blockId
				);
				blockHeader?.classList.toggle(
					'active',
					block.clientId === blockId
				);
			} );
			setActiveTab( blockId );
		}
	};

	useEffect( () => {
		if ( typeof activeTab !== 'undefined' ) {
			toggleActiveTab( activeTab );
		}
	}, [] );

	useEffect( () => {
		if ( 0 < children?.length ) {
			if (
				undefined === activeTab ||
				! children?.some( ( block ) => block.clientId === activeTab )
			) {
				toggleActiveTab( children[ 0 ].clientId );
			}
		}
	}, [ activeTab, children ] );

	const selectTab = ( blockId ) => {
		if ( 0 < children?.length ) {
			const block = children.find(
				( block ) => block.clientId === blockId
			);
			selectBlock( block.clientId );
		}
	};

	const moveTab = ( blockId, position ) => {
		const blockClientId = children.find(
			( block ) => block.clientId === blockId
		)?.clientId;
		if ( blockClientId ) {
			moveBlockToPosition( blockClientId, clientId, clientId, position );
		}
	};

	const deleteTab = ( blockId ) => {
		if ( 0 < children?.length ) {
			const block = children.find(
				( block ) => block.clientId === blockId
			);
			removeBlock( block.clientId, false );
			if ( activeTab === blockId ) {
				setActiveTab( '' );
			}
		}
	};

	const addTab = () => {
		const itemBlock = createBlock( 'awesome-blocks/tabs-item', {
			title:
				__( 'Tab ', 'awesome-blocks' ) +
				( ( children?.length ?? 0 ) + 1 ),
		} );
		insertBlock( itemBlock, children?.length || 0, clientId, false );
	};

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

	const blockProps = useBlockProps( {
		style: inlineStyles,
		className: classnames(
			attributes.className,
			{ 'has-pos-left': 'left' === attributes.tabsPosition },
			`is-align-${ attributes.titleAlignment }`
		),
	} );

	return (
		<>
			<Controls
				children={ children }
				setAttributes={ setAttributes }
				selectedTab={ activeTab }
				selectTab={ selectTab }
				moveTab={ moveTab }
				deleteTab={ deleteTab }
			/>

			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
				children={ children }
				deleteTab={ deleteTab }
				selectTab={ selectTab }
				moveTab={ moveTab }
				addTab={ addTab }
				clientId={ clientId }
			/>

			<div { ...blockProps }>
				<div className="wp-block-awesome-blocks-tabs__header">
					{ children?.map( ( tabHeader, idx ) => {
						return (
							<TabHeader
								key={ tabHeader.clientId }
								tag={ attributes.titleTag }
								title={
									tabHeader.attributes?.title ??
									`${ __( 'Tab', 'awesome-blocks' ) } ${
										idx + 1
									}`
								}
								active={ tabHeader.clientId === activeTab }
								onClick={ () =>
									toggleActiveTab( tabHeader.clientId )
								}
								onChangeTitle={ ( val ) => {
									dispatch( 'core/block-editor' ).updateBlockAttributes( tabHeader.clientId, { title: val.replace( /(\r\n|\n|\r|<br>)/gm, '' ) });
								} }
							/>
						);
					} ) || '' }

					{ ( isSelected || 0 === children.length ) && (
						<AddTabHeader clientId={ clientId } addTab={ addTab } />
					) }
				</div>

				<div
					ref={ contentRef }
					className="wp-block-awesome-blocks-tabs__content"
				>
					<InnerBlocks
						allowedBlocks={ [ 'awesome-blocks/tabs-item' ] }
						template={ [
							[
								'awesome-blocks/tabs-item',
								{
									title: __( 'Tab 1', 'awesome-blocks' ),
								},
								[
									[
										'core/paragraph',
										{
											content: __(
												'This is just a placeholder to help you visualize how the content is displayed in the tabs. Feel free to edit this with your actual content.',
												'awesome-blocks'
											),
										},
									],
								],
							],
							[
								'awesome-blocks/tabs-item',
								{
									title: __( 'Tab 2', 'awesome-blocks' ),
								},
								[
									[
										'core/paragraph',
										{
											content: __(
												'This is just a placeholder to help you visualize how the content is displayed in the tabs. Feel free to edit this with your actual content.',
												'awesome-blocks'
											),
										},
									],
								],
							],
							[
								'awesome-blocks/tabs-item',
								{
									title: __( 'Tab 3', 'awesome-blocks' ),
								},
								[
									[
										'core/paragraph',
										{
											content: __(
												'This is just a placeholder to help you visualize how the content is displayed in the tabs. Feel free to edit this with your actual content.',
												'awesome-blocks'
											),
										},
									],
								],
							],
						] }
						// orientation="horizontal"
						renderAppender={ false }
					/>
				</div>
			</div>
		</>
	);
};

export default Edit;
