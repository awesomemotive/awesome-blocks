/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

import {
	ContrastChecker,
	InspectorControls,
	__experimentalColorGradientSettingsDropdown as ColorGradientSettingsDropdown,
	__experimentalUseMultipleOriginColorsAndGradients as useMultipleOriginColorsAndGradients
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	FontSizePicker,
	ToggleControl,
	__experimentalBoxControl as BoxControl,
	__experimentalUnitControl as UnitControl
} from '@wordpress/components';

import {
	select,
	dispatch
} from '@wordpress/data';

import {
	Fragment,
	useState
} from '@wordpress/element';



const gapCompatibility = {
	narrow: 5,
	wide: 10,
	wider: 20
};

const Inspector = ({
	clientId,
	attributes,
	setAttributes
}) => {

	const changeBoxShadow = data => {
		const boxShadow = { ...attributes.boxShadow };
		Object.entries( data ).map( ([ key, val ] = data ) => {
			boxShadow[key] = val;
		});

		setAttributes({ boxShadow });
	};

	const onAlwaysOpenToggle = alwaysOpen => {
		setAttributes({ alwaysOpen });

		if ( true === alwaysOpen ) {
			return;
		}

		const children = select( 'core/block-editor' ).getBlocksByClientId( clientId )[0].innerBlocks;
		children.forEach( child => {
			dispatch( 'core/block-editor' ).updateBlockAttributes( child.clientId, { initialOpen: false });
		});
	};

	const onTagChange = ( targetTag ) => {
		const children = select( 'core/block-editor' ).getBlocksByClientId( clientId )[0].innerBlocks;
		children.forEach( child => {
			dispatch( 'core/block-editor' ).updateBlockAttributes( child.clientId, { tag: targetTag });
		});

		setAttributes({ tag: targetTag });
	};

	const colorGradientSettings = useMultipleOriginColorsAndGradients();

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Settings', 'awesome-blocks' ) }
				>
					<ToggleControl
						label={ __( 'Place Icon on Left', 'awesome-blocks' ) }
						checked={ attributes.iconFirst }
						onChange={ iconFirst => setAttributes({ iconFirst }) }
					/>

					<ToggleControl
						label={ __( 'Keep Multiple Items Expanded', 'awesome-blocks' ) }
						help={ __( 'When enabled, multiple accordion items can be expanded at the same time', 'awesome-blocks' ) }
						checked={ attributes.alwaysOpen || false }
						onChange={ onAlwaysOpenToggle }
					/>

					<ToggleControl
						label={ __( 'Enable FAQ Schema', 'awesome-blocks' ) }
						checked={ attributes.FAQSchema || false }
						onChange={ FAQSchema => setAttributes({ FAQSchema }) }
					/>

					<SelectControl
						label={ __( 'Accordion title HTML tag', 'awesome-blocks' ) }
						value={ attributes.tag || 'div' }
						options={ [
							{ label: __( 'H1', 'awesome-blocks' ), value: 'h1' },
							{ label: __( 'H2', 'awesome-blocks' ), value: 'h2' },
							{ label: __( 'H3', 'awesome-blocks' ), value: 'h3' },
							{ label: __( 'H4', 'awesome-blocks' ), value: 'h4' },
							{ label: __( 'H5', 'awesome-blocks' ), value: 'h5' },
							{ label: __( 'H6', 'awesome-blocks' ), value: 'h6' },
							{ label: __( 'div', 'awesome-blocks' ), value: 'div' }
						] }
						onChange={ onTagChange }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
};

export default Inspector;
