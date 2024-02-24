import Select from 'react-select';
import { useState, useEffect } from '@wordpress/element';
import { BaseControl } from '@wordpress/components';
import './editor.scss';

const MultiSelectControl = ( {
	value = [],
	options = [],
	label,
	help,
	placeholder,
	onChange,
	...reactSelectProps
} ) => {
	const [ values, setValues ] = useState( [] );

	useEffect(
		() =>
			setValues(
				options.filter( ( option ) => value.includes( option.value ) )
			),
		[ value ]
	);

	const valuesUpdated = ( values ) => {
		if ( ! onChange ) {
			return;
		}

		if ( null === values ) {
			onChange( [] );
			return;
		}

		onChange(
			options
				.filter( ( option ) =>
					values
						.map( ( token ) => token.value )
						.includes( option.value )
				)
				.map( ( option ) => option.value )
		);
	};

	return (
		<BaseControl
			label={ label }
			help={ help }
			className="gumponents-multi-select-control"
		>
			<Select
				{ ...reactSelectProps }
				value={ values }
				options={ options }
				onChange={ valuesUpdated }
				placeholder={ placeholder }
				isMulti
			/>
		</BaseControl>
	);
};

export default MultiSelectControl;
