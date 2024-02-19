<?php
if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

function awb_get_page_options() {
    global $wpdb;

    $page_options = [];
    $page_options[] = [
        'label' => __( 'Choose a page', 'awesome-blocks' ),
        'value' => 0,
    ];

    $page_res = $wpdb->get_results( $wpdb->prepare( 'SELECT ID, post_title FROM ' . $wpdb->posts . ' WHERE post_type = %s AND post_status = %s', 'page', 'publish' ) );
    foreach ( $page_res as $page_info ) {
        $page_options[] = [
            'label' => $page_info->post_title,
            'value' => $page_info->ID,
        ];
    }

    return $page_options;
}