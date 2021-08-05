

<?php

function cux_gallery_embed_shortcode( $atts ) {

    $images = get_field('img');
    if( $images ): ?>
        <div id="slider" class="flexslider">
            <ul class="slides">
                <?php foreach( $images as $image ): ?>
                    <li>
                        <img src="<?php echo esc_url($image['url']); ?>" alt="<?php echo esc_attr($image['alt']); ?>" />
                        <p><?php echo esc_html($image['caption']); ?></p>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
        <div id="carousel" class="flexslider">
            <ul class="slides">
                <?php foreach( $images as $image ): ?>
                    <li>
                        <img src="<?php echo esc_url($image['sizes']['thumbnail']); ?>" alt="Thumbnail of <?php echo esc_url($image['alt']); ?>" />
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>
    }
<?php
}



// // Add Shortcode
// function cux_gallery_embed_shortcode( $atts ) {

// 	// Attributes
// // Load value (array of ids).
// $image_ids = get_field('img');
// if( $image_ids ) {

//     // Generate string of ids ("123,456,789").
//     $images_string = implode( ',', $image_ids );

//     // Generate and do shortcode.
//     // Note: The following string is split to simply prevent our own website from rendering the gallery shortcode.
//     $shortcode = sprintf( '[' . 'gallery ids="%s"]', esc_attr($images_string) );
//     echo do_shortcode( $shortcode );

    
// }
// }
add_shortcode( 'cux_gallery_embed', 'cux_gallery_embed_shortcode' );
