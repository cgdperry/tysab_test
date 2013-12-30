
	// start out on the slideshow...
	var displaymode = "slideshow";
	
	// global var for video player for now...
	var vp = videojs("videoplayer");
	
	// add event to check to see if we need to bump to the moa video
	vp.on("ended",nextVideo);
	
	function nextVideo() {
		// if we're on the immuno video
		if (vp.currentSrc().indexOf("mechanism-of-action/video/immuno.mov") > 0) {
			// trigger a click on the moa button
			$("#button_moa").trigger("click");
		}
	}

	$("#button_slideshow").click(function(e){
		
		e.stopPropagation();
		
		if (displaymode == "video")
		{
			// stop any playing video
			vp.pause();

			// make this button white
			$("#button_slideshow").css({ opacity:"0.5" });
			$("#button_video").css({ opacity:"1" });

			// hide the video
			$(".video").animate({
				opacity:0
				}, 300, "easeOutCubic", function() {

				// get the video player out of there to avoid stray clicks
				$(".video").css({ left:"-1024px" });
			});

			// show the slideshow
			$(".slide").animate({
				opacity:1
				}, 300, "easeOutCubic", function() {
			});
			
			// hide the progress bar
			$(".progress-controller").animate({
				opacity:1
				}, 300, "easeOutCubic", function() {
			});

			
			displaymode = "slideshow";
			//alert(displaymode);
		}
		
	});
	
	$("#button_video").click(function(e){
		
		e.stopPropagation();
	
		if (displaymode == "slideshow")
		{
			
			// reset the playing video
			vp.pause(); // Stop video
			vp.src("mechanism-of-action/video/immuno.mov"); // Set Source
			vp.play(); // Play Video

			// make this button white
			$("#button_slideshow").css({ opacity:"1" });
			$("#button_video").css({ opacity:"0.5" });
			
			// Make the immuno button highlight, in case we're at a MOA part of the slideshow
			$("#button_immuno").css({ opacity:"0.5" });
			$("#button_moa").css({ opacity:"1" });

			// get the video player back
			$(".video").css({ left:"0px" });

			// show the video
			$(".video").animate({
				opacity:1
				}, 300, "easeOutCubic", function() {
			});

			// hide the slideshow
			$(".slide").animate({
				opacity:0
				}, 300, "easeOutCubic", function() {
			});
			
			// hide the progress bar
			$(".progress-controller").animate({
				opacity:0
				}, 300, "easeOutCubic", function() {
			});
			
			displaymode = "video";
			//alert(displaymode);
		}

	});
	
	// So the video area doesn't pass clicks back to the slides
	// not bulletproof, but better than nothing...
	$(".video").click(function(e){
		e.stopPropagation();
	});
		
	
	$("#button_immuno").click(function(e){
		
		e.stopPropagation();
		
		if (displaymode == "video")
		{
			
			$("#button_immuno").css({ opacity:"0.5" });
			$("#button_moa").css({ opacity:"1" });
			
			vp.pause(); // Stop video
			vp.src("mechanism-of-action/video/immuno.mov"); // Set Source
			vp.play(); // Play Video

		}
		
	});
	
	$("#button_moa").click(function(e){
		
		e.stopPropagation();
	
		if (displaymode == "video")
		{
			$("#button_moa").css({ opacity:"0.5" });
			$("#button_immuno").css({ opacity:"1" });
			
			vp.pause(); // Stop video
			vp.src("mechanism-of-action/video/moa.mov"); // Set Source
			vp.play(); // Play Video
		}	

	});
