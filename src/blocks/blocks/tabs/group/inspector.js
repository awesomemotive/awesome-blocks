import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	SelectControl,
	__experimentalBoxControl as BoxControl,
	__experimentalText as Text,
	__experimentalVStack as VStack,
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

import { useSelect, useDispatch } from '@wordpress/data';

import ToogleGroupControl from '../../../components/toogle-group-control';
import { alignCenter, alignLeft, alignRight, menu } from '@wordpress/icons';

import { makeBox, isEmptyBox, objectOrNumberAsBox } from '../../../helpers/helper-functions.js';

const styles = [
	{
		label: __( 'Default', 'awesome-blocks' ),
		value: 'default',
		isDefault: true,
	},
	{
		label: __( 'Border', 'awesome-blocks' ),
		value: 'border',
	},
	{
		label: __( 'Boxed', 'awesome-blocks' ),
		value: 'boxed',
	},
];

const Inspector = ( {
	attributes,
	setAttributes,
	children,
	clientId
} ) => {
	const [ defaultTab, setDefaultTab ] = useState(
		children.find( ( child ) => true === child.attributes.defaultOpen )
			?.clientId
	);

	const colorGradientSettings = useMultipleOriginColorsAndGradients();


	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const onTabSelect = ( tabId ) => {
		children.forEach( ( child, i ) => {
			if ( tabId !== children[ i ].clientId ) {
				updateBlockAttributes( children[ i ].clientId, {
					defaultOpen: false,
				} );
			}
		} );

		updateBlockAttributes( tabId, { defaultOpen: true } );
		setDefaultTab( tabId );
	};

	const tabOptions = children.map( ( child, index ) => {
		return {
			label: `${ index + 1 }. ${
				child.attributes.title || __( 'Untitled Tab', 'awesome-blocks' )
			}`,
			value: child.clientId,
		};
	} );

	useEffect( () => {
		setDefaultTab( children.find( child => true === child.attributes.defaultOpen )?.clientId );
	}, [ children ] );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Tabs Settings', 'awesome-blocks' ) }>
					<BaseControl label={ __( 'Alignment', 'awesome-blocks' ) }>
						<ToogleGroupControl
							value={ attributes.titleAlignment ?? 'left' }
							onChange={ ( titleAlignment ) =>
								setAttributes( { titleAlignment } )
							}
							options={ [
								{
									icon: alignLeft,
									label: __( 'Left', 'awesome-blocks' ),
									value: 'left',
								},
								{
									icon: alignCenter,
									label: __( 'Center', 'awesome-blocks' ),
									value: 'center',
								},
								{
									icon: alignRight,
									label: __( 'Right', 'awesome-blocks' ),
									value: 'right',
								},
								{
									icon: menu,
									label: __( 'Full', 'awesome-blocks' ),
									value: 'full',
								},
							] }
							hasIcon={ true }
						/>
					</BaseControl>
					<SelectControl
						label={ __( 'Initial Tab', 'awesome-blocks' ) }
						value={ defaultTab }
						options={ tabOptions }
						onChange={ onTabSelect }
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="color">
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Title Background', 'awesome-blocks' ),
						colorValue: attributes?.titleBackgroundColor,
						onColorChange: ( titleBackgroundColor ) => setAttributes( { titleBackgroundColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Active Title Background', 'awesome-blocks' ),
						colorValue: attributes?.activeTitleBackgroundColor,
						onColorChange: ( activeTitleBackgroundColor ) => setAttributes( { activeTitleBackgroundColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Title', 'awesome-blocks' ),
						colorValue: attributes?.titleColor,
						onColorChange: ( titleColor ) => setAttributes( { titleColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Active Title', 'awesome-blocks' ),
						colorValue: attributes?.activeTitleColor,
						onColorChange: ( activeTitleColor ) => setAttributes( { activeTitleColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Content Text', 'awesome-blocks' ),
						colorValue: attributes?.contentTextColor,
						onColorChange: ( contentTextColor ) => setAttributes( { contentTextColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Content Background', 'awesome-blocks' ),
						colorValue: attributes?.contentBackgroundColor,
						onColorChange: ( contentBackgroundColor ) => setAttributes( { contentBackgroundColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				<ColorGradientSettingsDropdown
					settings={ [ {
						label: __( 'Border', 'awesome-blocks' ),
						colorValue: attributes?.borderColor,
						onColorChange: ( borderColor ) => setAttributes( { borderColor } )
					} ] }
					panelId={ clientId }
					hasColorsOrGradients={ false }
					disableCustomColors={ false }
					__experimentalIsRenderedInSidebar
					{ ...colorGradientSettings }
				/>
				{ attributes?.className && attributes?.className?.includes( 'is-style-border' ) && (
					<ColorGradientSettingsDropdown
						settings={ [ {
							label: __( 'Active Border', 'awesome-blocks' ),
							colorValue: attributes?.activeBorderColor,
							onColorChange: ( activeBorderColor ) => setAttributes( { activeBorderColor } )
						} ] }
						panelId={ clientId }
						hasColorsOrGradients={ false }
						disableCustomColors={ false }
						__experimentalIsRenderedInSidebar
						{ ...colorGradientSettings }
					/>
				) }
			</InspectorControls>
			<InspectorControls group="dimensions">
				<VStack style={{ width: "200%"}}>
					<Text>
						<BoxControl
							label={ __( 'Title Padding', 'awesome-blocks' ) }
							values={ attributes.titlePadding ?? makeBox( '16px' )  }
							onChange={ titlePadding => setAttributes({ titlePadding: ! isEmptyBox( titlePadding ) ? titlePadding : undefined }) }
						/>
					</Text>
					<Text>
						<BoxControl
							label={ __( 'Content Padding', 'awesome-blocks' ) }
							values={ attributes.contentPadding ?? makeBox( '16px' )  }
							onChange={ contentPadding => setAttributes({ contentPadding:
									! isEmptyBox( contentPadding ) ? contentPadding : undefined }) }
						/>
					</Text>
				</VStack>
			</InspectorControls>
		</>
	);
};

export default Inspector;
