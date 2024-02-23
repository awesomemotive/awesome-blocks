import { PanelBody, TextControl, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const SEOPanel = ( { attributes, setAttributes } ) => (
    <PanelBody title={ __('SEO & accessibility', 'awesome-blocks') } initialOpen={ true }>
        <TextControl
            label={ __('Accessible name', 'awesome-blocks') }
            value={ attributes.accessibleName }
            onChange={ val => setAttributes( { accessibleName: val } ) }
        />
        <SelectControl
            label={__('Choose HTML tag', 'awesome-blocks')}
            value={attributes.htmlTag}
            options={[
                { label: 'p', value: 'p' },
                { label: 'div', value: 'div' },
                { label: 'h1', value: 'h1' },
                { label: 'h2', value: 'h2' },
                { label: 'h3', value: 'h3' },
                { label: 'h4', value: 'h4' },
                { label: 'h5', value: 'h5' },
                { label: 'h6', value: 'h6' },
                { label: 'blockquote', value: 'blockquote' },
            ]}
            onChange={ val => setAttributes( { content: val } ) }
        />
    </PanelBody>
);

export default SEOPanel;