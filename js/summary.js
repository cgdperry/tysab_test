
// Added to allow an initial click to be forced
function first_click(time) {
	window.setTimeout('$("#container #"+cur_id+" .content_body").trigger("click");',time);
}

(function ($) { /* closure and portability */
    $(document).ready(function(){
		
		// Force the first click
		//first_click(300);

    });
})(jQuery);