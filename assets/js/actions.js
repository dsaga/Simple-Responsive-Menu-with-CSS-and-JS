

/**
 * Regroup all menu items based on width of container
 * @param  boolean initial initial trigger
 */
function navbarResponsive(initial) {
	
		var $main_wrap = $("#menu-main-navigation");
	
		// * cache menu item object
		var $last_item = $main_wrap.children().last();
		
		// * METHOD caculate all items width 
		var _calculate_all_width = function () {
			var li_sum_width = 0;

			$main_wrap.children().each(function () {
						li_sum_width+= $(this).width();
			});
			return li_sum_width;
		};
		
		var _get_all_before_lock = function () {
			return  $main_wrap.children().filter(function (index,elem) {
							return !$(elem).hasClass('menu-item-more');
				});
		};
		
		// * METHOD check if more exists 
		var _get_more_part = function () {
			
			return $main_wrap.find('.menu-item-more');
		};
		
		// * METHOD create new more item
		var _new_more_part = function () {
				return '<li  class="menu-item-more nav-item menu-item menu-item-has-children dropdown"><a class="nav-link" title="More" href="#" data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true">More</a><ul class="dropdown-menu custom-navbar-submenu " id="ul-more-menu"></ul></li>';
		};
				
			
		// * num items currently
		var count = $main_wrap.children().length;
		// * initial width menu
		var initial_width_menu = $main_wrap.width();
		var initial_width_menu_items = _calculate_all_width();

		// * check if more item exists 
		
		
		// * if more items than can fit 
		if(initial_width_menu_items > initial_width_menu) {
			
			// * not exists create 
			if(_get_more_part().length === 0) {
				
				// * insert before  
				$last_item.after(_new_more_part());
				
			}
			
			// * get items before more
			var keep = [];
			var move = [];  
			current_width = 0;
			_get_all_before_lock().each(function () {
					current_width += $(this).width();
					if((_get_more_part().width() + current_width) > initial_width_menu)  {
							move.push($(this));
					}
					else {
						keep.push($(this));
					}
			});
				
			// * add to more
			var $prepare = $('<ul/>');
			$.each(move,function () {
					$prepare.append($(this));
			});
			// * set
			$('#ul-more-menu').html($prepare.children());

		}
		
		// * when navigation menu has been updated | animate the menu to visible
		 if(initial === true) {
			 $main_wrap.animate({
					opacity: 1,
				}, 250);  
				
		 }  
}

jQuery(document).ready(function () {
	
	// * initial set up menu
	navbarResponsive(true);
	
	// * each time the browser window is resized trigger recalculate
	$(window).resize(function() {
		navbarResponsive();
	});

		
});