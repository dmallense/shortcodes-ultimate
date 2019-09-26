var SUCoder = SUCoder || {};

SUCoder.App = (() => {
	var self = {};

	self.el = {
		app: null,
		search: null,
		closeBtn: null,
		shortcodes: null,
		breadcrumbs: null,
		settings: null,
		preview: null
	};

	self.MFPOptions = null;

	self.init = function() {
		self.el.app = document.querySelectorAll('.su-coder-app')[0];

		if (!self.el.app) {
			return;
		}

		self.addHeader();
		self.addShortcodes();
	};

	self.addHeader = function() {
		var html = `
			<div class="su-coder-header wp-ui-highlight">
				<input type="text" value="" placeholder="${SUCoderL10n.searchShortcodes}" />
				<button class="su-coder-close-btn" aria-label="${SUCoderL10n.closeDialog}" title="${SUCoderL10n.closeDialog}">
					<svg viewBox="0 0 32 32" width="30" height="30" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="5" aria-hidden="true"><path d="M2 30 L30 2 M30 30 L2 2" /></svg>
				</button>
			</div>
		`;

		self.el.app.insertAdjacentHTML('afterbegin', html);
	};

	self.addShortcodes = function() {
		var groups = [];
	};

	self.openPopup = function() {
		self.MFPOptions = {
			type: 'inline',
			alignTop: true,
			closeOnBgClick: false,
			mainClass: 'su-coder-mfp',
			items: {
				src: '.su-coder-app'
			},
			callbacks: {}
		};

		jQuery.magnificPopup.open(self.MFPOptions);
	};

	self.insertClassic = function(target = '', shortcode = '') {
		self.openPopup();
	};

	return {
		init: self.init,
		insertClassic: self.insertClassic
	};
})();

document.addEventListener('DOMContentLoaded', SUCoder.App.init);
