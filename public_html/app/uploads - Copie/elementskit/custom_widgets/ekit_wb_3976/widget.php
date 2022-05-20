<?php

namespace Elementor;

defined('ABSPATH') || exit;

class Ekit_Wb_3976 extends Widget_Base {

	public function get_name() {
		return 'ekit_wb_3976';
	}


	public function get_title() {
		return esc_html__( 'New Widget', 'elementskit-lite' );
	}


	public function get_categories() {
		return ['basic'];
	}


	public function get_icon() {
		return 'eicon-cog';
	}


	protected function register_controls() {

		$this->start_controls_section(
			'content_section_3976_0',
			array(
				'label' => esc_html__( 'Title', 'elementskit-lite' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'ekit_wb_3976_font',
			array(
				'label' => esc_html__( 'Font', 'elementskit-lite' ),
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
				'label' => esc_html__( 'Icons', 'elementskit-lite' ),
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

		$this->add_group_control(
			Group_Control_Border::get_type(),
			array(
				'name' => 'ekit_wb_3976_border',
				'fields_options' => [
					'border' => [
						'label' => esc_html('Border', 'elementskit-lite'),
						'show_label' => true,
						'label_block' => false,
					],
				],
			)
		);

		$this->end_controls_section();

	}


	protected function render() {
	}


}
