<?php
/**
 * Plugin Name:       Awesome Blocks
 * Plugin URI:        awesome-blocks
 * Description:       Awesome Blocks
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            pmbaldha
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       awesome-blocks
 *
 * @package           awesome-blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'AWESOME_BLOCKS_DIR', plugin_dir_path( __FILE__ ) );

require_once( AWESOME_BLOCKS_DIR . 'inc/helpers.php' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function awesome_blocks_init() {
    $blocks_dirs = [
        'am-collapsible-text',
    ];
    foreach ( $blocks_dirs as $blocks_dir ) {
		register_block_type( __DIR__ . '/build/' . $blocks_dir );
    }

    wp_localize_script(
        'awesome-blocks-collapsible-text-editor-script',
        'awesomeBlocksCollapsibleTextVars',
        [
            'pageOptions' => awb_get_page_options(),
        ]
    );
}
add_action( 'init', 'awesome_blocks_init' );
