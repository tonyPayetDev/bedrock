<?php
// FLEXSLIDER
function flexslider()
{
    if (!is_admin()) {

        // Enqueue FlexSlider JavaScript
        wp_register_script('jquery_flexslider', get_template_directory_uri(). '/js/jquery.flexslider-min.js', array('jquery'));
        wp_enqueue_script('jquery_flexslider');

        // Enqueue FlexSlider Stylesheet
        wp_register_style('flexslider-style', get_template_directory_uri() . '/css/flexslider.css', 'all');
        wp_enqueue_style('flexslider-style');

        // FlexSlider custom settings
        add_action('wp_footer', 'flexslider_settings');

        function flexslider_settings() { ?>
<script>
jQuery(document).ready(function($) {

    $('.flexslider').flexslider({
        animation: "fade",
        controlsContainer: $(".custom-controls-container"),
        customDirectionNav: $(".custom-navigation a")
    });
});
</script>
<?php
        }
    }
}
add_action('init', 'flexslider');
// todo transformer en widget elementor
function cux_gallery_embed_shortcode($atts)
{
    $images = get_field($atts['field']);
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
    if ($images): ?>

<style>
.flexslider {
    margin-bottom: 10px;
}

.flex-control-nav {
    position: relative;
    bottom: auto;

}

.custom-navigation {
    display: table;
    width: 100%;
    table-layout: fixed;

}

.custom-navigation>* {
    display: table-cell;
}

.custom-navigation>a {
    width: 120px;
    font-family: normatica regular, Sans-serif;
    color: <?php echo $atts['color'];
    ?>;
    font-size: 16px;

}

.custom-img {}

.custom-navigation .flex-next {
    text-align: right;
}
</style>
<!-- <a><i aria-hidden="true" class="fas fa-arrow-circle-left"></i> <?php echo count($images).' photos'; ?></a> -->
<?php if ($atts['type']=="json"): ?>
<div id="slider" class="flexslider" style="direction:rtl">
    <ul class="slides">

        <?php
    
        foreach (json_decode($images) as $image): ?>
        <li>
            <img style=" border-color:<?php echo $atts['color']; ?>;margin-left: 0px;margin-top: 0px;background: rgb(250, 250, 250);border-width: 0px 0px 3px;border-style: solid;border-image: initial;border-radius: 0px 23px 23px 0px;padding: 0px;width: 879px;height: 530px;box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;left: 5px;"
                src="<?php echo $image->url; ?>"></img>
        </li>
        <?php endforeach; ?>

    </ul>


</div>
<?php if (count(json_decode($images))>1): ?>
<div class="custom-navigation">
    <a href="#" class="flex-prev"><i aria-hidden="true" class="fas fa-arrow-circle-left"></i> Précédent</a>
    <div class="custom-controls-container"></div>
    <a href="#" class="flex-next">Suivant <i aria-hidden="true" class="fas fa-arrow-circle-right"></i></a>
</div>
<?php endif; ?>
<?php endif; ?>

<?php if ($atts['type']!=="json"): ?>

<div id="slider" class="flexslider">
    <ul class="slides">
        <?php foreach ($images as $image): $url=wp_get_attachment_image($image, "full"); ?>
        <li>
            <img src=<?php echo $url ; ?> style="border-color:red ;margin-left: 0px;margin-top:
                0px;background: rgb(250, 250, 250);border-width: 0px 0px 3px;border-style: solid;border-image:
                initial;border-radius: 0px 23px 23px 0px;padding: 0px;width: 879px;height: 530px;box-shadow: rgba(0, 0,
                0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px;left: 5px;"></img>
        </li>
        <?php endforeach; ?>
    </ul>
</div>
<div class="custom-navigation">
    <a href="#" class="flex-prev"><i aria-hidden="true" class="fas fa-arrow-circle-left"></i> Précédent</a>
    <div class="custom-controls-container"></div>
    <a href="#" class="flex-next">Suivant <i aria-hidden="true" class="fas fa-arrow-circle-right"></i></a>
</div>
<?php endif; ?>

<?php endif; ?>
<?php
}

add_shortcode('cux_gallery_embed', 'cux_gallery_embed_shortcode');