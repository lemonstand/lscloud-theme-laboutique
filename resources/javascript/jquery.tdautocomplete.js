(function($, window, document) {
	'use strict';
	
	var pluginName = 'tdautocomplete',
	
	
	defaults = {
		search_length: 3,
		no_items: 3,
		container: '#autocomplete-results',
		partial: 'tdboutique:autocomplete'
	};
	
	
	function Plugin( element, options ) {
		this.element = element;
		this.options = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		
		this.init();
	}
	
	Plugin.prototype = {
		
		init: function()
		{
		 	var self = this;
		 	
		 	$(self.element).on({
			 	keydown: function(event)
			 	{
				 	if( self.results_open ) {
						self.keyboard_navigation(self.element, self.options, event);			 		
					}
			 	},
			 	
			 	keyup: function(event)
			 	{
				 	self.autocomplete(self.element, self.options, event);
			 	},
			 	
			 	focus: function(event)
			 	{
				 	self.autocomplete(self.element, self.options, event);
			 	},
			 	
			 	blur: function(event)
			 	{
			 		// This is a crap fix - come back and fix this when you have more time
			 		setTimeout(function() {
				 		self.close_results(self.options.container);
			 		}, 200);
			 	}
		 	});
		},
		
		results_open: false,
		
		autocomplete: function(element, options, event)
		{
			var self = this;
			
			if( this.validate(element, event.keyCode, options.container) ) {
				var obj = {
					selectorMode: true,
					extraFields: {
						query: element.value,
						no_items: options.no_items
					},
					update: {},
					onSuccess: function() {
						self.open_results(options.container);
					}
				};
				obj.update[options.container] = options.partial;
				
				$(element).getForm().sendRequest('tdboutique:on_autocomplete', obj);	
			}
		},
		
		validate: function(element, keycode, container)
		{			
			// Check if input is >= 3
			if(element.value.length < 3) {
				this.close_results(container);
				return false;
			}
	
			// Escape
			if(keycode == 27) {
				this.close_results(container);
				return false;
			}

			// A-Z 0-9
			if(keycode >= 48 && keycode <= 90) {
				return true;
			}
			
			// Backspace
			if(keycode == 8) {
				return true
			}
			
			
			// Something else happend, mouse click maybe?
			if(keycode == undefined) {
				this.open_results(container);
			}
			
			return false;
		},
		
		keyboard_navigation: function(element, options, event)
		{
			var results = $(options.container).find('ul');			
			var keycode = event.keyCode;
			
			// Down arrow
			if(keycode == 40)
			{
				if( results.find('li.active').length == 0 ) {
					results.find('li:first-child').addClass('active');
				}
				else {
					results.find('li.active').removeClass('active').next('li').addClass('active');
				}
			}
				
			// Up arrow
			if(keycode == 38)
			{
				if( results.find('li.active').length == 0 ) {
					results.find('li:last-child').addClass('active');
				}
				else {
					results.find('li.active').removeClass('active').prev('li').addClass('active');
				}
			}
				
			// Enter
			if(keycode == 13)
			{
				if( results.find('li.active').length > 0 ) {
					event.preventDefault();
					var url = results.find('li.active').find('a').attr('href');
					window.location.href = url;
				}
			}
			
		},
		
		open_results: function(container)
		{
			this.results_open = true;
			$(container).fadeIn(200);
		},
		
		close_results: function(container)
		{	
			this.results_open = false;
			$(container).hide();
		}
	}
	
	
	 $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };
    
	
})(jQuery, window, document);