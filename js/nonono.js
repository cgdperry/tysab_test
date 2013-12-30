		window.requestAnimFrame = (function(callback){
    return  window.requestAnimationFrame || 
            window.webkitRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
})();

(function ($) { /* closure and portability */
    $(document).ready(function(){
        var canvas,
            context,
            centerX,
            centerY,
            radius,
            grd,
            sincos45 = 0.7071,
            gray = [
                "#d8d8d8",
                "#aeaeae",
                "#cbcbcb",
                "#a9a9a9",
                "rgba(172,172,172,0.0)",
                "rgba(159,159,159,1)",
                "rgba(155,155,155,1)",
            ],
            orange = [
                "#ffeab5",
                "#ffd059",
                "#ffdf97",
                "#fdbd53",
                "rgba(251,176,78,0.0)",
                "rgba(251,176,78,1)",
                "rgba(250,166,61,1)",
            ],
            percents = [83,67,97,57];

         $("#no-no-no .content_body").on("click", function(e) {
            if (cur_state <5) {
               
                if (cur_state === 3) {
					animCircle(4,0);
					animCircle(cur_state+1,percents[cur_state]);
					
					$('#no-no-no .content_body #cover4, #no-no-no .content_body #barAnim4 .percent').animate({
									left: 356
								}, 800, 'easeOutSine', function() {
								});
					
				}
				
				if (cur_state === 2) {
					
					animCircle(3,0);
					setTimeout(function() {animCircle(cur_state,percents[cur_state-1]);},1000);
					
					$('#slide1').animate({
							left: 1026,
							opacity: 0
							}, 1000, function() {
								
								$('#no-no-no.state-3 .content_body #cover3, #no-no-no.state-3 .content_body #barAnim3 .percent').animate({
									left: 598
								}, 1000, function() {
								});
								$('#no-no-no.state-3 .content_body #barAnim3, #no-no-no.state-3 .content_body #barText3').css('opacity',1);
				
							});
					
				}
                
				if (cur_state === 1) {
					animCircle(2,0);
					animCircle(cur_state+1,percents[cur_state]);
					
					
					$('#no-no-no .content_body #cover2, #no-no-no .content_body #barAnim2 .percent').animate({
							left: 426
							}, 800, 'easeOutSine', function() {
								
							});
				}
				
                if (cur_state <1) {
					isiAnimating = false;
					isiOpen = false;
					animCircle(1,0);
					animCircle(cur_state+1,percents[cur_state]);
				}
				
				
                
                $(this).parent().removeClass("state-"+cur_state).addClass("state-" +(++cur_state));
            }
        });
		
		
		
        $('#sun_dropdown_container #reload').on("click", function() {
            if (cur_id=="no-no-no") {
                animNums(1,0);
                animNums(2,0);
                animNums(3,0);
                animNums(4,0);
                
                first_click(400);
            }
        });
        
        if ($("body#presentation").length === 0) {
            first_click(1000);
        }
        
        function first_click(time) {
            window.setTimeout('$("#container #"+cur_id+" .content_body").trigger("click");',time);
        }
		
		function force_first_click(){
			$('#no-no-no.state-1 .content_body #cover1, #no-no-no.state-1 .content_body #barAnim1 .percent').animate({
							left: 520
							}, 1000, 'easeOutSine', function() {
								
							});
		}
        
		function animNums(i,angle) {
            var date = new Date(),
                time = date.getTime(),
                currentAng = 0;
            
            anim(time,i,angle);
            
            function anim(lastTime,i,angle) {
                var date = new Date(),
                    time = date.getTime(),
                    timeDiff = time - lastTime,
                    angularSpeed = 100,
                    angularDistEachFrame = angularSpeed * timeDiff / 1000;
                    
                if (currentAng < angle) {
                    currentAng = currentAng + angularDistEachFrame;
                    lastTime = time;
                    
					<!--moving percent-->
                    $("#barAnim"+i+" .percent").html(Math.floor(currentAng)+"%");
                    
                    requestAnimFrame(function(){
                        anim(time,i,angle);
                    });
                } else if (angle==0) {
                    $("#barAnim"+i+" .percent").empty();
                } else {
					<!--stopped percent-->
                    $("#barAnim"+i+" .percent").html(Math.floor(angle)+"%");
                }
            }
        }
		
        function animCircle(i,angle) {
            var date = new Date(),
                time = date.getTime(),
                currentAng = 0;
            
            anim(time,i,angle);
            
            function anim(lastTime,i,angle) {
                var date = new Date(),
                    time = date.getTime(),
                    timeDiff = time - lastTime,
                    angularSpeed = 100,
                    angularDistEachFrame = angularSpeed * timeDiff / 1000;
                    
                if (currentAng < angle) {
                    currentAng = currentAng + angularDistEachFrame;
                    lastTime = time;
                    
					<!--moving percent-->
                    $("#barAnim"+i+" .percent").html(Math.floor(currentAng)+"%");
                    
                    requestAnimFrame(function(){
                        anim(time,i,angle);
                    });
                } else if (angle==0) {
                    $("#barAnim"+i+" .percent").empty();
                } else {
					<!--stopped percent-->
                    $("#barAnim"+i+" .percent").html(Math.floor(angle)+"%");
                }
                

            }
        }
		
		function gotoEndState() {
			
			$('#slide1').css({'left': '1026px','opacity': '0'});
			$('#slide2').css({'left': '-10px','opacity': '0'});
			$('#barAnim3').css({'opacity': '1'});
			$('#no-no-no .content_body #barAnim4 .percent').css({'left': '426px'});
			$('#cover2').css({'left': '426px','opacity': '1'});
			$('#cover3').css({'left': '598px'});
			$('#barText3').css({'opacity': '1'});
			$("#no-no-no .content_body #barAnim4 .percent").html("57%");
			$("#no-no-no .content_body #barAnim3 .percent").html("97%");
			$("#no-no-no .content_body #barAnim2 .percent").html("67%");
			$("#no-no-no .content_body #barAnim1 .percent").html("83%");
			$("#no-no-no .content_body #barAnim2 .percent").css({'left': '426px'});
			$('#no-no-no .content_body #cover4, #no-no-no .content_body #barAnim4 .percent').css({'left': '356px'});
			$('#no-no-no .content_body #barAnim3 .percent').css({'left': '598px'});
			$('#no-no-no.state-3 .content_body #cover3, #no-no-no.state-3 .content_body #barAnim3 .percent').css({'left': '598px'});
		  
		}
		
		$(".skip").click(gotoEndState);
		
		$(".contents.state-0").each(function(){
			if($(this).attr("id")=='no-no-no'){
				$(this).find('.content_body').trigger('click');
			}
		});
		
		force_first_click();
		
		$(".progress-controller #left-control").click(function(){
						if(cur_state == 2){
							animCircle(2,0);
							animCircle(cur_state-1,83);
					
							
							$('#no-no-no .content_body #cover2, #no-no-no .content_body #barAnim2 .percent').css("left", 150);
					
						} else if (cur_state == 3){
							$('#no-no-no.state-3 .content_body #cover3, #no-no-no.state-3 .content_body #barAnim3 .percent').css('left','-10px');
							$('#no-no-no.state-3 .content_body #barAnim3, #no-no-no.state-3 .content_body #barText3').css('opacity',0);
							
							$('#no-no-no .content_body #slide2').css('opacity', '0');
							$('#slide1').animate({
							left: -10,
							opacity: 1
							}, 1000, function() {
								
								
								
							});
						} else if (cur_state == 4){
							$('#no-no-no .content_body #barAnim4 .percent').css('left', '150px');
							$('#no-no-no .content_body #cover4').css('left', '150px');
							$('#no-no-no.state-2 .content_body #barAnim3').css('opacity', '1');
							$("#cover3").css('left', '598px');
							$("#barText3").css('opacity', '1');
												
						} else if (cur_state == 5){
							$('#slide2').css('opacity', '1');
						}
                        last_state = cur_state;
                        if (cur_state > 1 ) $('.contents').removeClass("state-"+cur_state).removeClass("from_0").removeClass("from_plus").addClass("state-" +(--cur_state));
                       
                        inAnimation = true;
                        setTimeout("resetAnim()",500);
      
			
		});
		
		$(".progress-controller #right-control").click(function(){
					if (cur_id == "no-no-no")
					{
							
						
								  if (cur_state <5) {
				   
					if (cur_state === 3) {
						animCircle(4,0);
						animCircle(cur_state+1,percents[cur_state]);
						
						$('#no-no-no .content_body #cover4, #no-no-no .content_body #barAnim4 .percent').animate({
										left: 356
									}, 800, 'easeOutSine', function() {
									});
						
					}
					if (cur_state === 4) {
						$('#slide2').css('opacity', '0');
					}
					if (cur_state === 2) {
						
						animCircle(3,0);
						setTimeout(function() {animCircle(cur_state,percents[cur_state-1]);},1000);
						$('#no-no-no .content_body #slide2').css('opacity', '1');
						$('#slide1').animate({
								left: 1026,
								opacity: 0
								}, 1000, function() {
									
									$('#no-no-no.state-3 .content_body #cover3, #no-no-no.state-3 .content_body #barAnim3 .percent').animate({
										left: 598
									}, 1000, function() {
									});
									$('#no-no-no.state-3 .content_body #barAnim3, #no-no-no.state-3 .content_body #barText3').css('opacity',1);
					
								});
						
					}
					
					if (cur_state === 1) {
						animCircle(2,0);
						animCircle(cur_state+1,percents[cur_state]);
						
						
						$('#no-no-no .content_body #cover2, #no-no-no .content_body #barAnim2 .percent').animate({
								left: 426
								}, 800, 'easeOutSine', function() {
									
								});
					}
					
					if (cur_state <1) {
						isiAnimating = false;
						isiOpen = false;
						animCircle(1,0);
						animCircle(cur_state+1,percents[cur_state]);
					}
					
					
					
				   $('.contents').removeClass("state-"+cur_state).addClass("state-" +(++cur_state));
					}
						
						 
				}
		});

    });
})(jQuery);
 