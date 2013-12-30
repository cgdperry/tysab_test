// JavaScript Document
//first_click(1000);
(function ($) { /* closure and portability */
    $(document).ready(function(){
		
		
		
		
		if (cur_state==0 && cur_id=="pml") {
			
			first_click(1000);
		}
		
		
		
		$('#sun_dropdown_container #reload').on("click", function() {
			
			
            if (cur_id=="pml") {
                
                first_click(1000);
            }
        });
        
	});
})(jQuery);