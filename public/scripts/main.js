'use strict';

// *HP notes code courtesy of Heydon Pickering's book, Inclusive Design Patterns, "A Menu Button" chapter
(function () {
	// Remove no-js class if JS is available
	var jsClass = document.querySelector('body');
	if (jsClass.hasAttribute('class')) {
		jsClass.removeAttribute('class');
	}
	// Only display menu button if under 750px
	if (document.documentElement.clientWidth < 750) {
		// get button and menu nodes *HP
		var button = document.querySelector('[aria-label="site"] button');
		var menu = button.nextElementSibling;
		// set initial (closed menu) states *HP
		button.setAttribute('aria-expanded', 'false');
		button.hidden = false;
		menu.hidden = true;
	}

	var toggleMenu = function toggleMenu() {
		// toggle menu visibility *HP
		var expanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', String(!expanded));
		/* There is a mistake in the book which sets menu.hidden to !expanded, the correction is here: https://www.smashingmagazine.com/errata-inclusive-design-patterns-book/ */
		menu.hidden = expanded;
	};
	button.addEventListener('click', toggleMenu);

	// Close menu with escape key
	var closeMenu = function closeMenu(event) {
		if (event.which === 27) {
			button.setAttribute('aria-expanded', 'false');
			menu.hidden = true;
		}
	};
	document.addEventListener('keydown', closeMenu);
})();