// Expanding/Collapsing mobile menu code (including comments) courtesy of Heydon Pickering's book Inclusive Design Patterns, "A Menu Button" chapter
(function(){
	// get button and menu nodes
	var button = document.querySelector('[aria-label="site"] button');
	var menu = button.nextElementSibling;
	// set initial (closed menu) states
	button.setAttribute('aria-expanded', 'false');
	button.hidden = false;
	menu.hidden = true;

	button.addEventListener('click', function(){
		// toggle menu visibility
		var expanded = this.getAttribute('aria-expanded') === 'true';
		this.setAttribute('aria-expanded', String(!expanded));
		/* There is a mistake in the book which sets menu.hidden to !expanded, the correction is here: https://www.smashingmagazine.com/errata-inclusive-design-patterns-book/ */
		menu.hidden = expanded;
	});
})();
