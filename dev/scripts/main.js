// *HP notes code courtesy of Heydon Pickering's book, Inclusive Design Patterns, "A Menu Button" chapter
(function(){
	// Remove no-js class if JS is available
	const jsClass = document.querySelector('body');
	if (jsClass.hasAttribute('class')) {
		jsClass.setAttribute('class', '');
	}
	// Add fixed class to allow menu scoll
	const addFixed = function(){
		jsClass.setAttribute('class', 'fixed');
	}
	// Removed fixed class when menu closed or contact menu item selected
	const removeFixed = function(){
		jsClass.setAttribute('class', '');
	}

	// get button and menu nodes *HP
	const button = document.querySelector('[aria-label="site"] button');
	const menu = button.nextElementSibling;
	// get text of menu button
	const text = document.getElementById('button__text');

	// Add tab trap for open menu 
	const trapTabFocus = function(evt) {
		// Menu button is always first
		const first = document.querySelector('[aria-label="site"] button');
		// Grab list of menu items to determine which is last
		const listArray = document.querySelectorAll('.main-nav a');
		const lastIndex = listArray.length - 1;
		const last = listArray.item(lastIndex);
		// check for tab key press
		if (evt.keyCode === 9 ) {
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
	}
	
	// Only display menu button if under 750px
	if (document.documentElement.clientWidth < 750) {
		// set initial (closed menu) states *HP
		button.setAttribute('aria-expanded', 'false');
		button.hidden = false;
		menu.hidden = true;
		// Use height of nav to set margin-top of main section
		// Tab trap menu when it is open (listen on nav element)
		const nav = document.querySelector('nav[role="navigation"]')
		nav.addEventListener('keydown', trapTabFocus);
	}

	var toggleMenu = function(){
		// toggle menu visibility *HP
		const expanded = button.getAttribute('aria-expanded') === 'true';
		button.setAttribute('aria-expanded', String(!expanded));
		/* There is a mistake in the book which sets menu.hidden to !expanded, the correction is here: https://www.smashingmagazine.com/errata-inclusive-design-patterns-book/ */
		menu.hidden = expanded;
		if ( menu.hidden === true ) {
			text.textContent = 'Menu';
			removeFixed();
		} else {
			text.textContent = 'Close';
			addFixed();
		}
	}
	button.addEventListener('click', toggleMenu);

	// Close menu
	const closeMenu = function(event){
		button.setAttribute('aria-expanded', 'false');
		menu.hidden = true;
		text.textContent = 'Menu';
		jsClass.setAttribute('class', '');
	}
	// Check if ESC key is used
	const checkKey = function(evt) {
		if (evt.keyCode === 27) {
			closeMenu();
		}
	}
	document.addEventListener('keydown', checkKey);

	// remove fixed class if Contact menu item is selected
	const contactLink = document.querySelector('a[href="#contact"');
	const contactSection = document.getElementById('contact');
	console.log(contactSection);
	const checkSelection = function(evt){
		if( evt.keyCode === 13 || evt.type === 'click') {
			closeMenu();
			removeFixed();
			contactSection.focus();
		}
	}
	contactLink.addEventListener('keydown', checkSelection);
	contactLink.addEventListener('click', checkSelection);
})();
