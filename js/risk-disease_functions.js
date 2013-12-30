
// Added to allow an initial click to be forced
function first_click(time) {
	window.setTimeout('$("#container #"+cur_id+" .content_body").trigger("click");',time);
}

(function ($) { /* closure and portability */
    $(document).ready(function(){

		/* risk-disease forward */
		$("#risk-disease").click(function(){
			
			// stops clicks from doing anything if we've hit the end. Don't repeat.
			if(last_state < total_states) {
			
				if(cur_state == 1){
					
					$("#gradient_blue").animate({
						left:'-350px'
						}, 1000, 'easeOutCubic', function() {		
					});
					
					$("#chevron").animate({
						left:'500px'
						}, 1000, 'easeOutCubic', function() {		
					});
					
					$("#sketch_sitting").delay(50).animate({
						left:'280px',
						opacity:1
						}, 700, 'easeInOutCubic', function() {		
					});
					
					$("#sketch_walking").delay(50).animate({
						width:'100px',
						height:'125px',
						left:'80px',
						top:'230px'
						}, 1000, 'easeOutCubic', function() {		
					});
					
					$("#text_01").animate({
						opacity:0
						}, 200, 'easeOutCubic', function() {
							
						// to match the sketch
						$("#text_02").animate({
							opacity:1
							}, 1700, 'easeOutCubic', function() {		
						});	
					});
					
					$("#title").animate({
						opacity:0
						}, 200, 'easeOutCubic', function() {
						
						$("#title").html("<span class=\"pre-title\">HER RISK OF PROGRESSING:</span><br /> MS IS THE LEADING CAUSE OF NONTRAUMATIC, <br /> YOUNG-ADULT DISABILITY<span class=\"super\">4</span>");
						$("#title").animate({
							opacity:1
							}, 1700, 'easeOutCubic', function() {
						});
							
					});

				}
				else if(cur_state == 2){
					
					$("#gradient_blue").animate({
						left:'-100px'
						}, 1000, 'easeOutCubic', function() {		
					});
					
					$("#chevron").animate({
						left:'760px'
						}, 1000, 'easeOutCubic', function() {
					});
					
					$("#sketch_wheelchair").delay(50).animate({
						left:'520px',
						opacity:1
						}, 700, 'easeInOutCubic', function() {		
					});
					
					$("#sketch_sitting").delay(50).animate({
						width:'100px',
						height:'125px',
						left:'350px',
						top:'225px'
						}, 1000, 'easeOutCubic', function() {		
					});
					
					$("#text_02").animate({
						opacity:0
						}, 200, 'easeOutCubic', function() {
							
						// to match the sketch
						$("#text_03").animate({
							opacity:1
							}, 1700, 'easeOutCubic', function() {		
						});
		
					});
					
					
					$("#title").animate({
						opacity:0
						}, 200, 'easeOutCubic', function() {
						
						$("#title").html("<span class=\"pre-title\">HER RISK OF PROGRESSING:</span><br /> A RAPID INCREASE IS SEEN ONCE MODERATE<br /> DISABILITY IS REACHED");
						$("#title").animate({
							opacity:1
							}, 1700, 'easeOutCubic', function() {
						});
							
					});
					
				}
				else if(cur_state == 3){
					
					$("#text_03").animate({
						opacity:0
						}, 200, 'easeOutCubic', function() {		
					});

					$("#sketch_wheelchair").delay(50).animate({
						width:'100px',
						height:'125px',
						left:'600px',
						top:'230px'
						}, 1000, 'easeOutCubic', function() {
							
						$("#gradient_blue").animate({
							left:'-610px'
							}, 1000, 'easeOutCubic', function() {

							$("#sketch_walking").animate({
								width:'261px',
								height:'328px',
								left:'0px',
								top:'0px'
								}, 1000, 'easeOutCubic', function() {
							});
							
							$("#gradient_blue").animate({
								left:'-305px'
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#divider01").animate({
								left:'555px'
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#divider02").animate({
								left:'660px'
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#sketch_sitting").animate({
								left:'581px',
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#sketch_wheelchair").animate({
								left:'681px',
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#gradient_text_02").animate({
								opacity:0,
								left:'575px'
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#gradient_text_03").animate({
								opacity:0,
								left:'680px'
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#gradient_text_02a").delay(500).animate({
								opacity:1
								}, 500, 'easeOutCubic', function() {		
							});
							
							$("#gradient_text_03a").delay(500).animate({
								opacity:1
								}, 500, 'easeOutCubic', function() {		
							});
							
							// to match the sketch
							$("#text_04").animate({
								opacity:1
								}, 1700, 'easeOutCubic', function() {		
							});
							
							$("#title").html("<span class=\"pre-title\">CLOSELY MONITOR THE SMALLER CHANGES SHE'S MAKING NOW:</span><br /> DELAY FUTURE DISABILITY PROGRESSION");
							$("#title").animate({
								opacity:1
								}, 1700, 'easeOutCubic', function() {
							});

						});	
						
						$("#title").animate({
							opacity:0
							}, 200, 'easeOutCubic', function() {
						});
						
					});
					
				}
			
			} // last state vs total states
			
		});
		
		/* app-patients back */
		/* seeing if this supplants the original left function... */
		$(".progress-controller #left-control").click(function(){
		
				event.stopPropagation(); // Prevent the top click event from firing...

				if (cur_id == "risk-disease") // just to keep with style...
				{
					/*
					// This reversal is no longer necessary since it's the intro
					if(cur_state == 0){

						$("#gradient_blue").animate({
							left:'-861px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#chevron").animate({
							left:'0px',
							opacity:0
							}, 1000, 'easeOutCubic', function() {
						});
						
						$("#sketch_walking").animate({
							left:'-20px',
							opacity:0
							}, 700, 'easeInOutCubic', function() {
							
							// for some reason these like to stick around as a ghost
							// on chrome. Not sure why.
									
						});
						
						$("#text_01").animate({
							opacity:0
							}, 1000, 'easeOutCubic', function() {		
						});	
						

					}
					else 
					*/					
					if(cur_state == 0){
						
						$("#gradient_blue").animate({
							left:'-610px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#chevron").animate({
							left:'240px'
							}, 1000, 'easeOutCubic', function() {
						});
						
						$("#sketch_walking").animate({
							top:'0px',
							left:'0px',
							height:'328px',
							width:'261px'
							}, 700, 'easeInOutCubic', function() {		
						});
						
						$("#sketch_sitting").animate({
							opacity:0,
							left:'260px'
							}, 700, 'easeOutCubic', function() {
								
							// for some reason these like to stick around as a ghost
							// on chrome. Not sure why.		
						});
						
						$("#text_02").animate({
							opacity:0
							}, 200, 'easeInOutCubic', function() {
							$("#text_01").animate({
								opacity:1
								}, 1000, 'easeOutCubic', function() {		
							});	
						});

						$("#title").animate({
							opacity:0
							}, 200, 'easeOutCubic', function() {
							
							$("#title").html("<span class=\"pre-title\">SHE MAY SEEM ACTIVE NOW, BUT: </span><br />HER RISK OF PROGRESSING MAY BE HIGHER <br />THAN EXPECTED");
							$("#title").animate({
								opacity:1
								}, 1000, 'easeOutCubic', function() {
							});
								
						});

					}
					else if(cur_state == 1){

						$("#gradient_blue").animate({
							left:'-350px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#chevron").animate({
							left:'500px'
							}, 1000, 'easeOutCubic', function() {
						});
						
						$("#sketch_wheelchair").animate({
							left:'500px',
							opacity:0
							}, 700, 'easeInOutCubic', function() {
							
							// for some reason these like to stick around as a ghost
							// on chrome. Not sure why.
						});
						
						$("#sketch_sitting").animate({
							width:'261px',
							height:'328px',
							left:'280px',
							top:'0px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#text_03").animate({
							opacity:0
							}, 200, 'easeInOutCubic', function() {
							$("#text_02").animate({
								opacity:1
								}, 1000, 'easeOutCubic', function() {		
							});	
						});
						


						$("#title").animate({
							opacity:0
							}, 200, 'easeOutCubic', function() {
							
							$("#title").html("<span class=\"pre-title\">HER RISK OF PROGRESSING:</span><br /> MS IS THE LEADING CAUSE OF NONTRAUMATIC, <br /> YOUNG-ADULT DISABILITY<span class=\"super\">4</span>");
							$("#title").animate({
								opacity:1
								}, 1000, 'easeOutCubic', function() {
							});
								
						});
							
					}
					else if(cur_state == 2){
						

						// to match the sketch
						$("#text_04").animate({
							opacity:0
							}, 1000, 'easeInOutCubic', function() {		
						});
						
						$("#title").animate({
							opacity:0
							}, 1000, 'easeOutCubic', function() {								
						});
						
						$("#sketch_walking").animate({
							width:'100px',
							height:'125px',
							left:'80px',
							top:'230px'
							}, 1000, 'easeOutCubic', function() {							
						});
						
						$("#divider01").animate({
							left:'250px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#divider02").animate({
							left:'510px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#sketch_sitting").animate({
							left:'350px',
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#sketch_wheelchair").animate({
							left:'600px',
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#gradient_text_02a").animate({
							opacity:0
							}, 500, 'easeOutCubic', function() {		
						});
						
						$("#gradient_text_03a").animate({
							opacity:0
							}, 500, 'easeOutCubic', function() {		
						});
						
						$("#gradient_text_02").animate({
							opacity:1,
							left:'270px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#gradient_text_03").animate({
							opacity:1,
							left:'530px'
							}, 1000, 'easeOutCubic', function() {		
						});
						
						$("#gradient_blue").animate({
							left:'-610px'
							}, 1000, 'easeOutCubic', function() {
								
							$("#gradient_blue").animate({
								left:'-100px'
								}, 1000, 'easeOutCubic', function() {
		
							});	
							
							$("#sketch_wheelchair").animate({
								top:'0px',
								left:'520px',
								height:'328px',
								width:'261px'
								}, 1000, 'easeOutCubic', function() {		
							});
							
							$("#text_03").animate({
								opacity:1
								}, 200, 'easeOutCubic', function() {		
							});
							
							$("#title").html("<span class=\"pre-title\">HER RISK OF PROGRESSING:</span><br /> A RAPID INCREASE IS SEEN ONCE MODERATE<br /> DISABILITY IS REACHED");
							$("#title").animate({
								opacity:1
								}, 1000, 'easeOutCubic', function() {
							});
										
						});

					}
					
				}
				
		});

		/*
		$("#edss_button").click(function(){
			
			event.stopPropagation(); // Prevent the top click event from firing...
			
			//alert("edss chart here");
			
		});
		*/
		
		$('.magnifying_glass_button').on('click', function(){console.log($(this).parents(".contents").attr("id"))
			$(this).next('.magnifying_glass_container div').show();
		});
		
		$('.magnifying_glass_container span.close').on('click', function(){
			$('#risk-disease_mg.magnifying_glass_container div.bg').css({ 'background-image':'url(risk-disease/images/popup_chart_bg.png)' });
		});

		$('.magnifying_glass_container div.area_active div.area_left').click(function(){
			$('#risk-disease_mg.magnifying_glass_container div.bg').css({ 'background-image':'url(risk-disease/images/popup_chart_area_left.png)' });
		});
		
		$('.magnifying_glass_container div.area_active div.area_middle').click(function(){
			$('#risk-disease_mg.magnifying_glass_container div.bg').css({ 'background-image':'url(risk-disease/images/popup_chart_area_middle.png)' });
		});
		
		$('.magnifying_glass_container div.area_active div.area_right').click(function(){
			$('#risk-disease_mg.magnifying_glass_container div.bg').css({ 'background-image':'url(risk-disease/images/popup_chart_area_right.png)' });
		});
		
		// Force the first click
		//first_click(300);
		
		// INTRO
		
		$("#gradient_blue").animate({
			left:'-610px'
			}, 1000, 'easeOutCubic', function() {		
		});
		
		$("#chevron").animate({
			opacity:1,
			left:'240px'
			}, 1000, 'easeOutCubic', function() {
		});
		
		$("#sketch_walking").delay(50).animate({
			left:'0px',
			opacity:1
			}, 700, 'easeInOutCubic', function() {		
		});
		
		$("#text_01").animate({
			opacity:1
			}, 700, 'easeInOutCubic', function() {		
		});

    });
})(jQuery);