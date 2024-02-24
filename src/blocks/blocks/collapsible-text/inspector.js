import { InspectorControls } from '@wordpress/block-editor';
import SEOPanel from './seo-panel';
import TextBoxPanel from './textbox-panel';
import LinkAdvancedSEOSettingsPanel from '../../components/links-to/advanced-seo-settings-panel';

const Inspector = ( { attributes, setAttributes } ) => (
	<InspectorControls>
		<TextBoxPanel
			attributes={ attributes }
			setAttributes={ setAttributes }
		/>
		<LinkAdvancedSEOSettingsPanel
			attributes={ attributes }
			setAttributes={ setAttributes }
		/>
		<SEOPanel attributes={ attributes } setAttributes={ setAttributes } />
	</InspectorControls>
);

export default Inspector;
