import { PanelBody, RadioControl, TextareaControl, TextControl, SelectControl, __experimentalInputControl as InputControl, CustomSelectControl, CheckboxControl, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import LinkTo from '../../components/links-to';

const TextBoxPanel = ( { attributes, setAttributes } ) => {
    return (
        <>
            <PanelBody title={ __( 'Text Box Settings', 'awesome-blocks' ) } initialOpen={ true }>
                <TextareaControl
                    label={ __( 'Text', 'awesome-blocks' ) }
                    help={ __( 'Change Text', 'awesome-blocks' ) }
                    onChange={ val => setAttributes( { content: val } ) }
                    value={ attributes.content }
                    placeholder={ __('Collapsible text is perfect for longer content like paragraphs and descriptions. It’s a great way to give people more information while keeping your layout clean. Link your text to anything, including an external website or a different page. You can set your text box to expand and collapse when people click, so they can read more or less info.', 'awesome-blocks' ) }
                />
                <RadioControl
                    label={ __( 'What does button do?', 'awesome-blocks' ) }
                    selected={ attributes.buttonDo }
                    options={ [
                        { label: __( 'Expand', 'awesome-blocks' ), value: 'expand' },
                        { label: __( 'Link', 'awesome-blocks' ), value: 'link' },
                    ] }
                    onChange={ val => setAttributes( { buttonDo: val } ) }
                />
                { attributes.buttonDo == 'expand' && (
                    <>
                        <TextControl
                            label={ __( 'Expand button text', 'awesome-blocks' ) }
                            value={ attributes.expandButtonText }
                            onChange={ ( val ) => setAttributes( { expandButtonText: val } ) }
                        />
                        <TextControl
                            label={ __( 'Collapse button text', 'awesome-blocks' ) }
                            value={ attributes.collapseButtonText }
                            onChange={ ( val ) => setAttributes( { collapseButtonText: val } ) }
                        />
                    </>
                ) }
                { attributes.buttonDo == 'link' && (
                    <LinkTo attributes={ attributes } setAttributes={ setAttributes } />
                ) }
            </PanelBody>
        </>
    );
}

export default TextBoxPanel;