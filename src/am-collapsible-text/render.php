<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
/*
<div { ...useBlockProps.save() }>
			<CustomTag data-content={ attributes.content }>
				{ attributes.content.slice(0, textMaxLength) } { attributes.content.length > textMaxLength && '...' }
			</CustomTag>
			<div>
				{extraControl}
			</div>
		</div>
 */
$textMaxLength = 131;
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<<?php echo $attributes["htmlTag"]; ?> data-content="<?php echo esc_attr( $attributes["content"] ); ?>">
        <?php echo esc_html( substr( $attributes["content"], 0, $textMaxLength ) );?> <?php echo strlen( $attributes["content"] ) > $textMaxLength ? '...' : ''; ?>
    </<?php echo $attributes["htmlTag"]; ?>>
    <?php
    if ( $attributes["buttonDo"]  == 'expand' ) {
    ?>
        <button class="am-collapsible-btn" data-expand-button-text="<?php echo esc_attr( $attributes["expandButtonText"] ); ?>" data-collapse-button-text="<?php echo esc_attr( $attributes["collapseButtonText"] ); ?>"><?php echo esc_html( $attributes["expandButtonText"] ); ?></button>
    <?php
	}
    ?>
</div>
