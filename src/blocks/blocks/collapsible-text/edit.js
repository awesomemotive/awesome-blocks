import { useBlockProps } from '@wordpress/block-editor';

import Inspector from './inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const CustomTag = `${attributes.htmlTag}`;
	return (
		<>
			<Inspector
				attributes={ attributes }
				setAttributes={ setAttributes }
			/>
			<div { ...useBlockProps() }>
				<div>
					<CustomTag>
						{ attributes.content.slice(0, attributes.textMaxLength) } { attributes.content.length > attributes.textMaxLength && '...' }
					</CustomTag>
				</div>
				{ attributes.buttonDo == 'expand'
						? ( <button className="am-collapsible-btn">{ attributes.expandButtonText }</button> )
						: ( <a className="am-link">{ attributes.linkButtonText }</a> )
				}
			</div>
		</>
	);
}
