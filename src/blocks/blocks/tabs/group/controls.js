import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import {
	chevronLeft,
	chevronRight,
	edit,
	cancelCircleFilled,
} from '@wordpress/icons';

import { ToolbarButton, ToolbarGroup } from '@wordpress/components';

const Controls = ( {
	children,
	selectedTab,
	moveTab,
	selectTab,
	deleteTab,
} ) => {
	const index = children?.findIndex(
		( { clientId } ) => clientId === selectedTab
	);
	const moveTabTo = ( direction ) => {
		switch ( direction ) {
			case 'left':
				moveTab( selectedTab, index - 1 );
				break;
			case 'right':
				moveTab( selectedTab, index + 1 );
				break;
		}
	};

	return (
		<BlockControls>
			<ToolbarGroup label={ __( 'Edit', 'awesome-blocks' ) }>
				<ToolbarButton
					label={ __( 'Edit tab', 'awesome-blocks' ) }
					icon={ edit }
					iconSize={ 24 }
					className="wp-block-awesome-blocks-tabs-toolbar-edit"
					onClick={ () => selectTab( selectedTab ) }
				/>
			</ToolbarGroup>

			<ToolbarGroup label={ __( 'Movement', 'awesome-blocks' ) }>
				<ToolbarButton
					label={ __( 'Move tab left', 'awesome-blocks' ) }
					icon={ chevronLeft }
					iconSize={ 24 }
					disabled={ 0 === index }
					className="wp-block-awesome-blocks-tabs-toolbar-mover"
					onClick={ () => moveTabTo( 'left' ) }
				/>

				<ToolbarButton
					label={ __( 'Move tab right', 'awesome-blocks' ) }
					icon={ chevronRight }
					iconSize={ 24 }
					disabled={ children?.length - 1 === index }
					className="wp-block-awesome-blocks-tabs-toolbar-mover"
					onClick={ () => moveTabTo( 'right' ) }
				/>
			</ToolbarGroup>
			<ToolbarGroup label={ __( 'Delete', 'awesome-blocks' ) }>
				<ToolbarButton
					label={ __( 'Delete tab', 'awesome-blocks' ) }
					icon={ cancelCircleFilled }
					iconSize={ 24 }
					className="wp-block-awesome-blocks-tabs-toolbar-delete"
					onClick={ () => deleteTab( selectedTab ) }
				/>
			</ToolbarGroup>
		</BlockControls>
	);
};

export default Controls;
