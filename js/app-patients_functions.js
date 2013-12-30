(function ($) { /* closure and portability */
    $(document).ready(function(){

		// Don't make it go to next on clicking the switchpanel area
		$("#action_container #frame_02_switch #switchpanel").click(function(){
			event.stopPropagation();
		});
		
		// Don't make it go to next on clicking the switchpanel area
		$(".expand_info").click(function(){
			event.stopPropagation();
		});

		// Handle the clicking of the individual buttons, like radio buttons, only one active.
		$("#action_container #frame_02_switch #switchpanel .button").click(function(){
			
			event.stopPropagation(); // Prevent the top click event from firing...
			
			// clear out active buttons
			$("#action_container #frame_02_switch #switchpanel .button").removeClass("open");
			
			// set the clicked one.
			$(this).addClass("open");
			
			// first clear the open panels
			$("#action_container #frame_02_switch #switchpanel .panel").removeClass("open");
			
			// Pick the panel based on the button that was pressed...
			switch ($(this).attr("id")) {
				case "button_disability" : 
					$("#action_container #frame_02_switch #switchpanel #panel_disability").addClass("open");
				break;
				case "button_relapse" : 
					$("#action_container #frame_02_switch #switchpanel #panel_relapse").addClass("open");
				break;
				case "button_mri" : 
					$("#action_container #frame_02_switch #switchpanel #panel_mri").addClass("open");
				break;
			}
			
		});
		
		/* app-patients forward */
		$("#app-patients").click(function(){
			
			// stops clicks from doing anything if we've hit the end. Don't repeat.
			if(last_state < total_states) {
			
				if(cur_state == 1){
					
					// fade out current
					$("#frame_00").animate({
						opacity:0
						}, 500, 'easeInOutCubic', function() {
							
							// switch displays
							$("#frame_00").css({ display:"none"});
							$("#frame_01_start").css({ display:"block"});
							
							// fade in new...
							$("#frame_01_start").animate({
								opacity:1
							}, 500, 'easeInOutCubic');
							
					});
						
						
					// Update the title
					$("h1.title").animate({
						opacity:0
						},500, 'easeInOutCubic', function() {
							
							$("h1.title").html("PROACTIVELY IDENTIFY PATIENTS WHO MAY<br/>BENEFIT FROM THE PROVEN EFFICACY OF TYSABRI");
							$("h1.title").animate({
								opacity:1
								},500, 'easeInOutCubic');
					});
				
				}
				else if(cur_state == 2){
					
					// fade out current
					$("#frame_01_start").animate({
						opacity:0
						}, 500, 'easeInOutCubic', function() {
							
							// switch displays
							$("#frame_01_start").css({ display:"none"});
							$("#frame_02_switch").css({ display:"block"});
							
							// fade in new...
							$("#frame_02_switch").animate({
								opacity:1
							}, 500, 'easeInOutCubic');
							
						});
				
				}
				else if(cur_state == 3){
					
					// fade out current
					$("#frame_02_switch").animate({
						opacity:0
						}, 500, 'easeInOutCubic', function() {
							
							// switch displays
							$("#frame_02_switch").css({ display:"none"});
							$("#frame_03_stay").css({ display:"block"});
							
							// fade in new...
							$("#frame_03_stay").animate({
								opacity:1
							}, 500, 'easeInOutCubic');
							
					});
					
					// Update the title
					$("h1.title").animate({
						opacity:0
						},500, 'easeInOutCubic', function() {
							
							$("h1.title").html("MAINTAIN PATIENTS WHO MAY BENEFIT<br />FROM THE PROVEN EFFICACY OF TYSABRI");
							$("h1.title").animate({
								opacity:1
								},500, 'easeInOutCubic');
					});
					
				}
				
			} // last state vs total states
			
		});
		
		/* app-patients back */
		/* seeing if this supplants the original left function... */

		$(".progress-controller #left-control").click(function(){
		
			event.stopPropagation(); // Prevent the top click event from firing...

			if (cur_id == "app-patients") // just to keep with style...
			{
				if(cur_state == 0){

					// fade out current
					$("#frame_01_start").animate({
						opacity:0
						}, 500, 'easeInOutCubic', function() {
							
							// switch displays
							$("#frame_01_start").css({ display:"none"});
							$("#frame_00").css({ display:"block"});
							
							// fade in new...
							$("#frame_00").animate({
								opacity:1
							}, 500, 'easeInOutCubic');
							
						});

					// Update the title
					$("h1.title").animate({
						opacity:0
						},500, 'easeInOutCubic', function() {
							
							$("h1.title").html("CONSIDER THE PROVEN EFFICACY OF <br />TYSABRI AT EVERY STAGE");
							$("h1.title").animate({
								opacity:1
								},500, 'easeInOutCubic');
					});

				}
				else if(cur_state == 1){
					
					// fade out current
					$("#frame_02_switch").animate({
						opacity:0
						}, 500, 'easeInOutCubic', function() {
							
							// switch displays
							$("#frame_02_switch").css({ display:"none"});
							$("#frame_01_start").css({ display:"block"});
							
							// fade in new...
							$("#frame_01_start").animate({
								opacity:1
							}, 500, 'easeInOutCubic');
							
						});
						
				}
				else if(cur_state == 2){


					// fade out current
					$("#frame_03_stay").animate({
						opacity:0
						}, 500, 'easeInOutCubic', function() {
							
							// switch displays
							$("#frame_03_stay").css({ display:"none"});
							$("#frame_02_switch").css({ display:"block"});
							
							// fade in new...
							$("#frame_02_switch").animate({
								opacity:1
							}, 500, 'easeInOutCubic');
							
					});
					
					// Update the title
					$("h1.title").animate({
						opacity:0
						},500, 'easeInOutCubic', function() {
							
							$("h1.title").html("PROACTIVELY IDENTIFY PATIENTS WHO MAY<br/>BENEFIT FROM THE PROVEN EFFICACY OF TYSABRI");
							$("h1.title").animate({
								opacity:1
								},500, 'easeInOutCubic');
					});

				}
				
			}
		});
		
    });
})(jQuery);