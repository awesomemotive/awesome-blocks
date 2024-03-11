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

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function awesome_blocks_init() {
    $blocks_dirs = [
        'collapsible-text',
		'tabs/group',
		'tabs/item',
		'accordion/group',
		'accordion/item',
    ];
    foreach ( $blocks_dirs as $blocks_dir ) {
		register_block_type( __DIR__ . '/build/blocks/blocks/' . $blocks_dir );
    }
}
add_action( 'init', 'awesome_blocks_init' );
