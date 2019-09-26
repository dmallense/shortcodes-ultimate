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
		var html = `<div class="su-coder-header wp-ui-highlight">
							<input type="text" value="" placeholder="${SUCoderL10n.searchShortcodes}" />
							<button class="su-coder-close-btn">${SUCoderL10n.close}</button>
						</div>`;

		self.el.app.insertAdjacentHTML('afterbegin', html);
	};

	self.addShortcodes = function() {
		var groups = [];
	};

	self.openPopup = function() {
		self.MFPOptions = self.MFPOptions || {};
	};

	self.insertClassic = function(target = '', shortcode = '') {};

	return {
		init: self.init,
		insertClassic: self.insertClassic
	};
})();

document.addEventListener('DOMContentLoaded', SUCoder.App.init);
