<?php

namespace Elementor;

defined('ABSPATH') || exit;

class Ekit_Wb_59819 extends Widget_Base {

	public function __construct($data = [], $args = null) {
		parent::__construct($data, $args);

		wp_register_style( 'ekit-wb-59819-style-handle', 'http://localhost:8000/app/uploads/elementskit/custom_widgets/ekit_wb_59819/style.css');
	}


	public function get_style_depends() {
		return [ 'ekit-wb-59819-style-handle' ];
	}

	public function get_name() {
		return 'ekit_wb_59819';
	}


	public function get_title() {
		return esc_html__( 'Mon bouton custom', 'elementskit-lite' );
	}


	public function get_categories() {
		return ['basic'];
	}


	public function get_icon() {
		return 'fas fa-hand-peace';
	}


	protected function register_controls() {

		$this->start_controls_section(
			'content_section_59819_0',
			array(
				'label' => esc_html__( 'Title', 'elementskit-lite' ),
				'tab'   => Controls_Manager::TAB_CONTENT,
			)
		);

		$this->add_control(
			'ekit_wb_59819_text',
			array(
				'label' => esc_html__( 'Text', 'elementskit-lite' ),
				'type'  => Controls_Manager::TEXT,
				'default' =>  esc_html( 'Some Text' ),
				'show_label' => true,
				'label_block' => false,
				'input_type' => 'text',
			)
		);

		$this->end_controls_section();

	}


	protected function render() {
		$settings = $this->get_settings_for_display();

		?>
<section class="portfolio-experiment">
  <a>
    <span class="text"><?php echo isset($settings["ekit_wb_59819_text"]) ? $settings["ekit_wb_59819_text"] : ""; ?></span>
    <span class="line -right"></span>
    <span class="line -top"></span>
    <span class="line -left"></span>
    <span class="line -bottom"></span>
  </a>
</section>
		<?php
	}


}
