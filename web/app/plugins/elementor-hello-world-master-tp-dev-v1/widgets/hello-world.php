<?php
namespace ElementorHelloWorld\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;
use Timber\Timber;
use \Elementor\ElementsKit_Widget_Page_List_Handler as Handler;
use \ElementsKit_Lite\Modules\Controls\Controls_Manager as ElementsKit_Controls_Manager;
use Elementor\Repeater;

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

    protected function _register_controls2()
    {
    }
    protected function register_controls()
    {
        $this->start_controls_section(
            'section_categories',
            [
                'label' => __('Nom des filtres', 'elementor'),
            ]
        );
    
        $repeater = new Repeater();
    
        $repeater->add_control(
            'category_slug',
            [
                'label'       => __('Category Slug', 'elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => __('category-name', 'elementor'),
                'label_block' => true,
            ]
        );
    
        $repeater->add_control(
            'category_title',
            [
                'label'       => __('Category Title', 'elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => __('Category Title', 'elementor'),
                'label_block' => true,
            ]
        );
    
        $this->add_control(
            'categories',
            [
                'label'       => __('Contacts', 'elementor'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $repeater->get_controls(),
                'title_field' => '{{{ category_title }}}',
            ]
        );
    
        $this->end_controls_section();
    
        $this->start_controls_section(
            'section_prices',
            [
                'label' => __('Valeur des filtres', 'elementor'),
            ]
        );
    
        $serviceRepeater = new Repeater();
    
        $serviceRepeater->add_control(
            'category_slug',
            [
                'label'       => __('Category Slug', 'elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => __('category-name', 'elementor'),
                'label_block' => true,
            ]
        );
    
        $serviceRepeater->add_control(
            'service_title',
            [
                'label'       => __('Service Title', 'elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => __('Service Title', 'elementor'),
                'label_block' => true,
            ]
        );
    
        $serviceRepeater->add_control(
            'service_price',
            [
                'label'       => __('Price', 'elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => __('40,00', 'elementor'),
                'label_block' => true,
            ]
        );
    
        $this->add_control(
            'services',
            [
                'label'       => __('Services', 'elementor'),
                'type'        => Controls_Manager::REPEATER,
                'fields'      => $serviceRepeater->get_controls(),
                'title_field' => '{{{ service_title }}}',
            ]
        );
    
        $this->end_controls_section();
        
        $this->start_controls_section(
            'page_list_settings',
            [
                'label' => esc_html__('Settings', 'elementskit-lite')
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
            'post',
            [
                'label' => __('post', 'elementor-custom-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => '',
                'title' => __('Enter some text', 'elementor-custom-widget'),
            ]
        );
        $this->add_control(
            'search_text',
            [
                'label' => __('Search Text', 'elementor-custom-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => '',
                'title' => __('Enter search text', 'elementor-custom-widget'),
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
        $this->add_control(
            'view',
            [
                'label' => esc_html__('Layout', 'elementskit-lite'),
                'type' => Controls_Manager::CHOOSE,
                'default' => 'traditional',
                'options' => [
                    'traditional' => [
                        'title' => esc_html__('Default', 'elementskit-lite'),
                        'icon' => 'eicon-editor-list-ul',
                    ],
                    'inline' => [
                        'title' => esc_html__('Inline', 'elementskit-lite'),
                        'icon' => 'eicon-ellipsis-h',
                    ],
                ],
                'render_type' => 'template',
                'classes' => 'elementor-control-start-end',
                'label_block' => false,
                'style_transfer' => true,
            ]
        );

        $this->add_responsive_control(
            'page_grid',
            [
                'label' => esc_html__('Columns Grid', 'elementskit-lite'),
                'type' =>  Controls_Manager::SELECT,
                'options' => [
                    '12'  => esc_html__('1 Columns', 'elementskit-lite'),
                    '6'  => esc_html__('2 Columns', 'elementskit-lite'),
                    '4' => esc_html__('3 Columns', 'elementskit-lite'),
                    '3' => esc_html__('4 Columns', 'elementskit-lite'),
                    '2' => esc_html__('6 Columns', 'elementskit-lite'),
                ],
                'condition' => ['view' => 'inline']
            ]
        );

        $this->add_control(
            'ekit_href_target',
            [
                'label' => esc_html__('Target', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'default' => '_blank',
                'options' => [
                    '_blank'  => esc_html__('Blank', 'elementskit-lite'),
                    'self' => esc_html__('Self', 'elementskit-lite'),
                ],
            ]
        );
        $this->add_control(
            'ekit_map_btn',
            [
                'label' => esc_html__('carte map', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );
        $this->add_control(
            'ekit_search_btn',
            [
                'label' => esc_html__('button search', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );
        $this->add_control(
            'ekit_biens',
            [
                'label' => esc_html__('Biens', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );
        $this->add_control(
            'ekit_wb_3976_font',
            array(
                'label' => esc_html__('Font', 'elementskit-lite'),
                'type'  => Controls_Manager::FONT,
                'show_label' => true ,
                'label_block' => true ,
                'options' => array(
                    'family-name' => 'Font Name',
                ),
                'groups' => array(
                    'group-key' => 'group value',
                ),
            )
        );
        $this->add_control(
            'ekit_wb_3976_icons',
            array(
                'label' => esc_html__('Icons', 'elementskit-lite'),
                'type'  => Controls_Manager::ICONS,
                'show_label' => true ,
                'label_block' => true ,
                'skin' => 'media' ,
                'default' => array(
                    'value' => '',
                    'library' => '',
                )
            )
        );
        
        $this->add_control(
            'ekit_wb_225_url',
            array(
                'label' => esc_html__('API URL', 'elementskit-lite'),
                'type'  => Controls_Manager::URL,
                'placeholder' =>  esc_html('Paste URL or type'),
                'show_label' => true ,
                'label_block' => true ,
                'show_external' => true ,
                'default' => array(
                    'url' => 'http://localhost/wordpress-labo/wp-json/api/v1',
                    'is_external' => true,
                    'nofollow' => true,
                ),
            )
        );
        $this->add_control(
            'ekit_wb_225_url_post',
            array(
                'label' => esc_html__('API URL', 'elementskit-lite'),
                'type'  => Controls_Manager::URL,
                'placeholder' =>  esc_html('Paste URL or type'),
                'show_label' => true ,
                'label_block' => true ,
                'show_external' => true ,
                'default' => array(
                    'url' => 'http://localhost:8000/programmes',
                    'is_external' => true,
                    'nofollow' => true,
                ),
            )
        );
        $this->add_control(
            'ekit_wb_226_url',
            array(
                'label' => esc_html__('URL', 'elementskit-lite'),
                'type'  => Controls_Manager::URL,
                'placeholder' =>  esc_html('Paste URL or type'),
                'show_label' => true ,
                'label_block' => true ,
                'show_external' => true ,
                'default' => array(
                    'url' => 'https://products.wpmet.com/elementskit/',
                    'is_external' => true,
                    'nofollow' => true,
                ),
            )
        );
        $this->add_control(
            'ekit_maps',
            [
                'label' => esc_html__('Maps', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'ekit_wb_225_code',
            array(
                'label' => esc_html__('Code', 'elementskit-lite'),
                'type'  => Controls_Manager::CODE,
                'show_label' => true,
                'label_block' => true,
                'language' => 'html',
            )
        );
        $this->end_controls_section();

        $this->start_controls_section(
            'section_icon_list',
            [
                'label' => esc_html__('List', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'ekit_page_list_padding',
            [
                'label' => esc_html__('Padding', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item > a' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}} !important',
                ],
            ]
        );

        $this->add_responsive_control(
            'ekit_page_list_margin',
            [
                'label' => esc_html__('Margin', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item > a' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );


        $this->add_control(
            'ekit_page_list_border_radius',
            [
                'label' => esc_html__('Border Radius', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item > a' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        

        $this->add_control(
            'ekit_page_list_background_title',
            [
                'label' => esc_html__('Hover', 'elementskit-lite'),
                'type' => Controls_Manager::HEADING,
                'separator' => 'before',
            ]
        );


        $this->add_control(
            'ekit_page_list_background_title_hr',
            [
                'type' => Controls_Manager::DIVIDER,
            ]
        );


        $this->add_responsive_control(
            'icon_align',
            [
                'label' => esc_html__('Alignment', 'elementskit-lite'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'left' => [
                        'title' => esc_html__('Left', 'elementskit-lite'),
                        'icon' => 'eicon-text-align-left',
                    ],
                    'center' => [
                        'title' => esc_html__('Center', 'elementskit-lite'),
                        'icon' => 'eicon-text-align-center',
                    ],
                    'right' => [
                        'title' => esc_html__('Right', 'elementskit-lite'),
                        'icon' => 'eicon-text-align-right',
                    ],
                ],
                'prefix_class' => 'elementor%s-align-',
            ]
        );

        $this->add_control(
            'divider',
            [
                'label' => esc_html__('Divider', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_off' => esc_html__('Off', 'elementskit-lite'),
                'label_on' => esc_html__('On', 'elementskit-lite'),
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item:not(:last-child):after' => 'content: ""',
                ],
                'separator' => 'before',
                'prefix_class'	=> 'ekit-has-divider-'
            ]
        );

        $this->add_control(
            'divider_style',
            [
                'label' => esc_html__('Style', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'options' => [
                    'solid' => esc_html__('Solid', 'elementskit-lite'),
                    'dotted' => esc_html__('Dotted', 'elementskit-lite'),
                    'dashed' => esc_html__('Dashed', 'elementskit-lite'),
                ],
                'default' => 'solid',
                'condition' => [
                    'divider' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-items:not(.elementor-inline-items) .elementor-icon-list-item:not(:last-child):after' => 'border-top-style: {{VALUE}}',
                    '{{WRAPPER}} .elementor-icon-list-items.elementor-inline-items .elementor-icon-list-item:not(:last-child):after' => 'border-left-style: {{VALUE}}',
                ],
            ]
        );

        $this->add_control(
            'divider_weight',
            [
                'label' => esc_html__('Weight', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 1,
                ],
                'range' => [
                    'px' => [
                        'min' => 1,
                        'max' => 20,
                    ],
                ],
                'condition' => [
                    'divider' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-items:not(.elementor-inline-items) .elementor-icon-list-item:not(:last-child):after' => 'border-top-width: {{SIZE}}{{UNIT}}',
                    '{{WRAPPER}} .elementor-inline-items .elementor-icon-list-item:not(:last-child):after' => 'border-left-width: {{SIZE}}{{UNIT}}',
                ],
            ]
        );

        $this->add_control(
            'divider_width',
            [
                'label' => esc_html__('Width', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'unit' => '%',
                ],
                'condition' => [
                    'divider' => 'yes',
                    'view!' => 'inline',
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item:not(:last-child):after' => 'width: {{SIZE}}{{UNIT}}',
                ],
            ]
        );

        $this->add_control(
            'divider_height',
            [
                'label' => esc_html__('Height', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ '%', 'px' ],
                'default' => [
                    'unit' => '%',
                ],
                'range' => [
                    'px' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                    '%' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
                'condition' => [
                    'divider' => 'yes',
                    'view' => 'inline',
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item:not(:last-child):after' => 'height: {{SIZE}}{{UNIT}}',
                ],
            ]
        );

        $this->add_control(
            'divider_color',
            [
                'label' => esc_html__('Color', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => '#ddd',
                'condition' => [
                    'divider' => 'yes',
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item:not(:last-child):after' => 'border-color: {{VALUE}}',
                ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_icon_style',
            [
                'label' => esc_html__('Icon', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );
        $this->add_control(
            'icon_position',
            [
                'label' => esc_html__('Icon Position', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'default' => 'row',
                'options' => [
                    'row'  => esc_html__('Left', 'elementskit-lite'),
                    'row-reverse' => esc_html__('Right', 'elementskit-lite'),
                    'column' => esc_html__('Top', 'elementskit-lite'),
                ],
                'selectors' => [
                    '{{WRAPPER}} .ekit_page_list_content' => 'flex-direction: {{VALUE}};'
                ],
            ]
        );
        $this->add_responsive_control(
            'ekit_menu_list_icon_vetical_align',
            [
                'label' => esc_html__('Vertical Alignment', 'elementskit-lite'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'flex-start' => [
                        'title' => esc_html__('Top', 'elementskit-lite'),
                        'icon' => 'eicon-v-align-top',
                    ],
                    'center' => [
                        'title' => esc_html__('Center', 'elementskit-lite'),
                        'icon' => 'eicon-v-align-middle',
                    ],
                    'flex-end' => [
                        'title' => esc_html__('Bottom', 'elementskit-lite'),
                        'icon' => 'eicon-v-align-bottom',
                    ],
                ],
                'default' => 'center',
                'toggle' => true,
                'condition' => [
                    'icon_position!' => 'column'
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-icon' => 'align-self: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'icon_width',
            [
                'label' => esc_html__('Width', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px', '%' ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 5,
                    ],
                    '%' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item .elementor-icon-list-icon' => 'width: {{SIZE}}{{UNIT}};',
                ],
                'condition'	=> [
                    'icon_position_bg_background!' => ''
                ]
            ]
        );
        $this->add_responsive_control(
            'icon_height',
            [
                'label' => esc_html__('Height', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px' ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 5,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item .elementor-icon-list-icon' => 'line-height: calc({{SIZE}}{{UNIT}} + 5{{UNIT}}); height: {{SIZE}}{{UNIT}};',
                ],
                'condition'	=> [
                    'icon_position_bg_background!' => ''
                ]
            ]
        );

        $this->add_responsive_control(
            'icon_line_height',
            [
                'label' => esc_html__('Line Height', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'size_units' => [ 'px', '%' ],
                'range' => [
                    'px' => [
                        'min' => 0,
                        'max' => 1000,
                        'step' => 5,
                    ],
                    '%' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item .elementor-icon-list-icon' => 'line-height: {{SIZE}}{{UNIT}};',
                ],
                'condition'	=> [
                    'icon_position_bg_background!' => ''
                ]
            ]
        );

        $this->add_responsive_control(
            'icon_border_radius',
            [
                'label' => esc_html__('Border Radius', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%' ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item .elementor-icon-list-icon' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};'
                ],
                'condition'	=> [
                    'icon_position_bg_background!' => ''
                ]
            ]
        );


        $this->add_responsive_control(
            'icon_color_hover',
            [
                'label' => esc_html__('Icon Hover', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item:hover .elementor-icon-list-icon i' => 'color: {{VALUE}};',
                    '{{WRAPPER}} .elementor-icon-list-item:hover .elementor-icon-list-icon svg path'	=> 'stroke: {{VALUE}}; fill: {{VALUE}};'
                ],
            ]
        );
        $this->add_responsive_control(
            'ekit_icon_margin',
            [
                'label' => esc_html__('Margin', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-icon' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'icon_size',
            [
                'label' => esc_html__('Size', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'default' => [
                    'size' => 14,
                ],
                'range' => [
                    'px' => [
                        'min' => 6,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-icon' => 'width: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .elementor-icon-list-icon i' => 'font-size: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .elementor-icon-list-icon svg'	=> 'max-width: {{SIZE}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_text_style',
            [
                'label' => esc_html__('Text', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'text_color',
            [
                'label' => esc_html__('Text Color', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-text' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'ekit_text_margin',
            [
                'label' => esc_html__('Margin', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-text' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'text_color_hover',
            [
                'label' => esc_html__('Hover', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => '',
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-item:hover .elementor-icon-list-text' => 'color: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'text_indent',
            [
                'label' => esc_html__('Padding Left', 'elementskit-lite'),
                'type' => Controls_Manager::SLIDER,
                'range' => [
                    'px' => [
                        'max' => 50,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .elementor-icon-list-text' => is_rtl() ? 'padding-right: {{SIZE}}{{UNIT}};' : 'padding-left: {{SIZE}}{{UNIT}};',
                ],
            ]
        );



        $this->end_controls_section();

        $this->start_controls_section(
            'ekit_menu_subtitle_style_tab',
            [
                'label' => esc_html__('Button', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );
        

        $this->add_control(
            'ekit_menu_subtitle_color',
            [
                'label' => esc_html__('Color', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .ekit_menu_subtitle' => 'color: {{VALUE}}',
                ],
            ]
        );
        
        $this->add_control(
            'ekit_menu_button_color_critere',
            [
                'label' => esc_html__('Color Critere bouton ', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => esc_html('#000'),
                'show_label' => true,
                'label_block' => false,
                'alpha' => true,
             
            ]
        );
        $this->add_control(
            'ekit_critere_btn',
            [
                'label' => esc_html__('button critere', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );
        $this->add_control(
            'ekit_menu_button_color_alerte',
            [
                'label' => esc_html__('Color Alerte bouton', 'elementskit-lite'),
                'type' => Controls_Manager::COLOR,
                'default' => esc_html('#000'),
                'show_label' => true,
                'label_block' => false,
                'alpha' => true,
            ]
        );
        $this->add_control(
            'ekit_alerte_btn',
            [
                'label' => esc_html__('button alerte', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

 
        $this->add_responsive_control(
            'ekit_menu_subtitle_padding',
            [
                'label' => esc_html__('Padding', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .ekit_menu_subtitle' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->end_controls_section();

        $this->start_controls_section(
            'section_label',
            [
                'label' => esc_html__('Label', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'ekit_menu_list_label_title_margin',
            [
                'label' => esc_html__('Margin', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .ekit_menu_label' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ]
            ]
        );
        $this->add_responsive_control(
            'ekit_menu_list_label_title_padding',
            [
                'label' => esc_html__('Padding', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .ekit_menu_label' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ]
            ]
        );
        $this->add_responsive_control(
            'ekit_menu_list_label_title_border_radius',
            [
                'label' => esc_html__('Border radius', 'elementskit-lite'),
                'type' => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%', 'em' ],
                'selectors' => [
                    '{{WRAPPER}} .ekit_menu_label' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ]
            ]
        );

        $this->add_control(
            'ekit_menu_list_label_align',
            [
                'label' => esc_html__('Horizontal Alignment', 'elementskit-lite'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'ekit_badge_left' => [
                        'title' => esc_html__('Left', 'elementskit-lite'),
                        'icon' => 'fa fa-align-left',
                    ],
                    'ekit_badge_right' => [
                        'title' => esc_html__('Right', 'elementskit-lite'),
                        'icon' => 'fa fa-align-right',
                    ],
                ],
                'default' => 'ekit_badge_left',
                'toggle' => true
            ]
        );

        $this->add_responsive_control(
            'ekit_menu_list_label_vetical_align_left',
            [
                'label' => esc_html__('Vertical Alignment', 'elementskit-lite'),
                'type' => Controls_Manager::CHOOSE,
                'options' => [
                    'flex-start' => [
                        'title' => esc_html__('Top', 'elementskit-lite'),
                        'icon' => 'eicon-v-align-top',
                    ],
                    'center' => [
                        'title' => esc_html__('Center', 'elementskit-lite'),
                        'icon' => 'eicon-v-align-middle',
                    ],
                    'flex-end' => [
                        'title' => esc_html__('Bottom', 'elementskit-lite'),
                        'icon' => 'eicon-v-align-bottom',
                    ],
                ],
                'default' => 'center',
                'toggle' => true,
                'selectors' => [
                    '{{WRAPPER}} .ekit_menu_label' => 'align-self: {{VALUE}};',
                ],
            ]
        );
        $this->end_controls_section();
    }

  

    protected function render($instance = [])
    {
        $settings = $this->get_settings_for_display();
        $file = dirname(__DIR__)."/inc/jsonFile.json";
        $context = Timber::get_context();

        // recuperation valeurs select
        $type=[];
        if ($settings['ekit_wb_225_code']) {
            foreach (json_decode($settings['ekit_wb_225_code']) as $key => $value) {
                foreach ($value as $key2 => $value2) {
                    $type[]=array("value"=>$key2,"label"=>$value2);
                }
            }
        }
        // adaptation du select
        foreach ($settings['categories'] as $category) {
            $tab_value=null;
            foreach ($settings['services'] as $service) {
                if ($category['category_slug'] === $service['category_slug']) {
                    $tab_value[]= array("value"=>$service['service_title'],"label"=>$service['service_price']);
                }
            }
            $tab[]= array("name"=>$category['category_slug'], "label"=>$category['category_title'], "value"=>$tab_value);
        }
        // var_dump( $settings['ekit_wb_3976_font']);
        $array = array(
           "id"=>get_the_ID(),
           "id_active"=>get_permalink(get_the_ID()), // se base l'url de la page pour checker le bon parametre
           'type'=>$tab,
           'ekit_search_btn' =>  $settings['ekit_search_btn'],
           'search_text' =>  $settings['search_text'],
           'heading_text' =>  $settings['heading_text'],
           'url' =>  $settings['ekit_wb_226_url']["url"],
            "API_URI"=> $settings['ekit_wb_225_url']["url"],
            "URL_POST"=> $settings['ekit_wb_225_url_post']["url"],
            'color' =>  $settings['ekit_wb_1860_color'] ,
            'visible' => $settings['ekit_biens'],
            'visible_search_map' => $settings['ekit_maps'],
            'ekit_wb_3976_font' => $settings['ekit_wb_3976_font'],
            'ekit_menu_button_color_critere' => $settings['ekit_menu_button_color_critere'],
            'ekit_critere_btn' => $settings['ekit_critere_btn'],
            'ekit_menu_button_color_alerte' => $settings['ekit_menu_button_color_alerte'],
            'ekit_alerte_btn' => $settings['ekit_alerte_btn'],
            'ekit_wb_3976_icons' => $settings['ekit_wb_3976_icons'],
            'ekit_map_btn' => $settings['ekit_map_btn']

            
                      
        );
        
        // enregistrement dans le fichier json
        $data = file_get_contents($file);
        $obj = json_decode($data);
            
        // recherche si il y un id parametre present
        $val=false;
        foreach ($obj as $key => $value) {
            //var_dump(  $key);
            if (isset($value->id) && $value->id==get_the_ID()) {
                $val=true;
                $id=$key ;
            }
        }
        // si existe pas on créé un objet param sinon ou update les params
        if (!$val) {
            $obj[]=array("id"=>get_the_ID());// ajout clé
        } else {
            $obj[$id]=$array; // update
        }
        $newJsonString = json_encode($obj);
        file_put_contents($file, $newJsonString);
        $context['params']=base64_encode($newJsonString) ;

        Timber::render('index.twig', $context);
    }

    public function render_plain_content($instance = [])
    {
    }
}