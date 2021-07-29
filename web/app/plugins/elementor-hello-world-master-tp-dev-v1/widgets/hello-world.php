<?php
namespace ElementorHelloWorld\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Timber\Timber;

if (! defined('ABSPATH')) {
    exit;
} // Exit if accessed directly

/**
 * Elementor Hello World
 *
 * Elementor widget for hello world.
 *
 * @since 1.0.0
 */
class Hello_World extends Widget_Base
{
    public function get_name()
    {
        return 'popular-posts';
    }

    public function get_title()
    {
        return __('Popular Posts', 'elementor-custom-widget');
    }

    public function get_icon()
    {
        return 'eicon-post-list';
    }

    protected function _register_controls()
    {


        /*
         * start control section and followup with adding control fields.
         * end control after all control field and repeat if you need other control section respectively.
        */

        /*
        $this->start_controls_section(
            'section_layout',
            [
                'label' => esc_html__( 'Layout', 'elementor-custom-widget' ),
            ]
        );
        $this->add_control(
            'sample_text',
            [
                'label' => __( 'Primary Text', 'elementor-custom-widget' ),
                'type' => Controls_Manager::TEXT,
                'default' => '',
                'title' => __( 'Enter some text', 'elementor-custom-widget' ),
            ]
        );
        $this->end_controls_section();
        */

        $this->start_controls_section(
            'section_query',
            [
                'label' => esc_html__('Basic', 'elementor-custom-widget'),
            ]
        );
        $this->add_control(
            'heading_text',
            [
                'label' => __('Heading Text', 'elementor-custom-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => '',
                'title' => __('Enter some text', 'elementor-custom-widget'),
            ]
        );

        $this->add_control(
            'posts_per_page',
            [
                'label' => __('Number of Posts', 'elementor-custom-widget'),
                'type' => Controls_Manager::SELECT,
                'default' => 5,
                'options' => [
                    1 => __('One', 'elementor-custom-widget'),
                    2 => __('Two', 'elementor-custom-widget'),
                    5 => __('Five', 'elementor-custom-widget'),
                    10 => __('Ten', 'elementor-custom-widget'),
                    -1 => __('All', 'elementor-custom-widget'),

                ]
            ]
        );


        // $this->start_controls_section(
        //     'content_section_1860_0',
        //     array(
        //         'label' => esc_html__('Title', 'elementskit-lite'),
        //         'tab' => Controls_Manager::TAB_CONTENT,
        //     )
        // );

        // $this->add_control(
        //     'ekit_wb_1860_title1',
        //     array(
        //         'label' => esc_html__('Title 1', 'elementskit-lite'),
        //         'type' => Controls_Manager::TEXT,
        //         'default' => esc_html('Some Text'),
        //         'show_label' => true,
        //         'label_block' => false,
        //         'input_type' => 'text',
        //     )
        // );

        // $this->add_control(
        //     'ekit_wb_1860_title2',
        //     array(
        //         'label' => esc_html__('Title 2', 'elementskit-lite'),
        //         'type' => Controls_Manager::TEXT,
        //         'default' => esc_html('Some Text'),
        //         'show_label' => true,
        //         'label_block' => false,
        //         'input_type' => 'text',
        //     )
        // );

        $this->add_control(
            'ekit_wb_1860_color',
            array(
                'label' => esc_html__('Color', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => esc_html('#000'),
                'show_label' => true,
                'label_block' => false,
                'alpha' => true,
            )
        );

        $this->end_controls_section();
    }

    protected function render($instance = [])
    {
        global $wpdb;
        // get our input from the widget settings.
        $settings = $this->get_settings_for_display();
        update_post_meta('2', 'ekit_wb_1860_color', $settings['ekit_wb_1860_color']);
        update_post_meta('2', 'heading_text', $settings['heading_text']);
        
        $context = Timber::get_context();

        // Récupération de la publication à afficher (équivalent de la boucle)
        // $context['post'] = new \TimberPostsCollection();
        // // Équivalent de la WP Query
        // $args = array(
        //     'post_type' => 'programmes',
        // );
        // $context['movies'] = Timber::get_posts($args);

        //   $custom_text = ! empty( $settings['ekit_wb_1860_color'] ) ? $settings['ekit_wb_1860_color'] : '';
        $context['ekit_wb_1860_color'] = $settings['ekit_wb_1860_color'];
        $context['heading_text'] =($settings['heading_text'] === 'true');
        $secteur =array(
            array("value"=>"Nord","label"=>"Nord"),
            array("value"=>"Sud","label"=>"Sud"),
            array("value"=>"Est","label"=>"Est"),
            array("value"=>"Ouest","label"=>"Ouest")
        
        );  
        
        $prestation_type=array(        
             array("value"=>"Vente","label"=>"Acheter"),
             array("value"=>"Location","label"=>"Louer"),);

        $type=array(        
                array("value"=>"Maison","label"=>"Maison"),
                array("value"=>"Appart","label"=>"Appart"),);
        $inclusions=array(        
                    array("value"=>"Maison","label"=>"Maison"),
                    array("value"=>"Appart","label"=>"Appart"),);     
        $array = array('type'=>[array("name"=>"secteur","value"=>$secteur),array("name"=>"type","value"=>$type),array("name"=>"inclusions","value"=>$inclusions),array("name"=>"prestation_type","value"=>$prestation_type)],'color' => $context['ekit_wb_1860_color'],'id' =>2,'visible' => ($context['heading_text'] === 'true'));
        $file = "C:/wamp64/www/bedrock/web/app/plugins/elementor-hello-world-master-tp-dev-v1/src/jsonFile.json";
            
        $newJsonString = json_encode($array);
        file_put_contents($file , $newJsonString);

        Timber::render('index.twig', $context);
    }

    protected function content_template()
    {
    }

    public function render_plain_content($instance = [])
    {
    }
}
