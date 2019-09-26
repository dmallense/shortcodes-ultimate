<?php

class Shortcodes_Ultimate_Coder {

	public $plugin_prefix;

	public function __construct( $plugin_prefix ) {

		$this->plugin_prefix = $plugin_prefix;

		// TODO: change `su_option_generator_access` to `su_option_coder_access`
		// must be added on plugin activation and replaced during plugin update
		$this->capability = get_option(
			'su_option_generator_access',
			'manage_options'
		);

	}

	public function enqueue_scripts() {

		if ( ! did_action( 'su/coder/enqueue' ) && ! is_admin() ) {
			return;
		}

		// TODO: register and enqueue MFP script/styles (1) [!] @js

		wp_enqueue_style(
			'shortcodes-ultimate-coder',
			plugins_url( 'css/coder.css', __FILE__ ),
			array( 'magnific-popup', 'su-icons' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'css/coder.css' ),
			'all'
		);

		wp_enqueue_script(
			'shortcodes-ultimate-coder',
			plugins_url( 'js/coder/index.js', __FILE__ ),
			array( 'jquery', 'magnific-popup' ),
			filemtime( plugin_dir_path( __FILE__ ) . 'js/coder/index.js' ),
			true
		);

		wp_localize_script(
			'shortcodes-ultimate-coder',
			'SUCoderL10n',
			array(
				'closeDialog'      => __( 'Close dialog', 'shortcodes-ultimate' ),
				'searchShortcodes' => __( 'Search shortcodes', 'shortcodes-ultimate' ),
				'chooseFile'       => __( 'Choose file', 'shortcodes-ultimate' ),
				'insert'           => __( 'Insert', 'shortcodes-ultimate' ),
				'selectImages'     => __( 'Select images', 'shortcodes-ultimate' ),
				'addSelected'      => __( 'Add selected images', 'shortcodes-ultimate' ),
				'newPresetName'    => __( 'Please enter a name for new preset', 'shortcodes-ultimate' ),
				'newPreset'        => __( 'New preset', 'shortcodes-ultimate' ),
				'lastUsed'         => __( 'Last used settings', 'shortcodes-ultimate' ),
			)
		);

	}

	public function display_app() {

		if ( ! did_action( 'su/coder/enqueue' ) && ! is_admin() ) {
			return;
		}

		echo $this->get_template( 'app' );

	}

	public function classic_editor_button( $args = array() ) {

		$defaults = array(
			'editor'    => '',
			'label'     => '',
			'title'     => '',
			'icon'      => false,
			'class'     => '',
			'shortcode' => '',
		);

		$args = wp_parse_args( $args, $defaults );

		do_action( 'su/coder/button' );
		do_action( 'su/coder/button/classic_editor', $args );

		return $this->get_template( 'classic-editor-button', $args );

	}

	public function add_classic_editor_button( $editor ) {

		if ( ! current_user_can( $this->capability ) ) {
			return;
		}

		echo $this->classic_editor_button(
			array(
				'editor' => $editor,
				'label'  => __( 'Add Shortcode', 'shortcodes-ultimate' ),
				'title'  => __( 'Add a shortcode to the editor', 'shortcodes-ultimate' ),
				'icon'   => true,
				'class'  => 'button',
			)
		);

	}

	public function add_block_editor_button() {

		if ( ! current_user_can( $this->capability ) ) {
			return;
		}

		wp_enqueue_script(
			'shortcodes-ultimate-coder-block-editor',
			plugins_url( 'js/coder/block-editor.js', __FILE__ ),
			array(
				'wp-element',
				'wp-editor',
				'wp-components',
				'shortcodes-ultimate-coder',
			),
			filemtime( plugin_dir_path( __FILE__ ) . 'js/coder/block-editor.js' ),
			true
		);

		wp_localize_script(
			'shortcodes-ultimate-coder-block-editor',
			'SUBlockEditorL10n',
			array(
				'insertShortcode' => __( 'Insert shortcode', 'shortcodes-ultimate' ),
			)
		);

		wp_localize_script(
			'shortcodes-ultimate-coder-block-editor',
			'SUBlockEditorSettings',
			array(
				'supportedBlocks' => get_option( 'su_option_supported_blocks', array() ),
			)
		);

		do_action( 'su/coder/button' );
		do_action( 'su/coder/button/block_editor' );

	}

	public function get_template( $name = '', $data = array() ) {

		$name_pattern = '/^(?!-)[a-z0-9-_]+(?<!-)(\/(?!-)[a-z0-9-_]+(?<!-))*$/';

		if ( 1 !== preg_match( $name_pattern, $name ) ) {
			return '';
		}

		$file = plugin_dir_path( __FILE__ ) . 'partials/coder/' . $name . '.php';

		if ( ! file_exists( $file ) ) {
			return '';
		}

		ob_start();
		include $file;
		return ob_get_clean();

	}

}
