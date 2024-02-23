<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

?>
<div <?php echo get_block_wrapper_attributes(); ?> <?php if ( ! empty( $attributes["accessibleName"] ) ) { ?>aria-label="<?php echo esc_attr( $attributes["accessibleName"] ); ?>" <?php } ?>>
	<<?php echo $attributes["htmlTag"]; ?> data-content="<?php echo esc_attr( $attributes["content"] ); ?>">
        <?php echo esc_html( substr( $attributes["content"], 0, $attributes["textMaxLength"] ) );?> <?php echo strlen( $attributes["content"] ) > $attributes["textMaxLength"] ? '...' : ''; ?>
    </<?php echo $attributes["htmlTag"]; ?>>
    <?php
    if ( $attributes["buttonDo"]  == 'expand' ) {
    ?>
        <button class="am-collapsible-btn" data-expand-button-text="<?php echo esc_attr( $attributes["expandButtonText"] ); ?>" data-collapse-button-text="<?php echo esc_attr( $attributes["collapseButtonText"] ); ?>"><?php echo esc_html( $attributes["expandButtonText"] ); ?></button>
    <?php
	} else if ( $attributes["buttonDo"]  == 'link' ) {
		switch ( $attributes["linksTo"] ) {
            case 'none':
                ?>
                <a href="" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
            case 'page':
                $target = ( $attributes["linksOpen"] == "new" ) ? "_blank" : "_self";
                ?>
                <a href="<?php echo esc_url( get_permalink( $attributes["linkToPage"] ) ); ?>" target="<?php echo esc_attr( $target ); ?>" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
            case 'web_address':
                $target = ( $attributes["linksOpen"] == "new" ) ? "_blank" : "_self";
                ?>
                <a href="<?php echo esc_url( $attributes["webAddress"] ); ?>" target="<?php echo esc_attr( $target ); ?>" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
			case 'anchor':
                $link = get_permalink( $attributes["linkToPage"] );
                if ( ! empty( $attributes["anchor"] ) ) {
					$link .= '#' . $attributes["anchor"];
                }
                ?>
                <a href="<?php echo esc_url( $link ); ?>" target="_self" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
			case 'top_bottom_of_page':
                ?>
                <a href="<?php echo get_permalink(); ?>" data-anchor="SCROLL_TO_<?php echo strtoupper( $attributes["topBottomOfThePage"] ); ?>" target="_self" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
			case 'document':
                ?>
                <a href="<?php echo get_permalink( $attributes["documentId"] ); ?>" target="_self" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
			case 'email':
				$link = "mailto:";
                if ( ! empty( $attributes["emailAddress"] ) ) {
					$link .=  $attributes["emailAddress"];
				}
				if ( ! empty( $attributes["emailSubject"] ) ) {
					$link .=  "?subject=" . $attributes["emailSubject"];
				}
                ?>
                <a href="<?php echo esc_url( $link ); ?>" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
                <?php
                break;
			case 'phone_number':
				$link = "tel:";
				if ( ! empty( $attributes["phoneNumber"] ) ) {
					$link .=  $attributes["phoneNumber"];
				}
				?>
                <a href="<?php echo esc_url( $link ); ?>" class="am-collapsible-link"><?php echo esc_html( $attributes["linkButtonText"] ); ?></a>
				<?php
                break;
        }
	}
    ?>
</div>
