/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { useEntityRecord } from '@wordpress/core-data';


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls, RichText, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';

import { BaseControl, PanelBody, RadioControl, TextareaControl, TextControl, SelectControl, __experimentalInputControl as InputControl, CustomSelectControl, CheckboxControl, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { parse } from '@wordpress/block-serialization-default-parser';
import { useState } from '@wordpress/element';


import { textMaxLength } from './constants';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';




/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {

	const [ anchorOptions, setAnchorOptions ] = useState( [{
		"label": __( "Top of Page", 'awesome-blocks' ),
		"value": ''
	} ] );
	const onChangeContent = ( val ) => {
		setAttributes( { content: val } );
	};
	const onChangeButtonDo = ( val ) => {
		setAttributes( { buttonDo: val } );
	};

	const onChangeHTMLTag = ( val ) => {
		setAttributes( { htmlTag: val } );
	};


	let extraSettings = '';
	let extraControl = '';
	if ( 'expand' == attributes.buttonDo ) {
		extraSettings = (
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
		);
		extraControl = (
			<>
				<button className="am-collapsible-btn">{ attributes.expandButtonText }</button>
			</>
		);
	} else  {

		let extraLinkSettings = '';
		if ( 'page' == attributes.linksTo ) {
			extraLinkSettings = (
				<>
					<SelectControl
						label={ __( 'Which page?', 'awesome-blocks') }
						value={ attributes.linktoPage }
						options={ awesomeBlocksCollapsibleTextVars.pageOptions }
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
			);
		} else if ( 'web_address' == attributes.linksTo  ) {
			extraLinkSettings = (
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
			);
		} else if ( 'anchor' == attributes.linksTo ) {
			const populateAnchorLinks = async ( pageId ) => {

				let tempAnchorOptions = [
					{
						"label": __( "Top of Page", 'awesome-blocks' ),
						"value": ''
					}
				];

				if ( pageId > 0 ) {
					let pageData = await apiFetch( { path: '/wp/v2/pages/' + pageId + '?context=edit' } );
					let blocks = parse( pageData.content.raw );

					blocks.map( (block) => {
						if ( block?.innerHTML ) {
							const parser = new DOMParser();
							const htmlParsed = parser.parseFromString(block?.innerHTML, "text/html");

							let idSelectors = htmlParsed.querySelectorAll('[id]');
							Array.prototype.forEach.call( idSelectors, function( el, i ) {
								// "el" is your element
								tempAnchorOptions.push({
									'label': el.id,
									'value': el.id
								});
							});
						}
					});
				}

				setAnchorOptions( tempAnchorOptions );
			}

			if ( attributes.linkToPage > 0 ) {
				populateAnchorLinks( attributes.linkToPage );
			}


			extraLinkSettings = (
				<>
					<SelectControl
						label={ __( 'Which page?', 'awesome-blocks') }
						value={ attributes.linkToPage }
						options={ awesomeBlocksCollapsibleTextVars.pageOptions }
						onChange={ val => { setAttributes( { linkToPage: Number( val ) } ); populateAnchorLinks( Number( val ) ); } }
					/>
					{ attributes.linkToPage > 0 && <SelectControl
						label={ __( 'Which anchor on this page?', 'awesome-blocks') }
						value={ attributes.anchor }
						options={ anchorOptions }
						onChange={ val => { setAttributes( { anchor: val } ); } }
					/>}
				</>
			);
		} else if ( 'top_bottom_of_page' == attributes.linksTo ) {
			extraLinkSettings = (
				<RadioControl
					label={ __( "Link visitors to the top/bottom of the page (whichever page they're on).", 'awesome-blocks' ) }
					selected={ attributes.topBottomOfThePage }
					options={ [
						{ label: __( 'Top', 'awesome-blocks' ), value: 'top' },
						{ label: __( 'Bottom', 'awesome-blocks' ), value: 'bottom' }
					] }
					onChange={ val => setAttributes( { topBottomOfThePage: val } ) }
				/>
			);
		} else if ( 'document' == attributes.linksTo ) {
			extraLinkSettings = (
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
			);
		} else if ( 'email' == attributes.linksTo ) {
			extraLinkSettings = (
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
			);
		} else if ( 'phone_number' == attributes.linksTo ) {
			extraLinkSettings = (
				<TextControl
					label={ __( 'Add your number with country & area code', 'awesome-blocks') }
					placeholder={ __( 'e.g., +1-234-567890', 'awesome-blocks' ) }
					help={ __( 'Add your country code and area code so customers anywhere in the world can be in touch.', 'awesome-blocks' ) }
					value={ attributes.phoneNumber }
					onChange={ ( val ) => setAttributes( { phoneNumber: val ?? '' } ) }
				/>
			);
		}

		extraSettings = (
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

				{ extraLinkSettings }
			</>
		);

		extraControl = (
			<>
				<a className="am-link">{ attributes.linkButtonText }</a>
			</>
		);
	}

	const CustomTag = `${attributes.htmlTag}`;

	return (
		<>
			<div { ...useBlockProps() }>
				<div>
				<CustomTag>
					{ attributes.content.slice(0, textMaxLength) } { attributes.content.length > textMaxLength && '...' }
				</CustomTag>
				</div>
				<div style={{ textAlign: "left" }}>
					{ extraControl }
				</div>
			</div>
			<InspectorControls>
				<PanelBody title={ __( 'Text Box Settings', 'awesome-blocks' ) } initialOpen={ true }>
					<TextareaControl
						label={ __( 'Text', 'awesome-blocks' ) }
						help={ __( 'Change Text', 'awesome-blocks' ) }
						onChange={ onChangeContent }
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
						onChange={ onChangeButtonDo }
					/>
					{ extraSettings }
				</PanelBody>
				<PanelBody title={ __( 'SEO & accessibility', 'awesome-blocks' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Accessible name', 'awesome-blocks' ) }
						value={ attributes.accessibleName }
						onChange={ ( val ) => setAttributes( { accessibleName: val } ) }
					/>
					<SelectControl
						label={ __( 'Choose HTML tag', 'awesome-blocks' ) }
						value={ attributes.htmlTag }
						options={ [
							{ label: 'p', value: 'p' },
							{ label: 'div', value: 'div' },
							{ label: 'h1', value: 'h1' },
							{ label: 'h2', value: 'h2' },
							{ label: 'h3', value: 'h3' },
							{ label: 'h4', value: 'h4' },
							{ label: 'h5', value: 'h5' },
							{ label: 'h6', value: 'h6' },
							{ label: 'blockquote', value: 'blockquote' },
						] }
						onChange={ onChangeHTMLTag }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
