<?php

namespace Elementor;

defined('ABSPATH') || exit;

class Ekit_Wb_225 extends Widget_Base {

	public function get_name() {
		return 'ekit_wb_225';
	}


	public function get_title() {
		return esc_html__( 'New Widget', 'elementskit-lite' );
	}


	public function get_categories() {
		return ['basic'];
	}


	public function get_icon() {
		return 'fas fa-american-sign-language-interpreting';
	}


	protected function register_controls() {

		$this->start_controls_section(
			'content_section_225_0',
			array(
				'label' => esc_html__( 'Title', 'elementskit-lite' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'ekit_wb_225_url',
			array(
				'label' => esc_html__( 'URL', 'elementskit-lite' ),
				'type'  => Controls_Manager::URL,
				'placeholder' =>  esc_html( 'Paste URL or type' ),
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
			'ekit_wb_225_number',
			array(
				'label' => esc_html__( 'Number', 'elementskit-lite' ),
				'type'  => Controls_Manager::NUMBER,
				'default' =>  esc_html( '10' ),
				'show_label' => true,
				'label_block' => false,
			)
		);

		$this->add_control(
			'ekit_wb_225_text',
			array(
				'label' => esc_html__( 'Text', 'elementskit-lite' ),
				'type'  => Controls_Manager::TEXT,
				'default' =>  esc_html( 'Some Text' ),
				'show_label' => true,
				'label_block' => false,
				'input_type' => 'text',
			)
		);

		$this->add_control(
			'ekit_wb_225_code',
			array(
				'label' => esc_html__( 'Code', 'elementskit-lite' ),
				'type'  => Controls_Manager::CODE,
				'show_label' => true,
				'label_block' => true,
				'language' => 'html',
			)
		);

		$this->add_control(
			'ekit_wb_225_textarea',
			array(
				'label' => esc_html__( 'Textarea', 'elementskit-lite' ),
				'type'  => Controls_Manager::TEXTAREA,
				'default' =>  esc_html( 'Textarea Contents...' ),
				'show_label' => true,
				'label_block' => true,
				'rows' => 5,
			)
		);

		$this->end_controls_section();

	}


	protected function render() {
	}


}
