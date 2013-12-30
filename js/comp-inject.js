// JavaScript Document
//first_click(1000);

	
	
(function ($) { /* closure and portability */
    $(document).ready(function(){
		
		
		var slideDirection = 'forward';
		
		$("#container .contents, .progress-controller #left-control").click(function(){
			
			if(cur_state == 1){
			
				if (slideDirection == 'forward') {
				
					$('#cards-turning').removeClass('forward');
					$('#cards-turning').addClass('backward');
					slideDirection = 'back';
				
				}
				
				
			}
		});
        
	});
})(jQuery);