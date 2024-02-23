import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { BaseControl, PanelBody, RadioControl, TextareaControl, TextControl, SelectControl, __experimentalInputControl as InputControl, CustomSelectControl, CheckboxControl, Button } from '@wordpress/components';
import { useEntityRecords } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
const LinksTo = ( { attributes, setAttributes } ) => {

    let pageOptions = [ {
        "label": __( "Choose a page", 'awesome-blocks' ),
        "value": 0
    } ];
    const pageData = useEntityRecords( 'postType', 'page', { per_page: -1 } );
    if ( pageData.hasResolved ) {
        pageData.records?.forEach( record => {
                pageOptions.push( {
                    "label": record.title.rendered,
                    "value": record.id
                } );
        } );
    }

    let anchorOptions = [ {
            "label": __( "Top of Page", 'awesome-blocks' ),
            "value": ''
    } ];

    if ( attributes.linksTo == 'anchor' && attributes.linkToPage > 0 ) {
        let post = wp.data.select( 'core' ).getEntityRecord( 'postType', 'page', attributes.linkToPage );
        if ( post?.content?.raw ) {
            let parser = new DOMParser();
            let htmlParsed = parser.parseFromString( post.content.raw, "text/html");
            let idSelectors = htmlParsed.querySelectorAll('[id]');
            Array.prototype.forEach.call( idSelectors, function ( el, i ) {
                // "el" is your element
                anchorOptions.push({
                    'label': el.id,
                    'value': el.id
                });
            });
        }
    }

    return (
        <>
            <TextControl
                label={ __( 'Link button text', 'awesome-blocks' ) }
                value={ attributes.linkButtonText }
                onChange={ ( val ) => setAttributes( { linkButtonText: val } ) }
            />
            <RadioControl
                label={ __( 'Links to', 'awesome-blocks' ) }
                selected={ attributes.linksTo }
                options={ [
                    { label: __( 'None', 'awesome-blocks' ), value: 'none' },
                    { label: __( 'Page', 'awesome-blocks' ), value: 'page' },
                    { label: __( 'Web address', 'awesome-blocks' ), value: 'web_address' },
                    { label: __( 'Anchor', 'awesome-blocks' ), value: 'anchor' },
                    { label: __( 'Top/bottom of page', 'awesome-blocks' ), value: 'top_bottom_of_page' },
                    { label: __( 'Document', 'awesome-blocks' ), value: 'document' },
                    { label: __( 'email', 'awesome-blocks' ), value: 'email' },
                    { label: __( 'Phone number', 'awesome-blocks' ), value: 'phone_number' }
                ] }
                onChange={ val => {
                    if ( 'page' == val ) {
                        setAttributes( { linksOpen: 'current' } );
                    } else if ( 'web_address' == val ) {
                        setAttributes( { linksOpen: 'new' } );
                    }
                    setAttributes( { linksTo: val } );
                } }
            />
            { attributes.linksTo == 'page' && (
                <>
                    <SelectControl
                        label={ __( 'Which page?', 'awesome-blocks') }
                        value={ attributes.linktoPage }
                        options={ pageOptions }
                        onChange={ val => setAttributes( { linkToPage: Number( val ) } ) }
                    />
                    <RadioControl
                        label={ __( 'How does it open?', 'awesome-blocks' ) }
                        selected={ attributes.linksOpen }
                        options={ [
                            { label: __( 'New window', 'awesome-blocks' ), value: 'new' },
                            { label: __( 'Current window', 'awesome-blocks' ), value: 'current' }
                        ] }
                        onChange={ val => setAttributes( { linksOpen: val } ) }
                    />
                </>
            ) }
            { attributes.linksTo == 'web_address' && (
                <>
                    <InputControl
                        label={ __( "What's the web address (URL)?", 'awesome-blocks') }
                        placeholder={ __( 'Paste it here...', 'awesome-blocks' ) }
                        type="url"
                        value={ attributes.webAddress }
                        onChange={ ( val ) => setAttributes( { webAddress: val ?? '' } ) }
                    />
                    <RadioControl
                        label={ __( 'How does it open?', 'awesome-blocks' ) }
                        selected={ attributes.linksOpen }
                        options={ [
                            { label: __( 'New window', 'awesome-blocks' ), value: 'new' },
                            { label: __( 'Current window', 'awesome-blocks' ), value: 'current' }
                        ] }
                        onChange={ val => setAttributes( { linksOpen: val } ) }
                    />
                </>
            ) }
            { attributes.linksTo == 'anchor' && (
                <>
                    <SelectControl
                        label={ __( 'Which page?', 'awesome-blocks') }
                        value={ attributes.linkToPage }
                        options={ pageOptions }
                        onChange={ val => { setAttributes( { linkToPage: Number( val ) } ); } }
                    />
                    { attributes.linkToPage > 0 && <SelectControl
                        label={ __( 'Which anchor on this page?', 'awesome-blocks') }
                        value={ attributes.anchor }
                        options={ anchorOptions }
                        onChange={ val => { setAttributes( { anchor: val } ); } }
                    /> }
                </>
            ) }
            { attributes.linksTo == 'top_bottom_of_page' && (
                <RadioControl
                    label={ __( "Link visitors to the top/bottom of the page (whichever page they're on).", 'awesome-blocks' ) }
                    selected={ attributes.topBottomOfThePage }
                    options={ [
                        { label: __( 'Top', 'awesome-blocks' ), value: 'top' },
                        { label: __( 'Bottom', 'awesome-blocks' ), value: 'bottom' }
                    ] }
                    onChange={ val => setAttributes( { topBottomOfThePage: val } ) }
                />
            ) }
            { attributes.linksTo == 'document' && (
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={ ( media ) =>
                            setAttributes( { documentId: Number( media.id ) } )
                        }
                        value={ attributes.documentId }
                        render={ ( { open } ) => (
                            <BaseControl>
                                <BaseControl.VisualLabel>{ __( 'What doc are you linking to?', 'awesome-blocks' ) }</BaseControl.VisualLabel>
                                <Button onClick={ open } variant="secondary">{ __( 'Choose File', 'awesome-blocks' ) }</Button>
                            </BaseControl>
                        ) }
                    />
                </MediaUploadCheck>
            ) }
            { attributes.linksTo == 'email' && (
                <>
                    <InputControl
                        label={ __( "What's the email address?", 'awesome-blocks') }
                        placeholder={ __( 'Add it here...', 'awesome-blocks' ) }
                        type="email"
                        value={ attributes.emailAddress }
                        onChange={ ( val ) => setAttributes( { emailAddress: val ?? '' } ) }
                    />
                    <TextControl
                        label={ __( "What's the email subject?", 'awesome-blocks') }
                        placeholder={ __( 'Add a catchy subject line...', 'awesome-blocks' ) }
                        value={ attributes.emailSubject }
                        onChange={ ( val ) => setAttributes( { emailAddress: val ?? '' } ) }
                    />
                </>
            ) }
            { attributes.linksTo == 'phone_number' && (
                <TextControl
                    label={ __( 'Add your number with country & area code', 'awesome-blocks') }
                    placeholder={ __( 'e.g., +1-234-567890', 'awesome-blocks' ) }
                    help={ __( 'Add your country code and area code so customers anywhere in the world can be in touch.', 'awesome-blocks' ) }
                    value={ attributes.phoneNumber }
                    onChange={ ( val ) => setAttributes( { phoneNumber: val ?? '' } ) }
                />
            ) }
        </>
    );
}

export default LinksTo;