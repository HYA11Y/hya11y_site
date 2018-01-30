// *HP notes code courtesy of Heydon Pickering's book, Inclusive Design Patterns, "A Menu Button" chapter
(function(){
	// Remove no-js class if JS is available and add fixed class to position menu differently
	var jsClass = document.querySelector('body');
	if (jsClass.hasAttribute('class')) {
		jsClass.setAttribute('class', 'fixed');
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
		// Use height of nav to set margin-top of main section
		// Tab trap menu when it is open
	}

	var toggleMenu = function(){
		// toggle menu visibility *HP
		var expanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', String(!expanded));
		/* There is a mistake in the book which sets menu.hidden to !expanded, the correction is here: https://www.smashingmagazine.com/errata-inclusive-design-patterns-book/ */
		menu.hidden = expanded;
	}
	button.addEventListener('click', toggleMenu);

	// Close menu with escape key
	var closeMenu = function(event){
		if (event.which === 27) {
			button.setAttribute('aria-expanded', 'false');
			menu.hidden = true;
		}
	}
	document.addEventListener('keydown', closeMenu)
})();
