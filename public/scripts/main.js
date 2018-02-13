'use strict';

// *HP notes code courtesy of Heydon Pickering's book, Inclusive Design Patterns, "A Menu Button" chapter
(function () {
	// Remove no-js class if JS is available
	var jsClass = document.querySelector('body');
	if (jsClass.hasAttribute('class')) {
		jsClass.setAttribute('class', '');
	}
	// Add fixed class to allow menu scoll
	var addFixed = function addFixed() {
		jsClass.setAttribute('class', 'fixed');
	};
	// Removed fixed class when menu closed or contact menu item selected
	var removeFixed = function removeFixed() {
		jsClass.setAttribute('class', '');
	};

	// get button and menu nodes *HP
	var button = document.querySelector('[aria-label="site"] button');
	var menu = button.nextElementSibling;
	// get text of menu button
	var text = document.getElementById('button__text');

	// Add tab trap for open menu 
	var trapTabFocus = function trapTabFocus(evt) {
		// Menu button is always first
		var first = document.querySelector('[aria-label="site"] button');
		// Grab list of menu items to determine which is last
		var listArray = document.querySelectorAll('.main-nav a');
		var lastIndex = listArray.length - 1;
		var last = listArray.item(lastIndex);
		// check for tab key press
		if (evt.keyCode === 9) {
			// check if shift was also pressed
			if (evt.shiftKey) {
				if (document.activeElement === first) {
					// if at first tap stop, loop back to last tab stop
					evt.preventDefault();
					last.focus();
				}
			} else {
				if (document.activeElement === last) {
					// if at last tab stop, loop back to first tab stop
					evt.preventDefault();
					first.focus();
				}
			}
		}
	};

	// Only display menu button if under 750px
	if (document.documentElement.clientWidth < 750) {
		// set initial (closed menu) states *HP
		button.setAttribute('aria-expanded', 'false');
		button.hidden = false;
		menu.hidden = true;
		// Use height of nav to set margin-top of main section
		// Tab trap menu when it is open (listen on nav element)
		var nav = document.querySelector('nav[role="navigation"]');
		nav.addEventListener('keydown', trapTabFocus);
	}

	var toggleMenu = function toggleMenu() {
		// toggle menu visibility *HP
		var expanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', String(!expanded));
		/* There is a mistake in the book which sets menu.hidden to !expanded, the correction is here: https://www.smashingmagazine.com/errata-inclusive-design-patterns-book/ */
		menu.hidden = expanded;
		if (menu.hidden === true) {
			text.textContent = 'Menu';
			removeFixed();
		} else {
			text.textContent = 'Close';
			addFixed();
		}
	};
	button.addEventListener('click', toggleMenu);

	// Close menu
	var closeMenu = function closeMenu(event) {
		button.setAttribute('aria-expanded', 'false');
		menu.hidden = true;
		text.textContent = 'Menu';
		jsClass.setAttribute('class', '');
	};
	// Check if ESC key is used
	var checkKey = function checkKey(evt) {
		if (evt.keyCode === 27) {
			closeMenu();
		}
	};
	document.addEventListener('keydown', checkKey);

	// remove fixed class if Contact menu item is selected
	var contactLink = document.querySelector('a[href="#contact"');
	var contactSection = document.getElementById('contact');
	console.log(contactSection);
	var checkSelection = function checkSelection(evt) {
		if (evt.keyCode === 13 || evt.type === 'click') {
			closeMenu();
			removeFixed();
			contactSection.focus();
		}
	};
	contactLink.addEventListener('keydown', checkSelection);
	contactLink.addEventListener('click', checkSelection);
})();