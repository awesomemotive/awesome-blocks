import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import MultiSelectControl from '../multiselect-control';

const AdvancedSEOSettingsPanel = ( { attributes, setAttributes } ) =>
	[ 'page', 'web_address' ].includes( attributes.linksTo ) && (
		<PanelBody
			title={ __( 'Advanced SEO Settings', 'awesome-blocks' ) }
			initialOpen={ false }
		>
			<MultiSelectControl
				label={ __(
					'What rel values should it have?',
					'awesome-blocks'
				) }
				help={ __(
					'Set the rel values of links to improve SEO and prevent security vulnerabilities.',
					'awesome-blocks'
				) }
				options={ [
					{
						value: 'noopener',
						label: __( 'noopener (recommended)', 'awesome-blocks' ),
					},
					{
						value: 'noreferrer',
						label: __(
							'noreferrer (recommended)',
							'awesome-blocks'
						),
					},
					{
						value: 'nofollow',
						label: __( 'nofollow', 'awesome-blocks' ),
					},
					{
						value: 'sponsored',
						label: __( 'sponsored', 'awesome-blocks' ),
					},
				] }
				value={ attributes.rel }
				onChange={ ( rel ) => setAttributes( { rel } ) }
				placeholder={ __(
					'Choose rel values for the link',
					'awesome-blocks'
				) }
			/>
			<ul>
				{ [
					__(
						'noopener (recommended) - Block access to source page',
						'awesome-blocks'
					),
					__(
						'noreferrer (recommended) - Hide info about link source',
						'awesome-blocks'
					),
					__(
						'nofollow - Tell search engine to ignore link',
						'awesome-blocks'
					),
					__(
						'sponsored - Mark link as sponsored',
						'awesome-blocks'
					),
				].map( ( item ) => (
					<li key={ item }>{ item }</li>
				) ) }
			</ul>
		</PanelBody>
	);

export default AdvancedSEOSettingsPanel;
