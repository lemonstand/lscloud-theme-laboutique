(function ($) {
	'use strict';

	function tfingi_megamenu_init(){

		$('.megamenu-parent').each(function(index, el) {
			var megamenu_parent = $(this);
			var megamenu = $(megamenu_parent).children('.sub-menu');
			var megamenu_columns_count = megamenu.children('.megamenu-column').length;

			// Get predefined in menu width for megamenu using data-width attribute
			var megamenu_width = megamenu_parent.attr('data-width');
			var megamenu_left = '';
			var megamenu_parent_itemwidth = 0;

			// change .sub-menu to .megamenu-submenu to get rid of standard styling
			$(megamenu).addClass('megamenu-sub-menu');
			$(megamenu).find('.sub-menu').each(function(){
				// change .sub-menu to .megamenu-inner-sub-menu
				$(this).attr('class', '').addClass('megamenu-inner-sub-menu');
			});

			// add some css helper classes
			$(megamenu).find('.megamenu-column').each(function(){
				$(this).find('.megamenu-inner-sub-menu .megamenu-heading').eq(0).addClass('first-submenu-header');
			});



			if ( megamenu_width === '' ) {
				megamenu_width = 260*megamenu_columns_count; // Set default dropdown width value
			}

			if ( megamenu_width === 'full' ) {
				// megamenu_width = '100%'; // Set full width dropdown

				megamenu_left = '0';
				// Set megamenu dropdown width
				megamenu.css({
					width: '100%',
					'margin-left': megamenu_left
				});

			} else {
				$(this).css('position','relative');
				megamenu_parent_itemwidth = $(megamenu_parent).outerWidth();
				megamenu_left = parseInt(megamenu_width,10)/2*(-1) + megamenu_parent_itemwidth/2;


				$(megamenu).css({
					width: megamenu_width + 'px',
					'margin-left': megamenu_left + 'px'
				});
			}

			megamenu_parent.addClass('megamenu-columns-'+megamenu_columns_count);

			// make sure mega menu dropdown doesn't go out of screen
			var window_width = jQuery(window).width();
			var megamenu_parent_offset = $(megamenu_parent).offset();

			if (megamenu_width != 'full') {

				// if screen size is smaller than megamenu panel
				if ( ( window_width < megamenu_width )) {
					// make mega menu full width
					$(this).addClass('mm-width-full');
					megamenu_left = '0';
					megamenu.css({
						width: '100%',
						position:'static',
						'margin-left': megamenu_left
					});
				} else if (  0 > ( megamenu_parent_offset.left - megamenu_width) ){
					megamenu.css({									
						'margin-left': 0
					});

				} else if ( window_width < ( megamenu_parent_offset.left + ( megamenu_parent_itemwidth / 2 ) + megamenu_width / 2 ) ) {
					// if megamenu comes out of the screen on the right
					$(megamenu_parent).addClass('dropdown-align-right');
					megamenu.css({
						'margin-left': '0',
						'right': '0',
						'left': 'auto'
					});
				}
			}
		});
	}

	tfingi_megamenu_init();

	$(window).resize(tfingi_megamenu_init);


})(jQuery);