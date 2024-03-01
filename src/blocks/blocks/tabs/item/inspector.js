/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

import { InspectorControls } from '@wordpress/block-editor';

import { PanelBody, Button, TextControl } from '@wordpress/components';

const Inspector = ( { attributes, setAttributes, selectParent } ) => {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Settings', 'awesome-blocks' ) }>
				<Button isSecondary onClick={ () => selectParent() }>
					{ __( 'Back to the Tabs', 'awesome-blocks' ) }
				</Button>

				<TextControl
					type="text"
					label={ __( 'Title', 'awesome-blocks' ) }
					placeholder={ __( 'Insert a title', 'awesome-blocks' ) }
					onChange={ ( value ) =>
						setAttributes( {
							title: '' === value ? undefined : value,
						} )
					}
					value={ attributes.title }
				/>
			</PanelBody>
		</InspectorControls>
	);
};

export default Inspector;
