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

    protected function register_controls()
    {
        $this->start_controls_section(
            'section_fields',
            [
                'label' => __('Custom field', 'elementor'),
            ]
        );
    
        // on limite a deux pour l'instant pourra étre ameliorer par la suite #todo recuperer le nombre d'api
        
        $opt=$this->get_api();
        if ($opt) {
            $this->add_control(
                'view',
                [
                'label' => esc_html__('Choix api', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'default' => 'api1',
                'options' => $opt,
                'render_type' => 'template',
                'classes' => 'elementor-control-start-end',
                'label_block' => false,
                'style_transfer' => true,
            ]
            );
            $col[]=" ";
            for ($i = 1; $i <= 12; $i++) {
                $col['col-md-'.$i]=esc_html__($i, 'elementskit-lite');
            }
            $col_mobile[]=" ";
            for ($i = 1; $i <= 12; $i++) {
                $col_mobile['col-'.$i]=esc_html__($i, 'elementskit-lite');
            }
            $float=[
            " "=>esc_html__(" ", 'elementskit-lite'),
            "margin-left"=>esc_html__("margin-left", 'elementskit-lite'),
            "margin-right"=>esc_html__("margin-right", 'elementskit-lite')
            // "margin-center"=>esc_html__("auto", 'elementskit-lite')

        ];
            foreach ($opt as $opt_key => $value) {
                $repeater3 = new Repeater();

                $repeater3->add_control(
                    'choice_field',
                    [
                    'label' => esc_html__('Choix Field ', 'elementskit-lite'),
                    'type' => Controls_Manager::SELECT,
                    'default' => 'id',
                    'options' =>$this->get_name_select($opt_key),
                    

                ]
                );
                $repeater3->add_control(
                    "field_type",
                    [
                    'label' => esc_html__('Type field ', 'elementskit-lite'),
                    'type' => Controls_Manager::SELECT,
                    'default' => 'text',
                    'options' => [
                        'text'  => esc_html__('Text', 'elementskit-lite'),
                        'select'  => esc_html__('Select', 'elementskit-lite'),
                        'button' => esc_html__('Button', 'elementskit-lite'),
                        'button_param' => esc_html__('Button With Param', 'elementskit-lite'),
                        'photos' => esc_html__('Photos', 'elementskit-lite'),
                        'condition' => esc_html__('Condition', 'elementskit-lite'),
                        'hide' => esc_html__('Hide', 'elementskit-lite'),
                        'millier' => esc_html__('Millier', 'elementskit-lite'),
                        'share' => esc_html__('Share', 'elementskit-lite'),

                    ],
                ]
                );
            
                $repeater3->add_control(
                    'ekit_page_list_background_url',
                    [
                    'label' => esc_html__('Url param', 'elementskit-lite'),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
                );

                $repeater3->add_control(
                    'field_url',
                    [
                    'label'       => __('Url', 'elementor'),
                    'type'        => Controls_Manager::TEXT,
                    'default'     => __("", 'elementor'),
                    'label_block' => true,
    
                ]
                );
                $repeater3->add_control(
                    'field_url_param',
                    [
                    'label' => esc_html__('Url param ', 'elementskit-lite'),
                    'type' => Controls_Manager::SELECT,
                    'default' => 'id',
                    'options' =>$this->get_name_select($opt_key),
                    
                ]
                );
            
                $repeater3->add_control(
                    'ekit_page_list_background_cs',
                    [
                    'label' => esc_html__('Color & size', 'elementskit-lite'),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
                );

                $repeater3->add_control(
                    'field_color',
                    [
                    'label'       => __('Color', 'elementor'),
                    'type'        => Controls_Manager::COLOR,
                    'default'     => __("#FFFFFF", 'elementor'),
                    'label_block' => true,
    
                ]
                );
                $repeater3->add_control(
                    'font_size',
                    [
                    'label'       => __('Font size', 'elementor'),
                    'type'        => Controls_Manager::TEXT,
                    'default'     => __("12px", 'elementor'),
                    'label_block' => true,
    
                ]
                );
                $repeater3->add_control(
                    'ekit_page_list_background_options',
                    [
                    'label' => esc_html__('Plus options', 'elementskit-lite'),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
                );
            
                $repeater3->add_control(
                    'field_condition',
                    [
                    'label'       => __('Condition egalité (type condition)  ', 'elementor'),
                    'type'        => Controls_Manager::TEXT,
                    'default'     => __("", 'elementor'),
                    'label_block' => true,
    
                ]
                );
                $repeater3->add_control(
                    'field_text',
                    [
                    'label'       => __('Text', 'elementor'),
                    'type'        => Controls_Manager::TEXT,
                    'default'     => __("", 'elementor'),
                    'label_block' => true,
    
                ]
                );
                $repeater3->add_control(
                    'ekit_page_list_background_placement',
                    [
                    'label' => esc_html__('Placement', 'elementskit-lite'),
                    'type' => Controls_Manager::HEADING,
                    'separator' => 'before',
                ]
                );

                $repeater3->add_control(
                    'field_row',
                    [
                    'label'       => __('Row', 'elementor'),
                    'type'        => Controls_Manager::TEXT,
                    'default'     => __("row", 'elementor'),
                    'label_block' => true,
    
                ]
                );
            
                $repeater3->add_control(
                    'field_col',
                    [
                    'label' => esc_html__('Nb column ', 'elementskit-lite'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '0',
                    'options' =>$col
                ]
                );
          
                $repeater3->add_control(
                    'field_float',
                    [
                    'label' => esc_html__('Float ', 'elementskit-lite'),
                    'type' => Controls_Manager::SELECT,
                    'default' => '',
                    'options' =>$float
                ]
                );
 

                $repeater3->add_responsive_control(
                    'field__margin',
                    [
                    'label' => esc_html__('Margin', 'elementskit-lite'),
                    'type' => Controls_Manager::DIMENSIONS,
                    'size_units' => [ 'px', '%', 'em' ],
                    'selectors' => [
                        '{{WRAPPER}} .ekit_menu_label' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                    ]
                ]
                );
                $repeater3->add_control(
                    'field_icon',
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
                    $opt_key.'fields',
                    [
                    'label'       => __('Fields '.$opt_key, 'elementor'),
                    'type'        => Controls_Manager::REPEATER,
                    'fields'      => $repeater3->get_controls(),
                    'title_field' =>'{{{ field_type }}} {{{ choice_field }}}',
                    'condition' => ['view' => $opt_key]
    
                ]
                );
            }
        }
        $this->end_controls_section();

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
                'type' => Controls_Manager::SELECT,
                'default'     => __('category-name', 'elementor'),
                'label_block' => true,
                'options' =>$this->get_name_select($opt_key),
    
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
        $repeater->add_control(
            'category_criteres',
            [
                'label'       => __('Critere', 'elementor'),

                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),

                'default'     => __('', 'elementor'),
                'label_block' => true,
            ]
        );
        $repeater->add_control(
            'type_element',
            [
                'label' => esc_html__('Type element', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'default' => 'select',
                'options' => [
                    'select'  => esc_html__('Select', 'elementskit-lite'),
                    'button' => esc_html__('Button', 'elementskit-lite'),
                    'text' => esc_html__('Input', 'elementskit-lite'),
                    'checkbox' => esc_html__('Checkbox', 'elementskit-lite'),
                    'legend' => esc_html__('Legend', 'elementskit-lite'),

                ],
            ]
        );
        $repeater->add_control(
            'type_symbole',
            [
                'label' => esc_html__('Symbole', 'elementskit-lite'),
                'type' => Controls_Manager::TEXT,
                'label_block' => true,
            ]
        );
        $repeater->add_control(
            'name_plus',
            [
                'label' => esc_html__('Slug +', 'elementskit-lite'),
                'type' => Controls_Manager::TEXT,
                'label_block' => true,
            ]
        );
        $repeater->add_control(
            'category_col',
            [
                'label' => esc_html__('Nb column ', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'default' => 'col-3',
                'options' =>$col
            ]
        );
        $repeater->add_control(
            'category_col_mobile',
            [
                'label' => esc_html__('Nb column mobile ', 'elementskit-lite'),
                'type' => Controls_Manager::SELECT,
                'default' => 'col-3',
                'options' =>$col_mobile
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
                'type' => Controls_Manager::SELECT,
                'default'     => __('category-name', 'elementor'),
                'label_block' => true,
                'options' =>$this->get_name_select($opt_key),

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
            'service_label',
            [
                'label'       => __('Service Label', 'elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => __('Service Title', 'elementor'),
                'label_block' => true,
            ]
        );
        
        
        $serviceRepeater->add_control(
            'service_active',
            [
                'label'       => __('Active', 'elementor'),

                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),

                'default'     => __('', 'elementor'),
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
            'post',
            [
                'label' => __('post', 'elementor-custom-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => '',
                'title' => __('Enter some text', 'elementor-custom-widget'),
            ]
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
            'first_load',
            [
                'label' => esc_html__('Premier chargement', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

  
        $this->end_controls_section();
        
        $this->start_controls_section(
            'showhide',
            [
                'label' => esc_html__('Show & hide', 'elementskit-lite')
            ]
        );
        $this->add_control(
            'ekit_dynamic_text',
            [
                'label' => esc_html__('Dynamique text heading ', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );
        $this->add_control(
            'ekit_map_btn',
            [
                'label' => esc_html__('Carte map', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );


        $this->add_control(
            'paginator',
            [
                'label' => esc_html__('Pagination', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
            ]
        );

        $this->add_control(
            'ekit_resultat',
            [
                'label' => esc_html__('Resultat', 'elementskit-lite'),
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
                'label' => esc_html__('Bouton recherche', 'elementskit-lite'),
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
        // $this->add_control(
        //     'ekit_menu_subtitle_color',
        //     [
        //         'label' => esc_html__('Color', 'elementskit-lite'),
        //         'type' => Controls_Manager::COLOR,
        //         'selectors' => [
        //             '{{WRAPPER}} .ekit_menu_subtitle' => 'color: {{VALUE}}',
        //         ],
        //     ]
        // );
        

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
            'ekit_menu_active',
            [
                'label' => esc_html__('Affichage menu (carte galerie)', 'elementskit-lite'),
                'type' => Controls_Manager::SWITCHER,
                'label_on' => esc_html__('Show', 'elementskit-lite'),
                'label_off' => esc_html__('Hide', 'elementskit-lite'),
                'return_value' => 'yes',
                'default' => 'yes',
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

 

            
        $this->end_controls_section();


        $this->start_controls_section(
            'section_text_style',
            [
                'label' => esc_html__('Text', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
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
            'heading_text',
            [
                'label' => __('Heading Text', 'elementor-custom-widget'),
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
            'col_heading_text',
            [
                'label' => __('Number column heading ', 'elementor-custom-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => '',
                'title' => __('Enter number column heading text', 'elementor-custom-widget'),
            ]
        );
        $this->add_control(
            'col_post',
            [
                'label' => __('Number column post ', 'elementor-custom-widget'),
                'type' => Controls_Manager::TEXT,
                'default' => 'col-3',
                'title' => __('Enter number column post', 'elementor-custom-widget'),
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
  



        $this->end_controls_section();


        $this->start_controls_section(
            'section_css',
            [
                'label' => esc_html__('Css', 'elementskit-lite'),
                'tab' => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_control(
            'ekit_wb_225_code',
            array(
                'label' => esc_html__('Card body', 'elementskit-lite'),
                'type'  => Controls_Manager::CODE,
                'show_label' => true,
                'label_block' => true,
                'language' => 'json',

            )
        );
        $this->add_control(
            'ekit_wb_226_code',
            array(
                'label' => esc_html__('Card', 'elementskit-lite'),
                'type'  => Controls_Manager::CODE,
                'show_label' => true,
                'label_block' => true,
                'language' => 'json',

            )
        );
        $this->add_control(
            'ekit_wb_227_code',
            array(
                'label' => esc_html__('Card image', 'elementskit-lite'),
                'type'  => Controls_Manager::CODE,
                'show_label' => true,
                'label_block' => true,
                'language' => 'json',

            )
        );
    }
    // return les api saisie dans param elementor
    public function get_api()
    {
        for ($i = 1; $i <= 10; $i++) {
            $page_settings_manager = \Elementor\Core\Settings\Manager::get_settings_managers('page');
            $page_settings_model = $page_settings_manager->get_model(get_the_ID());
            $url =$page_settings_model->get_settings('api'.$i);
            if ($url) {
                $opt['api'.$i]=  esc_html__('api'.$i, 'elementskit-lite');
            }
        }
        return $opt;
    }
    
    // return la valeur des noms des filtres disponible
    public function get_name_select($opt_key)
    {
        $tab_key_post= [];
        
        if (get_current_user_id()) { // pour optimiser le temps de chargement  wp_remote_get appeler si connecter et elementor
            $page_settings_manager = \Elementor\Core\Settings\Manager::get_settings_managers('page');
            $page_settings_model = $page_settings_manager->get_model(get_the_ID());
            $url =$page_settings_model->get_settings($opt_key);
            $response = wp_remote_get($url."&name_select=true");//todo a voir pour optimiser la recuperation des champs
            $body     = wp_remote_retrieve_body($response);
            $body =json_decode($body);
        
            if ($body && $opt_key) {
                foreach ($body as $key => $value) {
                    if ($key=='name_select') {
                        foreach ($value as $key2 => $value2) {
                            $tab_key_post[$value2 ]=  esc_html__($value2, 'elementskit-lite');
                        }
                    }
                }
            }
        }
        return $tab_key_post;
    }
    
    protected function render($instance = [])
    {
        $settings = $this->get_settings_for_display();
        $page_settings_manager = \Elementor\Core\Settings\Manager::get_settings_managers('page');

        $page_settings_model = $page_settings_manager->get_model(get_the_ID());
        $url =$page_settings_model->get_settings($settings['view']);
        
        $cpt="";
        // fin dynamique des champs todo mette dans une fonction
        $file = dirname(__DIR__)."/inc/jsonFile.json";
        $context = Timber::get_context();
        
        // recuperation valeurs select
        $type=[];
        foreach ($settings['categories'] as $category) {
            $tab_value=null;
            foreach ($settings['services'] as $service) {
                if ($category['category_slug'] === $service['category_slug']) {
                    $tab_value[]= array("value"=>$service['service_title'],"label"=>$service['service_label'],"ekit_tab_active"=>$service['service_active'] );
                }
            }
            $tab[]= array('type'=>$category['type_element'],'symbole'=>$category['type_symbole'],  "name"=>$category['category_slug'].$category['name_plus'] ,"col"=>$category['category_col'], "col_mobile"=>$category['category_col_mobile'] ,"critere"=>$category['category_criteres'], "label"=>$category['category_title'], "value"=>$tab_value);
        }
        // todo a voir si possible ici

        foreach ($this->get_api() as $api) {
            $api_settings=$settings[$api.'fields'];
            if ($api_settings) {
                foreach ($api_settings as $field) {
                    $array_field= array(
                        'field'=> $field['choice_field'] ,
                        'color'=> $field['field_color'] ,
                        'col'=> $field['field_col']=='0'?" ":$field['field_col'],
                        $field['field_float']=> "auto",
                        'type'=> $field['field_type'],
                        'url'=> $field['field_url'],
                        'font-size'=> $field['font_size'],
                        'url_param'=> $field['field_url_param'],
                        'share'=> $field['share'],

                        'text'=> $field['field_text'],
                        'icon'=> $field['field_icon'],
                        'condition'=> $field['field_condition'],
                        // 'margin'=>$field['field__margin']['top'].$field['field__margin']["unit"].' '.$field['field__margin']['right'].$field['field__margin']["unit"].' '.$field['field__margin']['bottom'].$field['field__margin']["unit"].' '.$field['field__margin']['left'].$field['field__margin']["unit"],
                                                
                    );
                  
                    if ($field['field_row']) {
                        $cpt++;
                        $post[(string)$cpt][]= $array_field;
                    } else {
                        $post[(string)$cpt][]= $array_field;
                    }
                }
                $post['count']=$cpt;
            }
        }
        
           
        $array = array(
           "id"=>$settings['post'],
           "id_active"=>get_permalink(get_the_ID()), // se base l'url de la page pour checker le bon parametre
           'type'=>$tab,
           'post'=>$post,
           'ekit_resultat'=> $settings['ekit_resultat'],
           'cardbody'=> $settings['ekit_wb_225_code'],
           'card'=> $settings['ekit_wb_226_code'],
           'cardimage'=> $settings['ekit_wb_227_code'],
           'ekit_search_btn' =>  $settings['ekit_search_btn'],
           'search_text' =>  $settings['search_text'],
           'heading_text' =>  $settings['heading_text'],
           'url' =>  $settings['ekit_wb_226_url']["url"],
            "API_URI"=> $url,
            "URL_POST"=> $settings['ekit_wb_225_url']["url"],
            'color' =>  $settings['ekit_wb_1860_color'] ,
            'visible' => $settings['ekit_biens'],
            'visible_search_map' => $settings['ekit_maps'],
            'ekit_wb_3976_font' => $settings['ekit_wb_3976_font'],
            'ekit_menu_button_color_critere' => $settings['ekit_menu_button_color_critere'],
            'ekit_critere_btn' => $settings['ekit_critere_btn'],
            'ekit_menu_active' => $settings['ekit_menu_active'],
            'ekit_menu_button_color_alerte' => $settings['ekit_menu_button_color_alerte'],
            'ekit_alerte_btn' => $settings['ekit_alerte_btn'],
            'ekit_map_btn' => $settings['ekit_map_btn'],
            'col_heading_text' => $settings['col_heading_text'],
            'col_post' => $settings['col_post'],
            'ekit_dynamic_text' => $settings['ekit_dynamic_text'],
            'first_load' =>  $settings['first_load'],
            'paginator' =>  $settings['paginator'],

        );
        
        //enregistrement dans le fichier json
        $data = file_get_contents($file);
        $obj = json_decode($data);
            
        // recherche si il y un id parametre present
        $val=false;
        foreach ($obj as $key => $value) {
            //var_dump(  $key);
            if (isset($value->id) && $value->id==$settings['post']) {
                $val=true;
                $id=$key ;
            }
        }
        // si existe pas on créé un objet param sinon ou update les params
        if (!$val) {
            $obj[]=array("id"=>$settings['post']);// ajout clé
        } else {
            $obj[$id]=$array; // update
        }
        $newJsonString = json_encode($obj);
        file_put_contents($file, $newJsonString);
        $context['params']=base64_encode($newJsonString) ;
        $context['id']=$settings['post'];
                
        
        Timber::render('index.twig', $context);
    }

    public function render_plain_content($instance = [])
    {
    }
}