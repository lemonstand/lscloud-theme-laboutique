$( document ).ready(function() {
    
    //
    // Handle the shipping option radio button clicks
    //
    $('#checkout-page').on('change', '#shipping-methods input', function(){
    // When the shipping method is shipping we want to update the 
    // order totals area on the Checkout page. The native Checkout 
    // action does all the calculations.
    //
    $(this).sendRequest('shop:onCheckoutShippingMethod', {
    update: {'#checkout-totals': 'shop-checkout-totals', '#mini-cart':'shop-minicart'}
        })
    });

    //
    // Handle add to cart modal
    //
    $(document).on('click','#add_to_cart', function(){
    // When the shipping method is shipping we want to update the 
    // order totals area on the Checkout page. The native Checkout 
    // action does all the calculations.
    //
    $(this).sendRequest('shop:onAddToCart', {
    update: {'#mini-cart': 'shop-minicart', '#product-page': 'shop-product'},
		onAfterUpdate: function() {
			 $('#added').modal('show');
			 sharezoom();
			 }
        });
   });


    //Handle selecting product option
    $(document).on('change', 'select.product-option', function () {
      $(this).sendRequest('shop:product', {
          update: {'#product-page': 'shop-product'},
          onAfterUpdate: function() {
			 sharezoom();
			 }
       });
     });


    
    //
    // Handle reload of sharrre and elevate zoom javascscript when loading product variants
    //
    function sharezoom() {
        
        $('#sharrre .twitter').sharrre({
    		template: '<button class="btn btn-mini btn-twitter"><i class="icon-twitter"></i> &nbsp; {total}</button>',
    		share: {
    			twitter: true
    		},
    		enableHover: false,
    		enableTracking: true,
    		click: function(api, options) {
    			api.simulateClick();
    			api.openPopup('twitter');
    		}
    	});
    	
    	$('#sharrre .facebook').sharrre({
    		template: '<button class="btn btn-mini btn-facebook"><i class="icon-facebook"></i> &nbsp; {total}</button>',
    		share: {
    			facebook: true
    		},
    		enableHover: false,
    		enableTracking: true,
    		click: function(api, options) {
    			api.simulateClick();
    			api.openPopup('facebook');
    		}
    	});
    	
    	
    	$('#sharrre .pinterest').sharrre({
    		template: '<button class="btn btn-mini btn-pinterest"><i class="icon-pinterest"></i> &nbsp; {total}</button>',
    		share: {
    			pinterest: true
    		},
    		enableHover: false,
    		enableTracking: true,
    		click: function(api, options) {
    			api.simulateClick();
    			api.openPopup('pinterest');
    		},
    
    	});
    	
    	
    	$('.zoomContainer').remove();

		if (typeof(zoomConfig)!='undefined'){
			$('.product-images .primary img').elevateZoom(zoomConfig);	
		}
		
    	
    	
    	$('.product-images .primary img').elevateZoom({
    		zoomType: "inner",
    		cursor: "crosshair",
    		easing: true,
    		zoomWindowFadeIn: 300,
    		zoomWindowFadeOut: 300,
    		gallery: 'gallery',
    		galleryActiveClass: 'active'
    	});
    	
    	

        }


    //
    // Handle the payment method clicks
    //
    $(document).on('change', '#payment_method', function() {
          $(this).sendRequest('shop:onUpdatePaymentMethod', {
              update: {'#payment_form' : 'shop-paymentform'}
          });
    });

});
   
   
   

