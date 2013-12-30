
	$("#button_placebo").click(function(e){
		
		e.stopPropagation();
		
		$("#brain_graphic").css({
			'background-image' : 'url(c03_efficacy/images/brain_graphic_placebo.png)',
		});
		
		$("#button_placebo").css({
			'background-image' : 'url(c03_efficacy/images/brain_button_placebo_light.png)',
		});
		
		$("#button_tysabri").css({
			'background-image' : 'url(c03_efficacy/images/brain_button_tysabri.png)',
		});
		
	});
	
	$("#button_tysabri").click(function(e){
		
		e.stopPropagation();
		
		$("#brain_graphic").css({
			'background-image' : 'url(c03_efficacy/images/brain_graphic_tysabri.png)',
		});
		
		$("#button_placebo").css({
			'background-image' : 'url(c03_efficacy/images/brain_button_placebo.png)',
		});
		
		$("#button_tysabri").css({
			'background-image' : 'url(c03_efficacy/images/brain_button_tysabri_light.png)',
		});
	});

	
	// Makes brain chart show less lesions when displayed...
	// cur_state check prevents changing while in earlier slides
	// AP 2013 12 29
	$("#brain_chart_area").click(function(e){
		if(cur_state == 2)
			$("#button_tysabri").trigger("click");
	});
	