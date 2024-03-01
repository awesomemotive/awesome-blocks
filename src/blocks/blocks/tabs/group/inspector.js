import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	FontSizePicker,
	PanelBody,
	SelectControl,
	__experimentalBoxControl as BoxControl,
} from '@wordpress/components';

import { useState, useEffect } from '@wordpress/element';

import { useSelect, useDispatch } from '@wordpress/data';

import ToogleGroupControl from '../../../components/toogle-group-control';
import { alignCenter, alignLeft, alignRight, menu } from '@wordpress/icons';
/*
import { changeActiveStyle, getActiveStyle, isEmptyBox, objectOrNumberAsBox } from '../../../helpers/helper-functions.js';
import AutoDisableSyncAttr from '../../../components/auto-disable-sync-attr/index';
import { makeBox } from '../../../plugins/copy-paste/utils';
import { useTabSwitch } from '../../../helpers/block-utility';*/

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
	children
} ) => {
	const [ defaultTab, setDefaultTab ] = useState(
		children.find( ( child ) => true === child.attributes.defaultOpen )
			?.clientId
	);

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
	);
};

export default Inspector;
