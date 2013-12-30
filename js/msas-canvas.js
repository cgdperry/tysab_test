(function ($) { /* closure and portability */
    $(document).ready(function(){

/*        if ($("#msas-c").length > 0) {
            canvas = document.getElementById("msas-c");                                      
            context = canvas.getContext("2d");
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(207, 0);
            context.lineTo(211, 5);
            context.lineTo(211, 258);
            context.arcTo(105.5,326,0,255,195.02);
            context.lineTo(0, 0);
            context.closePath();
            grd = context.createLinearGradient(210,0,0,200);
            grd.addColorStop(0, "#f58b3f");
            grd.addColorStop(0.45, "#f58b3f");
            grd.addColorStop(0.6, "#faaf4d");
            grd.addColorStop(0.65, "#fab14e");
            grd.addColorStop(0.75, "#f9aa4b");
            grd.addColorStop(0.95, "#f58b3f");
            grd.addColorStop(1, "#f58b3f");
            context.fillStyle = grd;
            context.fill();
            context.beginPath();
            context.moveTo(0,0);
            context.lineTo(207, 0);
            context.lineTo(207, 255);
            context.arcTo(103,315,0,255,205.29);
            context.lineTo(0, 0);
            context.closePath();
            grd = context.createRadialGradient(0, 50, 0, 0, 50, 330);
            grd.addColorStop(0, "#ffd15a");
            grd.addColorStop(0.6, "#ffd15a");
            grd.addColorStop(0.85, "#fbb850");
            context.fillStyle = grd;
            context.fill();
            grd = context.createRadialGradient(10, 30, 0, -60, 0, 275);
            grd.addColorStop(0, "#ffeec3");
            grd.addColorStop(0.1, "#ffeec3");
            grd.addColorStop(0.95, "#ffdb7f");
            grd.addColorStop(0.95, "rgba(256,256,256,0)");
            context.fillStyle = grd;
            context.fill();
            var imageObj = new Image();
            imageObj.src = "images/msas-logo.png";
            bg_load();
                
            function bg_load() {
                imageObj.onload = function() {
                    canvas = document.getElementById("msas-c");                                      
                    context = canvas.getContext("2d");
                    context.drawImage(imageObj, 15, 14);
                };
            }
        }*/
		
		if(cur_state == 0){
			
			$('.msas-right').css('opacity', 1);
			$('.msas-left').css('opacity', 1);
			$('.msas-right').delay(200).animate({
				left:470
				
				}, 400, function() {
					$('.comment_holder').css('display','block');
					
				});
		$('.msas-left').delay(200).animate({
				left: 0
				}, 400, function() {
					$('.comment_holder').css('display','block');
				});
		}
    });
})(jQuery);
    