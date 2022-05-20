<?php
// FLEXSLIDER
function flexslider2()
{
    if (!is_admin()) {

        // Enqueue FlexSlider JavaScript
        wp_register_script('jquery_flexslider', get_template_directory_uri(). '/js/jquery.flexslider-min.js', array('jquery'));
        wp_enqueue_script('jquery_flexslider');

        // Enqueue FlexSlider Stylesheet
        wp_register_style('flexslider-style', get_template_directory_uri() . '/css/flexslider.css', 'all');
        wp_enqueue_style('flexslider-style');

        // FlexSlider custom settings
        add_action('wp_footer', 'flexslider_settings2');

        function flexslider_settings2() { ?>
<script>
jQuery(document).ready(function($) {

    $('.flexslider_mobile').flexslider({
        animation: "fade",
        // controlNav: false,

        controlsContainer: $(".custom-controls-container-r"),
        customDirectionNav: $(".custom-navigation-r a")
    });
});
</script>
<?php
        }
    }
}
add_action('init', 'flexslider2');
// todo transformer en widget elementor
function cux_gallery_embed_shortcode_mobile($atts)
{
    $images = get_field($atts['field']);
    $atts = array_change_key_case((array)$atts, CASE_LOWER);
    if ($images): ?>

<style>
.flexslidermobile {
    margin-bottom: 10px;
}

.flex-control-nav {
    position: relative;
    bottom: auto;

}

.custom-navigation-r {
    display: table;
    width: 100%;
    table-layout: fixed;
    position: relative;
    top: 240px;
}

.custom-navigation-r>* {
    display: table-cell;
}

.custom-navigation-r>a {
    width: 120px;
    font-family: normatica regular, Sans-serif;
    color: <?php echo $atts['color'];
    ?>;
    font-size: 16px;

}

.custom-img-r:hover {

    filter: saturate(1.5) !important;
}

.custom-img-r {

    color: <?php echo $atts['color'];
    ?>;
    margin-left: 0px;
    margin-top: 0px;
    background: rgb(250, 250, 250);
    border-width: 0px 0px 4px !important;
    border-style: solid !important;
    border-image: initial !important;
    border-radius: 0px 23px 23px 0px !important;
    padding: 0px;
    width: 879px !important;
    height: 230px !important;
    box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px !important;
    left: 5px;


}

.custom-navigation-r .flex-next {
    text-align: center;
}
</style>
<!-- <a><i aria-hidden="true" class="fas fa-arrow-circle-left"></i> <?php echo count($images).' photos'; ?></a> -->
<?php if ($atts['type']=="json"): ?>
<div id="slider" class="flexslider_mobile  d-lg-none" style="direction:rtl">
    <ul class="slides">

        <?php
    
        foreach (json_decode($images) as $image): ?>
        <li>
            <img class="custom-img-r" src="<?php echo $image->url; ?>" />
        </li>
        <?php endforeach; ?>

    </ul>


</div>
<?php if (count(json_decode($images))>1): ?>
<div class="custom-navigation-r  d-lg-none">
    <a href="#" class="flex-prev"><i aria-hidden="true" class="fas fa-arrow-circle-left"></i> Précédent</a>
    <div class="custom-controls-container-r"></div>
    <a href="#" class="flex-next">Suivant <i aria-hidden="true" class="fas fa-arrow-circle-right"></i></a>
</div>
<?php endif; ?>
<?php endif; ?>

<?php if ($atts['type']!=="json"): ?>

<div id="slider" class="flexslider_mobile  d-lg-none" style="direction:rtl">
    <ul class="slides">
        <?php foreach ($images as $image_id): ?>
        <li>
            <?php echo wp_get_attachment_image($image_id, 'medium', false, array('class' => 'custom-img-r')); ?>
        </li>
        <?php endforeach; ?>
    </ul>
</div>
<div class="custom-navigation-r  d-lg-none">
    <a href="#" class="flex-prev"><i aria-hidden="true" class="fas fa-arrow-circle-left"></i> Précédent</a>
    <div class="custom-controls-container-r"></div>
    <a href="#" class="flex-next">Suivant <i aria-hidden="true" class="fas fa-arrow-circle-right"></i></a>
</div>
<?php endif; ?>

<?php endif; ?>
<?php
}

add_shortcode('cux_gallery_embed_mobil', 'cux_gallery_embed_shortcode_mobile');