var inAnimation = false,
	tabAnimation = false,
    isiScroll,
	isiOpen = false,
	isiAnimating = false,
    cur_id,
    last_id,
    cur_state,
    last_state,
	leftArrowFirstClick = true,
	rightArrowFirstClick = true,
    total_states,
    referenceScroll,
    isiRequiredScroll,
	tabFocus,
	tabReady = true,
    scrollContent;
	
	
/* tabFocus var added to check current state of tab focus on jvc section */

var PAGE = { 'prev' : false, 'next' : false };



function resetAnim() {
    inAnimation=false;
}
(function ($) { /* closure and portability */

    document.ontouchmove = function(e){
        e.preventDefault();
    }
    $(document).ready(function(){
        var numStatesObj = {
                "risk-disease": 3,
                "app-patients": 3,
				"mechanism-of-action": 6,
                "comp-inject": 2,
                "c02_efficacy": 1,
                "c03_efficacy": 2,
                "c04_efficacy": 1,
                "no-no-no": 5,
				"pml": 4,
                "jcv":7,
                "patient-services":7,
                "msas":0,
				"adherence":0,
                "summary":3,
				//"adherence":3,
				"patient-support":4
            },
            roll_count,
            roll_max,
            scrollToE = "";
		
		
        cur_id = $("body .contents").attr("id");
        total_states = numStatesObj[cur_id];
        cur_state = 0;

		//Set API call for scene tracking
		function navScene(scene){
			console.log(scene);
			top.virtualScene(scene);	
		}


		if(parent.document.getElementById('sceneNav'))
		{
			/*Added API call to inhibit swipe gesture navigation and nav bar*/
			document.getElementById('presentation').scpInhibitScroll = true;
			parent.document.getElementById('sceneNav').style.display='none';
		
		}

        function set_isiScroll() {
            if (document.getElementById('isi_wrapper')) {
                isiScroll = new iScroll('isi_wrapper', {
                    momentum : true,
                    hScrollbar : false,
                    vScroll : true,
                    vScrollbar : true
                });
            }
        }
		
		$("#container footer .expand_info").click(function(){
            $(this).toggleClass("expanded collapsed");
            $(".foot_mask").toggleClass("on");
        });

		isiRequiredModal();
		set_isiScroll();
		if (isiScroll) setTimeout(function()
		{
			isiScroll.refresh();
			isiScroll.scrollTo(0,1,10);
		},500);


		function set_piScroll() {
            piScroll = new iScroll('pi_wrapper', {
                momentum : true,
                hScrollbar : false,
                vScroll : true,
                vScrollbar : true
            });

            setTimeout(function()
            {
            	piScroll.refresh();
            	piScroll.scrollTo(0,1,10);
            },500);
        }

		if (document.getElementById('pi_wrapper')){
            set_piScroll();
        }

        function makeReqIsiScrollable(){
            $('.reqIsiButtons input#cancelquit').bind('click', function(e){
				/* Stand in for return to initial location */
				e.preventDefault();
				if( !($('#blackMask').length>0) ){
					$('body').append('<div id="blackMask"></div>');
				}
				$('#blackMask').fadeIn(200, function(){
					if( !($('#secondChance #cancelQuit').length>0) ){
						$('body').append('<div id="secondChance"><div id="cancelQuit"><p>You must read the <b>TYSABRI Important Safety Information</b> to continue.</p><div class="close"></div><img class="cancel" src="images/button-cancel-quit.png" onclick="top.cancelPresentation(true);"><img class="readIsi" src="images/button-read-isi.png"></div></div>');
					}
					$('#secondChance #cancelQuit').fadeIn(200, function(){
						$('#secondChance #cancelQuit div.close, #secondChance #cancelQuit img.readIsi').bind('click', function(){
							$('#blackMask').fadeOut();
							$('#cancelQuit').fadeOut();
						});
						$('#secondChance #cancelQuit img.readIsi').bind('click', function(){
							$('#secondChance #cancelQuit').fadeOut(200, function(){
								$('#blackMask').fadeOut(200);
							});
						});
					});
				});
            });
			$('#isiPop input#continue').bind('click', function(){
				//$('#isiPop').fadeOut(200);
                //$("body").removeClass("start");
                location.href='home.htm';
			});

            $('.reqIsiButtons input#continue').on('click', function(){
               /* Stand in for continue to location */
                set_isiScroll();

                $("#isiPop").hide();
                if (isiScroll) setTimeout("isiScroll.refresh()",500);
            });
			
			
            function loaded() {
                scrollContent = new iScroll('isiModal', {
                    scrollbarClass: 'myScrollbar',
                    onScrollEnd: function () {
                        if ($('div.myScrollbarV div').css("-webkit-transform")) {
                            var scrollx = parseInt($('div.myScrollbarV div').css("-webkit-transform").substr($('div.myScrollbarV div').css("-webkit-transform").lastIndexOf(",")+1));
                            if (($('.reqIsiButtons input#continue').attr("disabled")) && scrollx > ($('#isiModal').height() - $('.myScrollbarV > div').height() - 15)) {
                                $('.reqIsiButtons input#continue').removeAttr("disabled");
                                $('.reqIsiButtons input#continue').css( {opacity:1, cursor:'pointer'} );
                            }
                        }
                    },
                    momentum : true,
                    hScrollbar : false,
                    vScroll : true,
                    vScrollbar : true
                });

            }
            if (document.getElementById('isiModal')) {
                loaded();
            }
        }

        function isiRequiredModal(){
            $('#isiModalParent').fadeIn(500);
            makeReqIsiScrollable();
        }

		if( document.getElementById('references_wrapper') ){
			var RefContainerHeight = $("#references_wrapper").outerHeight(true),
				RefScrollerHeight = $("#references_wrapper .scroll-inner").outerHeight(true);
			if(RefScrollerHeight>RefContainerHeight){
				referenceScroll = new iScroll('references_wrapper', {
					momentum : true,
					hScrollbar : false,
					vScroll : true,
					vScrollbar : true
				});
			}
		}

        $("#container").on("click",function() {
            if ($("body").hasClass("start")) {
                $("body").removeClass("start");
                $("#isi .contents .indication").trigger("click");
            }
        });


		/* this controls the swipe side to side action nav */
        if ($("body#presentation").length === 1) {
            presentScroll = new iScroll('pres_wrapper', {
                snap: true,
                snapThreshold: 50,
                momentum: false,
                hScrollbar: false,
                vScroll : false,
                bounce: false,
                onScrollMove: function() {
                    $("#isi_head_img").addClass("solid");
                },
                onBeforeScrollEnd: function(e) {

					if(Math.abs(this.distX) > 100)
					{
						if(PAGE.prev != false && this.dirX == -1) { 
							location.href = PAGE.prev; 
							//API tracking call
							
							if (PAGE.prev == risk_disease.htm){navScene('TYS-IVA2-QA/risk_of_disease/home') }
							else if (PAGE.prev == efficacy_overview.htm){navScene('TYS-IVA2-QA/efficacy-overview/home') } // New 2013 08 20 AP
							else if (PAGE.prev == efficacy_1.htm){navScene('TYS-IVA2-QA/physical_disability_progression/home') }
							else if (PAGE.prev == efficacy_2.htm){navScene('TYS-IVA2-QA/efficacy/home') }
							else if (PAGE.prev == efficacy_3.htm){navScene('TYS-IVA2-QA/mri/home') }
							else if (PAGE.prev == traditional-signs.htm){navScene('TYS-IVA2-QA/traditional_signs/home') } // New 2013 08 20 AP
							else if (PAGE.prev == app_patients.htm){navScene('TYS-IVA2-QA/patient_selection/home') }
							else if (PAGE.prev == patient-support.htm){navScene('TYS-IVA2-QA/patient-support/home') } // New 2013 08 20 AP
							else if (PAGE.prev == additional_info.htm){navScene('TYS-IVA2-QA/additional-info/home') } // New 2013 08 20 AP

							// Moved to Additional Information 2013 08 20 AP
							//else if (PAGE.prev == inject_therapy.htm){navScene('TYS-IVA2-QA/injectable_therapy/home') }						
							//else if (PAGE.prev == active_access.htm){navScene('TYS-IVA2-QA/activeaccess/home') }
							//else if (PAGE.prev == active_source.htm){navScene('TYS-IVA2-QA/ms_active_source/home') }

							// Slides no longer used 2013 08 20 AP
							//else if (PAGE.prev == pml.htm){navScene('TYS-IVA2-QA/pml_risk_factors/home') }
							//else if (PAGE.prev == jcv.htm){navScene('TYS-IVA2-QA/pml_risk_stratification/home') }
							//else if (PAGE.prev == no_no_no.htm){navScene('TYS-IVA2-QA/traditional_signs/home') }	

							else {navScene('TYS-IVA2-QA/summary/home') }
							
							
						}
						if(PAGE.next != false && this.dirX ==  1) { 
							location.href = PAGE.next; 
							
							//API tracking call
							
			
							if (PAGE.next == risk_disease.htm){navScene('TYS-IVA2-QA/risk_of_disease/home') }
							else if (PAGE.next == efficacy_overview.htm){navScene('TYS-IVA2-QA/efficacy-overview/home') } // New 2013 08 20 AP
							else if (PAGE.next == efficacy_1.htm){navScene('TYS-IVA2-QA/physical_disability_progression/home') }
							else if (PAGE.next == efficacy_2.htm){navScene('TYS-IVA2-QA/efficacy/home') }
							else if (PAGE.next == efficacy_3.htm){navScene('TYS-IVA2-QA/mri/home') }
							else if (PAGE.next == traditional-signs.htm){navScene('TYS-IVA2-QA/traditional_signs/home') } // New 2013 08 20 AP
							else if (PAGE.next == app_patients.htm){navScene('TYS-IVA2-QA/patient_selection/home') }
							else if (PAGE.next == patient-support.htm){navScene('TYS-IVA2-QA/patient-support/home') } // New 2013 08 20 AP
							else if (PAGE.next == additional_info.htm){navScene('TYS-IVA2-QA/additional-info/home') } // New 2013 08 20 AP

							// Moved to Additional Information 2013 08 20 AP
							//else if (PAGE.next == inject_therapy.htm){navScene('TYS-IVA2-QA/injectable_therapy/home') }							
							//else if (PAGE.next == active_access.htm){navScene('TYS-IVA2-QA/activeaccess/home') }
							//else if (PAGE.next == active_source.htm){navScene('TYS-IVA2-QA/ms_active_source/home') }
							
							// Slides no longer used 2013 08 20 AP
							//else if (PAGE.next == no_no_no.htm){navScene('TYS-IVA2-QA/traditional_signs/home') }
							//else if (PAGE.next == pml.htm){navScene('TYS-IVA2-QA/pml_risk_factors/home') }
							//else if (PAGE.next == jcv.htm){navScene('TYS-IVA2-QA/pml_risk_stratification/home') }
							
							else {navScene('TYS-IVA2-QA/summary/home') }	
						}
					}

           
                }
            });
        } else {
            if ($("#container .contents").hasClass("has-init")) {
                $("#container .contents").removeClass("init");
                inAnimation = true;
                setTimeout("resetAnim()",1000);
            }
        }
		
		//Study Tracking calls
		function trackStudy(study_name,parent){
			if ($(this).hasClass('close')){
				navScene('TYS-IVA2-QA'+study_name);
			}
			else if($(this).hasClass('open')){
				navScene('TYS-IVA2-QA'+parent);	
			}
		}
		
		function closeAllOpenPopUps(){
			$(".pop_up_window").each(function(){
				if( $(this).hasClass("show", "hide") ){
					$(this).removeClass("show").addClass("hide").css("display", "");
				}else{
					$(this).addClass("hide").css("display", "");
				}
			});
		}

		$("#pi_info #close, #isi a").click(function(){
			closeAllOpenPopUps()
		});
		
		// first click bump is no longer needed
		//if (cur_state==0 && cur_id=="adherence") {
		//	setTimeout(function(){ $('.contents').removeClass('state-0').addClass('state-1'); }, 500);
		//	cur_state=1;
		//}

        $("#container .contents").each(function() {

            $(this).find(".content_body").on("click", function(e) {
				
                e.preventDefault();
                if (!$(this).parents(".contents").hasClass("individual-tap")) {
                    if (!inAnimation) {
						
                        last_state = cur_state;
                        if (cur_state < total_states && cur_id!="no-no-no") $(this).parent().removeClass("state-"+cur_state).removeClass("from_0").removeClass("from_plus").addClass("state-" +(++cur_state));
                        if ((cur_id=="jcv" && cur_state==3) || (cur_id=="pml" && cur_state==2)) {
                            $("#"+cur_id).addClass("individual-tap");
                        }
                        inAnimation = true;
                        setTimeout("resetAnim()",500);
                    }
                }
				
				// Make the right arrow disappear on the last slide, reappears on other slides
				// NOTE: This check is in three places since it needs to check #right-control, #left-control and .content_body clicks.
				// AP 2013 10 15
				if (cur_state >= numStatesObj[cur_id]){
					$("#right-control").addClass("lastslide");
				}
				
            });
			
            $(this).find(".tap-item").on("click", function(e) {
                if ($(this).parents(".contents").hasClass("individual-tap")) {
                    e.preventDefault();
                    last_state = cur_state;
                    if (cur_state < total_states && !$(this).hasClass("tapped")) {
                        $(this).parents(".contents").removeClass("state-"+cur_state).addClass("state-" +(++cur_state));
                        $(this).addClass("tapped");
                    }
                    $(this).siblings(".active").removeClass("active").addClass("inactive");
					
					if ($(this).hasClass('last-item')){
							$('#jcv .jcv_plus.statement').addClass('glow');
						}
					
                    if ($(this).parents(".contents").hasClass("resettable")) {
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active').parents("#summary").addClass("tap-open");
                        } else {
                            $(this).removeClass('active').addClass("inactive").parents("#summary").removeClass("tap-open");
                        }
						
					
                    } else {
                        $(".contents .tap-item").removeClass("active").addClass("inactive");
						$(this).addClass("active").removeClass("inactive");
						
						
						/*$(this).addClass("active").removeClass("inactive").prev(".line").addClass("active").removeClass("inactive");*/
                    }
                }
            });
			
        });

		//$('#container #jcv .tap-item').on('click',function(e){
//			
//		});
        

         $("#container #patient-services .tap-item").on("click", function(e) {
            e.preventDefault();
            if ($(this).attr("id")) var idnum = $(this).attr("id").replace(/aa/g,"");
            $(this).nextAll(".comment_holder").find(".c"+idnum).addClass("show").siblings().removeClass("show");
        });

        /* Magnifying glass to enlarge efficacy charts */
        $('.magnifying_glass_button').on('click', function(e){
			e.stopPropagation(); // don't body click on the magnifying glass
            var mg_id = "#" + $(this).parents(".contents").attr("id") + "_mg";
            $(mg_id).show();
        });
        $('.magnifying_glass_container span').on('click', function(){
            $(".magnifying_glass_container").hide();
        });
		
        $('.magnifying_glass_container span').on('click', function(){
            $(".magnifying_glass_container").hide();
        });

        /* hide references / pi info */
		$('#references #close,#pi_info #close').click(function(e){
			$(this).parent().removeClass("show").addClass("hide");
		});

		/* Show pi */
		$("a.pdf_loading_link").click(function(e){
			e.preventDefault();
			$("#pi_info").toggleClass("show hide");
			piScroll.scrollTo(0, 0, 200);
		});

		/* Show / hide isi as popup */
		$("a#isi_popup").click(function(e){
			e.preventDefault();
			scrollContent.scrollTo(0, 0, 200);
			$("#isiPop").removeClass("hide").addClass("popUp show").fadeIn(200);
			scrollContent.refresh();
		});
		$("img#close-img").click(function(){
			$('#isiPop').removeClass("show").addClass("hide").fadeOut(200);
		});

        $('nav a')
            .filter( function(index){ return 'ref' == $(this).text();  } )
            .on( 'click', function(evt){
                var ref = $('#references');
                evt.preventDefault();
                $('#references').toggleClass('hide show');
            });

		/* Toggle show / hide the study statement */
		$('footer .study_statements .study_item').bind('click', function()
		{

			if(tabReady == true){
				
				var clickedDefaultContent = $(this).find(".default_content");
				var clickedHiddenContent = $(this).find(".hidden_content");
				var sibblingsHiddenContent = $(this).siblings("div").find(".hidden_content");
				var sibblingsDefaultContent = $(this).siblings("div").find(".default_content");
				var thisClickStatement = $(this);
					
				if($(this).hasClass("close"))
				{
					
					tabReady = false;
					$(this).addClass("open");
					$(this).removeClass("close");
					$(this).siblings("div").removeClass("open");
					$(this).siblings("div").addClass("close");
					
					setTimeout( function()
				   {
						clickedDefaultContent.hide();
						clickedHiddenContent.show();
						sibblingsHiddenContent.hide();
						sibblingsDefaultContent.show();
						tabReady = true;
				  }, 50);
				  	
				}
				else
				{
					tabReady = false;
					clickedDefaultContent.show();
					clickedHiddenContent.hide();
					
					
					setTimeout( function()
						  {
							
							thisClickStatement.removeClass("open");
							thisClickStatement.addClass("close");
							tabReady = true;
						  }, 50);
				 		 
					
				}
			}
		});

        /* Hide all statements */
        $('.content_body').on('click', function(evt){
       	   //$('footer .study_statements > div').removeClass("open");
            $('#sun_dropdown_container').removeClass("open");
        });

        $(".skip").bind("click", function(e) {
            e.preventDefault();
            $(this).parents(".contents").addClass("skip");
            $(this).parents(".contents").removeClass("state-"+cur_state).addClass("state-"+total_states);
            last_state = cur_state;
            cur_state = total_states;
            if (cur_id=="pml") $("#"+cur_id+" .tap-item").addClass("tapped");
        });
		

        $("#isi .contents .indication").on("click", function() {
            if (isiOpen == true) {
                if ($(this).hasClass("closed")) {
                    $(this).removeClass("closed").addClass("open");
                    
                    if (isiScroll) setTimeout("isiScroll.refresh()",1000);
                } else {
                    $(this).removeClass("open").addClass("closed");
                    $(this).parents(".contents").removeClass("ind-open");
                    if (isiScroll) setTimeout("isiScroll.refresh()",1000);
                }
            }
        });
		
        $("#isi .contents .tap_div").on("click", function() {
            if (!$("body").hasClass("home")) {
               
         
				
				if(!isiAnimating){
					if(!isiOpen){
					
						$('#isi').css('height','560px');
						$(this).parent().removeClass('collapse');
						$(this).parent().addClass('expand');
						 $(this).find(".contents").addClass("ind-open");
						 $('#isi #isi_wrapper').show();
						     if (isiScroll) setTimeout("isiScroll.refresh()",1000);
						isiOpen = true;
						
							$('#isi .contents .isi_content').removeClass("closed").addClass("open");
					
					} else {
						
						isiOpen = false;
						$(this).parent().addClass('collapse');
						$(this).parent().removeClass('expand');
						$('#isi').css('height','150px');
					 	$('#isi #isi_wrapper').hide();
						if($('#isi .contents .indication').hasClass("open")){
								
								$('#isi .contents .indication').removeClass("open").addClass("closed");
                     			
						}
						
              			$('#isi .contents .isi_content').removeClass("open").addClass("closed");
					
					}
				}
				
              
            }
        });

        $(".nav_arrow").bind("click", function() {
            ($(this).parents(".collapsed").length) ? $(this).parents(".collapsed").removeClass("collapsed").addClass("expanded")
                                                    : $(this).parents(".expanded").removeClass("expanded").addClass("collapsed");
        });

		//changed nav element/////
        //$("#sunmap #sun_area").bind("click", function(e) {
		$("#menu-link").bind("click", function(e) {	
            e.preventDefault();
            $('#sun_dropdown_container').addClass("open");
        });
/*
        $('#sun_dropdown_container a').on('click', function(e){
			e.preventDefault();
			$('#sun_dropdown_container').removeClass("open");
			var targetSlide=$(this).attr("href");
            if (targetSlide=="#welcome") {
                $("body").addClass("start");
                setTimeout('$("body").removeClass("start")',2300);
            }
            if (targetSlide!="#") {
                scrollToE = targetSlide;
                presentScroll.scrollToElement( targetSlide, 400);
            }
        });
*/

		/* reloads on reload click  from nav*/
        $('#sun_dropdown_container #reload').on('click', function(){
        	location.reload();
/*
            $("#container #"+cur_id+".contents").removeClass("state-"+cur_state).addClass("state-0");
            cur_state = 0;
            last_state = 0;
            if ($("#"+cur_id).hasClass("individual-tap")) $("#"+cur_id).find(".active, .inactive, .show").removeClass("active inactive tapped show");
            if (cur_id=="jcv" || cur_id=="pml") $("#"+cur_id).removeClass("individual-tap risk4");
            if (cur_id=="summary") $("#"+cur_id).removeClass("tap-open");
            if ($("#"+cur_id).hasClass("has-init")) $("#"+cur_id).addClass("init");
            $('#sun_dropdown_container').removeClass("open");
            if ($("#"+cur_id).hasClass("has-init")) {
                $("#"+cur_id).removeClass("init");
                inAnimation = true;
                setTimeout("resetAnim()",1000);
            }
*/
        });

		//jcv section 
		/* transition scripts */
		
		  if(cur_state == 0){
			  $('#jcv .study_statements').css('display', 'none');
			  $('#jcv .study_statements .prior_is').css('display', 'none');
			  $('#jcv .study_statements .pml_risk').css('display', 'none');
		  }
		  $("#jcv .tap-item").on("click", function() {
			/*  $(this).children('.risk').css('opacity', 1);*/
			  if(cur_state > 2){
				
				  
			  $(this).children('.risk').animate({
							opacity: 1
							}, 250, function() {
							// Animation complete.
							});
						
			  }
			/*  if(cur_state == 7){
				 $('.jcv_plus.statement').delay(500).animate({
							color: 'F4B022'
							}, 500, function() {
							// Animation complete.
							});
			  }*/
		  });
		  
		  $("#container").on("click", function(){
	
			  if(cur_state == 1){
				   		$('#jcv #back_box').animate({
							left: '30px'
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #front_box').animate({
							left: '30px'
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #content_box').animate({
							left: '-5px'
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						//$('#JCVplus').css('display', 'none');
						
						//$('#JCV-').css('display', 'none');
						
						
					
			   } else if (cur_state == 2){
				  	    $('#jcv .study_statements').css('display', 'block');
			  			$('#jcv .study_statements .prior_is').css('display', 'block');
				 		$("#back_box").css('z-index', 250);
						$("#front_box").css('z-index', 1);
						
						/*$("#back_box .front_face").css('display', 'none');*/
						
						
						$("#back_box #backbox_bg .image-back").css('opacity',0);
						$("#back_box #backbox_bg .image-forward").css('opacity',1);
						$("#front_box #backbox_bg .image-back").css('opacity',1);
						$("#front_box #backbox_bg .image-forward").css('opacity',0);
						
						/*$("#back_box #backbox_bg .image-back").animate({
							opacity: 0
							}, 150, function() {
							// Animation complete.
							});
						$("#back_box #backbox_bg .image-forward").animate({
							opacity: 1
							}, 150, function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-back").animate({
							opacity: 1
							}, 150, function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-forward").animate({
							opacity: 0
							}, 150, function() {
							// Animation complete.
							});*/
						/*$("#back_box #backbox_bg .image-back").css('opacity',0);
						$("#front_box #backbox_bg .image-forward").css('opacity',0);
						$("#front_box #backbox_bg .image-back").css('opacity',1);
						
						$("#front_box #backbox_bg .image-back").css('opacity',1);
						$("#back_box #backbox_bg .image-forward").css('opacity',0);
						$("#front_box #backbox_bg .image-forward").css('opacity',0);*/
					
						
						
				
			   } else if (cur_state == 3){
			   
				  $('#jcv .study_statements .pml_risk').css('display', 'block');
				}
				
			
		   });
		   
        if ($("#jcv").length === 1) {
            $(".jcv_minus_tab").on("click", function(){
                if (cur_state != 1) {
                    if (!inAnimation) {
                        $("#jcv.contents").removeClass("state-"+cur_state).removeClass("from_0 individual-tap risk4").addClass("state-1")
                            .find(".tap-item").removeClass("active, inactive, tapped");
                        if (cur_state > 1) $("#jcv.contents").addClass("from_plus");
						
						$("#back_box").css('z-index', 1);
						$("#front_box").css('z-index', 500);
						
						$("#back_box #backbox_bg .image-back").css('opacity',1);
						$("#back_box #backbox_bg .image-forward").css('opacity',0);
						$("#front_box #backbox_bg .image-back").css('opacity',0);
						$("#front_box #backbox_bg .image-forward").css('opacity',1);
						
					/*		$("#back_box #backbox_bg .image-back").animate({
							opacity: 1
							}, 150, function() {
							// Animation complete.
							});
						$("#back_box #backbox_bg .image-forward").animate({
							opacity: 0
							}, 150, function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-back").animate({
							opacity: 0
							}, 150, function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-forward").animate({
							opacity: 1
							}, 150, function() {
							// Animation complete.
							});
				*/
							
						$('.risk').css('opacity', 0);
						
                        cur_state = 1;
                        inAnimation = true;
                        setTimeout("resetAnim()",250);
						
                    }
                } else {
                    $("#jcv .content_body").trigger("click");
                }
            });
            $("#jcv #JCVplus").on("click", function(){
			
				
          		if (cur_state < 2) {
				
					
                    if (!inAnimation) {
                        $("#jcv.contents").removeClass("state-"+cur_state).removeClass("from_plus").addClass("state-2");
                        if (cur_state == 0) $("#jcv.contents").addClass("from_0");
						$("#back_box .front_face").css('display', 'none');
						
						
						$('#jcv #back_box').animate({
							left: '30px'
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #front_box').animate({
							left: '30px'
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #content_box').animate({
							left: '-5px'
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						
							
						//setting the tabs
						$("#back_box").css('z-index', 500);
						$("#front_box").css('z-index', 1);
						
						//$('#JCVplus .bg_img').css('display','none');
						//$('#JCV- .bg_img').css('display', 'none');
							
                        cur_state = 2;
                        inAnimation = true;
                        setTimeout("resetAnim()",1000);
                    }
                } else {
                    $("#jcv .content_body").trigger("click");
                }
            });
			$(".risk_table_click").click(function(){
				var tableClickID=$(this).find("div").attr("id");
				if(tableClickID=="risk4"){
					$("#jcv.contents").addClass("risk4");
					
				}
				
				if(cur_state > 2){
						
						$('#jcv .risk_container .risk_table_click .risk').css('display','block');	
						
						$('#jcv_pi_2or_more_years').click(function(){
					//if(cur_state > 2){
						$('#jcv .jcv_plus.statement').addClass('glow');
					//}
				});
				}
				
				
			});
        }

		$(".show_all").click(function(){
            if (cur_id == "jcv") $("#jcv").find(".tap-item").trigger("click");
		});

		/*if (typeof piScroll != "undefined") setTimeout('piScroll.refresh()', 1000);
        if (typeof referenceScroll != "undefined") setTimeout('referenceScroll.refresh()', 1000);
        if (typeof scrollContent != "undefined") setTimeout('scrollContent.refresh()', 1000);*/

		/* only for individual scenes, remove the following script if the entire presentation is in one file...initiates start animations on first frame */ 
		$(".contents.state-0").each(function(){
			if($(this).hasClass('init')){
				$(this).removeClass('init');
			}
		});
		
		/* c04 forward efficacy scripts */
		$("#c04_efficacy").click(function(){
			
			// stops clicks from doing anything if we've hit the end. Don't repeat.
			if(last_state < total_states) {

				if(cur_state == 1){ // state 1
					
					$('#photo_subject').animate({
							opacity:0
						}, 500, 'easeInOutQuad',function() {
					});
					
					// Kill the graph
					$('#line_graph_area').animate({
						opacity:0
						}, 500, 'easeInOutQuad',function() {
					});	
					
					// Kill the percentage
					$('#percentage_img').animate({
						opacity:0
						}, 500, 'easeInOutQuad',function() {
					});	
		
					// fade out the subtitle
					$(".subtitle").animate({
						opacity:0
						}, 500, 'easeInOutQuad', function() {
					});	
			
					// Photo Background Fadeout
					$('#photo_background').animate({
							opacity:0
						}, 500, 'easeInOutQuad', function() {	
						
						// bump the mask into frame
						$('#state01_mask').animate({
							left:'-660px'
							}, 0, function () {
								
							// start sliding!
							$('#state01_mask').animate({
								left: '0px'
								}, 100, 'easeInOutQuad', function() {
																			
									// Change the subtitle
									$(".subtitle").css({
										'background-image' : 'url(c04_efficacy/images/subtitle2.png)'
									});
									
									// Fade back in subtitle
									$(".subtitle").animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});
									
									// start sliding!
									$('#sphere_graph_area').animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});
								
									$('#sphere_graph_text').animate({
										opacity:1,
										}, 500, 'easeInOutQuad', function() {
									});
										
							});

						});
						
					});
	
				} // if state 2
			} // last_state < total_states end protection
			
		}); // #c04_efficacy.click()
		
		
		$("#c03_efficacy").click(function(){
			
			// stops clicks from doing anything if we've hit the end. Don't repeat.
			if(last_state < total_states) {

				if(cur_state == 1){ // state 1

					$('#photo_subject').animate({
							opacity:0
						}, 500, 'easeInOutQuad',function() {
					});
					
					// Kill the graph
					$('#line_graph_area').animate({
						opacity:0
						}, 500, 'easeInOutQuad',function() {
					});	
					
					// Kill the percentage
					$('#percentage_img').animate({
						opacity:0
						}, 500, 'easeInOutQuad',function() {
					});	
		
					// fade out the subtitle
					$(".subtitle").animate({
						opacity:0
						}, 500, 'easeInOutQuad', function() {
					});	
					
					// Photo Background Fadeout
					$('#photo_background').animate({
							opacity:0
						}, 500, 'easeInOutQuad', function() {
							
							// bump the mask into frame
							$('#state01_mask').animate({
								left:'-660px'
								}, 0, function () {

								// start sliding!
								$('#state01_mask').animate({
									left: '0px'
									}, 100, 'easeInOutQuad', function() {
										
									$(".subtitle").css({
											'background-image' : 'url(c03_efficacy/images/subtitle2.png)'
									});
										
									// Fade back in subtitle
									$(".subtitle").animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});

									$('#sphere_graph_area').animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});
								
									$('#sphere_graph_text').animate({
										opacity:1,
										}, 500, 'easeInOutQuad', function() {
									});
								});
							});
						});
					
				} else if(cur_state == 2){ // state 2

					$('#sphere_graph_area').animate({
						opacity:0
					},500,'easeInOutQuad', function() {
					});
					
					// fade out the subtitle
					$(".subtitle").animate({
						opacity:0
						}, 500, 'easeInOutQuad', function() {
							
							$('#brain_chart_area').animate({
								opacity:1
							},500,'easeInOutQuad', function() {
							});
									
							// Change the subtitle
							$(".subtitle").css({
								'background-image' : 'url(c03_efficacy/images/subtitle3.png)'
							});
							
							// Fade back in subtitle
							$(".subtitle").animate({
								opacity:1
								}, 500, 'easeInOutQuad', function() {
							});
							
					});							

				}
				 
			}
			
		}); // #c03_efficacy.click()
		/*
		Efficacy c02 Content States
		*/
		$("#c02_efficacy").click(function(){

			// stops clicks from doing anything if we've hit the end. Don't repeat.
			if(last_state < total_states) {
				
				if(cur_state == 1){
	
					$('#photo_subject').animate({
							opacity:0
						}, 500, 'easeInOutQuad',function() {
					});
					
					// Kill the graph
					$('#line_graph_area').animate({
						opacity:0
						}, 500, 'easeInOutQuad',function() {
					});	
					
					// Kill the percentage
					$('#percentage_img').animate({
						opacity:0
						}, 500, 'easeInOutQuad',function() {
					});	
		
					// fade out the subtitle
					$(".subtitle").animate({
						opacity:0
						}, 500, 'easeInOutQuad', function() {
					});	
			
					// Photo Background Fadeout
					$('#photo_background').animate({
							opacity:0
						}, 500, 'easeInOutQuad', function() {	
						
						// bump the mask into frame
						$('#state01_mask').animate({
							left:'-660px'
							}, 0, function () {
								
							// start sliding!
							$('#state01_mask').animate({
								left: '0px'
								}, 100, 'easeInOutQuad', function() {
																			
									// Change the subtitle
									$(".subtitle").css({
										'background-image' : 'url(c04_efficacy/images/subtitle2.png)'
									});
									
									// Fade back in subtitle
									$(".subtitle").animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});
									
									// start sliding!
									$('#sphere_graph_area').animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});
								
									$('#sphere_graph_text').animate({
										opacity:1,
										}, 500, 'easeInOutQuad', function() {
									});
										
							});

						});
						
					});
					
					// HARD ENDING ON LAST STEP, NOTHING GETS THROUGH
					// Clumsy, but may be necessary when every unaccounted-for click is setting this thing off otherwise...
					//last_state = total_states;
					
				} // end state 2

			} // last_state = total_states ending check
			
		});
		
	
		/* Home Animation */
/*		
		$('.home #intro-animation').click(function(){
			
			$('.home #intro-animation').animate({
								width:'1024px',
								height:'768px',
								top:'-20px',
								left:'-30px'
							}, 1000, function() {
								$('.home #intro-animation').animate({
									opacity:0
									
								}, 1000, function() {
									$('.home #intro-animation').css('display', 'none');
								});
						});
		});*/
		
		
		/* left control bottom nav logic */
		$(".progress-controller #left-control").click(function(){
		
				event.stopPropagation(); // Prevent the top click event from firing...

				// Make the right arrow disappear on the last slide, reappears on other slides
				// NOTE: This check is in three places since it needs to check #right-control, #left-control and .content_body clicks.
				// AP 2013 10 15
				if (cur_state <= numStatesObj[cur_id]){
					$("#right-control").removeClass("lastslide");
				}

				if (cur_id == "c02_efficacy")
				{

						 if(cur_state == 1){

							// Fade outsubtitle
							$(".subtitle").animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});
							
							// start sliding!
							$('#sphere_graph_area').animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});
							
							// fade out the color shadow
							$('#sphere_graph_shadow_color').animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});

							$('#sphere_graph_text').animate({
								opacity:0,
								//left:'300px'
								}, 500, 'easeOutQuad', function() {
	
								// slide back the mask
								$('#state01_mask').animate({
									left:'-660px'
									}, 100, 'easeInOutQuad', function () {
									
									// once you get near the end just kill it
									$('#state01_mask').animate({
										left: '-700px'
										}, 0, function() {
	
										$('#photo_subject').animate({
											opacity:1
											}, 500, 'easeInOutQuad', function() {
												
										});	
		
										// get the percentage
										$('#percentage_img').animate({
											opacity:1
											}, 500, 'easeInOutQuad',function() {
										});	
			
										// Bring back the graph
										$('#line_graph_area').animate({
											opacity:1
											}, 300, 'easeInOutQuad', function() {
										});	
										
										// Change the subtitle
										$(".subtitle").css({
											'background-image' : 'url(c02_efficacy/images/subtitle.png)'
										});
										
										// Fade back in subtitle
										$(".subtitle").animate({
											opacity:1
											}, 500, 'easeInOutQuad', function() {
										});
	
										// Photo Background Fade in
										$('#photo_background').animate({
												opacity:1
											}, 500, 'easeInOutQuad', function() {
												
										});
				
									});
												
								});

							});
			
						}
						
					} 
					else if (cur_id == "adherence")
					{
						$('#adherence').removeClass('move-forward');
						$('#adherence').addClass('move-backward');
					}	
					else if (cur_id == "jcv")
					{
						
						if(cur_state == 4)
						{
							
							//$('#jcv_npi_2or_less_years .risk').animate({
//								opacity: 0
//								}, 250, function() {
//								// Animation complete.
//								});
								$("#jcv.contents").find(".tap-item").removeClass("tapped");
								
								
								$('#risk1').css('opacity',0);
								$('#risk2').css('opacity',0);
								$('#risk3').css('opacity',0);
								$('#risk4').css('opacity',0);
								
								if ($('#jcv .jcv_plus.statement').hasClass('glow')){
									$('#jcv .jcv_plus.statement').removeClass('glow');	
								}
						} 
						else if(cur_state == 1)
						{
							$('.study_statements').css('display', 'none');
						
							//$('#JCV-').css('display', 'block');
							
						}
						else if(cur_state == 2)
						{
							 $("#jcv.contents").removeClass("state-"+cur_state).removeClass("from_0 individual-tap risk4").addClass("state-1")
                            .find(".tap-item").removeClass("active, inactive, tapped");
                       		 if (cur_state > 1) $("#jcv.contents").addClass("from_plus");
						
							$("#back_box").css('z-index', 1);
							$("#front_box").css('z-index', 500);
							
							$("#back_box #backbox_bg .image-back").css('opacity',1);
							$("#back_box #backbox_bg .image-forward").css('opacity',0);
							$("#front_box #backbox_bg .image-back").css('opacity',0);
							$("#front_box #backbox_bg .image-forward").css('opacity',1);
						}
						else if(cur_state == 5)
						{
							//$('#jcv_pi_2or_less_years .risk').animate({
//								opacity: 0
//								}, 250, function() {
//								// Animation complete.
//								});
								$("#jcv.contents").find(".tap-item").removeClass("tapped");
								
								$('#risk1').css('opacity',1);
								$('#risk3').css('opacity',0);
								$('#risk2').css('opacity',0);
								$('#risk4').css('opacity',0);
								
								if ($('#jcv .jcv_plus.statement').hasClass('glow')){
									$('#jcv .jcv_plus.statement').removeClass('glow');	
								}
						}
						
						else if(cur_state == 6)
						{
							//$('#jcv_npi_2or_more_years .risk').animate({
//								opacity: 0
//								}, 250, function() {
//								// Animation complete.
//								});
								$("#jcv.contents").find(".tap-item").removeClass("tapped");
								
								$('#risk1').css('opacity',1);
								$('#risk2').css('opacity',0);
								$('#risk3').css('opacity',1);
								$('#risk4').css('opacity',0);
								
								if ($('#jcv .jcv_plus.statement').hasClass('glow')){
									$('#jcv .jcv_plus.statement').removeClass('glow');	
								}
						}
						else if(cur_state == 7)
						{
							//$('#jcv_pi_2or_more_years .risk').animate({
//								opacity: 0
//								}, 250, function() {
//								// Animation complete.
//								});
								
								$("#jcv.contents").find(".tap-item").removeClass("tapped");
								$('#risk4').css('opacity',0);
								$('#jcv .jcv_plus.statement').removeClass('glow');
								
						}
					} 
					else if (cur_id == "pml")
					{
						if(cur_state == 3)
						{
							$('#box2').removeClass("tapped").removeClass("active");
						}
						else if(cur_state == 4)
						{
							$('#box3').removeClass("tapped").removeClass("active");
						}
					}
					
					// c04 back
					else if (cur_id == "c04_efficacy")
					{
						if(cur_state == 1){
							
							// Fade outsubtitle
							$(".subtitle").animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});
							
							// start sliding!
							$('#sphere_graph_area').animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});
							
							// fade out the color shadow
							$('#sphere_graph_shadow_color').animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});

							$('#sphere_graph_text').animate({
								opacity:0,
								//left:'300px'
								}, 500, 'easeOutQuad', function() {
	
								// slide back the mask
								$('#state01_mask').animate({
									left:'-660px'
									}, 100, 'easeInOutQuad', function () {
									
									// once you get near the end just kill it
									$('#state01_mask').animate({
										left: '-700px'
										}, 0, function() {
	
										$('#photo_subject').animate({
											opacity:1
											}, 500, 'easeInOutQuad', function() {
												
										});	
		
										// get the percentage
										$('#percentage_img').animate({
											opacity:1
											}, 500, 'easeInOutQuad',function() {
										});	
			
										// Bring back the graph
										$('#line_graph_area').animate({
											opacity:1
											}, 300, 'easeInOutQuad', function() {
										});	
										
										// Change the subtitle
										$(".subtitle").css({
											'background-image' : 'url(c02_efficacy/images/subtitle.png)'
										});
										
										// Fade back in subtitle
										$(".subtitle").animate({
											opacity:1
											}, 500, 'easeInOutQuad', function() {
										});
	
										// Photo Background Fade in
										$('#photo_background').animate({
												opacity:1
											}, 500, 'easeInOutQuad', function() {
												
										});
				
									});
												
								});

							});

						}
						
					}
					// c03 back
					else if (cur_id == "c03_efficacy")
					{
						if(cur_state == 1){
							
							// Fade outsubtitle
							$(".subtitle").animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});
							
							// start sliding!
							$('#sphere_graph_area').animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});
							
							// fade out the color shadow
							$('#sphere_graph_shadow_color').animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
							});

							$('#sphere_graph_text').animate({
								opacity:0,
								//left:'300px'
								}, 500, 'easeInOutQuad', function() {
	
								// slide back the mask
								$('#state01_mask').animate({
									left:'-660px'
									}, 100, 'easeInOutQuad', function () {
									
									// once you get near the end just kill it
									$('#state01_mask').animate({
										left: '-700px'
										}, 0, function() {
	
										$('#photo_subject').animate({
											opacity:1
											}, 500, 'easeInOutQuad', function() {
												
										});	
		
										// get the percentage
										$('#percentage_img').animate({
											opacity:1
											}, 500, 'easeInOutQuad',function() {
										});	
			
										// Bring back the graph
										$('#line_graph_area').animate({
											opacity:1
											}, 300, 'easeInOutQuad', function() {
										});	
										
										// Change the subtitle
										$(".subtitle").css({
											'background-image' : 'url(c03_efficacy/images/subtitle.png)'
										});
										
										// Fade back in subtitle
										$(".subtitle").animate({
											opacity:1
											}, 500, 'easeInOutQuad', function() {
										});
	
										// Photo Background Fade in
										$('#photo_background').animate({
												opacity:1
											}, 500, 'easeInOutQuad', function() {
												
										});
				
									});
												
								});

							});
							
						} else if (cur_state == 2) {
							
							$('#brain_chart_area').animate({
								opacity:0,
								//left:'60px'
							},500,'easeInOutQuad', function() {
							});
							
							// fade out the subtitle
							$(".subtitle").animate({
								opacity:0
								}, 500, 'easeInOutQuad', function() {
									
									$('#sphere_graph_area').animate({
										opacity:1,
										//left:'110px'
									},500,'easeInOutQuad', function() {
									});
									
									// Change the subtitle
									$(".subtitle").css({
										'background-image' : 'url(c03_efficacy/images/subtitle2.png)'
									});
									
									// Fade back in subtitle
									$(".subtitle").animate({
										opacity:1
										}, 500, 'easeInOutQuad', function() {
									});
									
							});		
						}
						
					}
					else if (cur_id == "msas")
					{
						if(cur_state == 1)
						{
							
							$('#msas1').removeClass("tapped").removeClass("active");
							if($('#msas2').hasClass("tapped")){$('#msas2').removeClass("tapped").removeClass("active");}
							if($('#msas3').hasClass("tapped")){$('#msas3').removeClass("tapped").removeClass("active");}
							if($('#msas4').hasClass("tapped")){$('#msas4').removeClass("tapped").removeClass("active");}
							
						} 
						else if(cur_state == 2)
						{
							
							
							$('#msas3').removeClass("active").removeClass("tapped");
							$('#msas1').removeClass("inactive")
							$('#msas1').addClass("tapped").addClass("active");
							
							if($('#msas2').hasClass("tapped")){$('#msas2').removeClass("tapped").removeClass("active");}
							if($('#msas4').hasClass("tapped")){$('#msas4').removeClass("tapped").removeClass("active");}
						}
						else if(cur_state == 3)
						{
							
							
							$('#msas4').removeClass("active").removeClass("tapped");
							$('#msas3').removeClass("inactive")
							$('#msas3').addClass("tapped").addClass("active");
							
							if($('#msas1').hasClass("tapped")){$('#msas1').removeClass("tapped").removeClass("active");}
							if($('#msas2').hasClass("tapped")){$('#msas2').removeClass("tapped").removeClass("active");}
							
							$('#msas1').removeClass("active").addClass("inactive").addClass("tapped");
						}
						else if(cur_state == 4)
						{
							$('#msas2').removeClass("active").removeClass("tapped");
							$('#msas4').removeClass("inactive")
							$('#msas4').addClass("tapped").addClass("active");
							
							if($('#msas1').hasClass("tapped")){$('#msas1').removeClass("tapped").removeClass("active");}
							if($('#msas3').hasClass("tapped")){$('#msas3').removeClass("tapped").removeClass("active");}
							
							$('#msas1').removeClass("active").addClass("inactive").addClass("tapped");
							$('#msas3').removeClass("active").addClass("inactive").addClass("tapped");
						}
						
					}
					else if (cur_id == "patient-services")
					{
						//alert('booya');
						var itemList = ['aa','aa1','aa2','aa3','aa4','aa5','aa6','aa7'];
						var currentSecID = '#patient-services';
						var currentState = getCurrentState(currentSecID, itemList);
						var currentItem = findCurrent(itemList);
						
							//alert(currentSecID);
							//alert(currentItem);
						if (currentItem == 1){
							//reduce current state
							reduceState(currentSecID,currentState,currentItem,itemList);
							resetPost(currentItem,itemList);
							$('#chart-bg').removeClass(itemList[currentItem]).addClass(itemList[currentItem - 1]);
							$('.c1').removeClass('show');							
						}
						
						else if (currentItem > 1){
							resetPost(currentItem,itemList);
							reduceState(currentSecID,currentState,currentItem,itemList);
							$('#chart-bg').removeClass(itemList[currentItem]).addClass(itemList[currentItem - 1]);
							var currentText = '.c'+currentItem;
							var nextText = '.c'+(currentItem-1);
							$(currentText).removeClass('show');
							$(nextText).addClass('show');
							//reduceState(currentSecID,currentState,currentItem,itemList);
						}
						
						
							
					}
					else if(cur_id == "summary")
					{
						/*	
						if(cur_state == 1){
							$('#summary').removeClass('state-1').addClass('state-0');
							$('#summ1').removeClass('active').parents("#summary").removeClass("tap-open");
							$('#summ2').addClass('inactive');
							$('#summ3').addClass('inactive');
							
						}
						
						else if (cur_state == 2){
							$('#summary').removeClass('state-2').addClass('state-1');
							$('#summ2').removeClass('active').addClass('inactive').parents("#summary").removeClass("tap-open");
							$('#summ1').addClass('active').parents("#summary").addClass("tap-open");
							$('#summ3').addClass('inactive');
						}
						else if (cur_state == 3){
							$('#summary').removeClass('state-3').addClass('state-2');
							$('#summ1').addClass('inactive');
							$('#summ3').removeClass('active').addClass('inactive').parents("#summary").removeClass("tap-open");
							$('#summ2').addClass('active').parents("#summary").addClass("tap-open");
								
						}
						*/
					}
					
					
					
					
					
					if (!inAnimation) {
                        last_state = cur_state;
                        if (cur_state > 0 && cur_id!="no-no-no") $('.contents').removeClass("state-"+cur_state).removeClass("from_0").removeClass("from_plus").addClass("state-" +(--cur_state));
                        if ((cur_id=="jcv" && cur_state==3) || (cur_id=="pml" && cur_state==2)) {
                            $("#"+cur_id).addClass("individual-tap");
                        }
                        inAnimation = true;
                        setTimeout("resetAnim()",500);
                    }
				
			
		});
	
		/* right control bottom nav logic */
		$(".progress-controller #right-control").click(function(){

			// Most of the ones in this swtich will sub in a main body "click" for the right arrow
			// to route the code down a single path.
			// End-state protection will already be in their main body click
			// So they're not inside the cur_state < total_states check below
			switch (cur_id){
				case "c02_efficacy":
				case "c03_efficacy":
				case "c04_efficacy":
				case "app-patients":
				case "patient-support":
				case "risk-disease":
					event.stopPropagation(); // Prevent the top click event from firing too soon
					$(".content_body").trigger('click'); // emulate the "next" click of a main body click to keep the last/cur/total in line
					break;
			}
			
			// Make the right arrow disappear on the last slide, reappears on other slides
			// NOTE: This check is in three places since it needs to check #right-control, #left-control and .content_body clicks.
			// AP 2013 10 15
			if (cur_state >= numStatesObj[cur_id]){
				$("#right-control").addClass("lastslide");
			}

			if(cur_state < total_states){

				if (cur_id == "adherence")
				{
					$('#adherence').addClass('move-forward');
					$('#adherence').removeClass('move-backward');
				}
				else if (cur_id == "jcv")
				{
					
					
					if(cur_state == 3)
					{
						$('#jcv .risk_container .risk_table_click .risk').css('display','block');	
						//$('#jcv_npi_2or_less_years .risk').animate({
//							opacity: 1
//							}, 250, function() {
//							// Animation complete.
//							});
							
							$('#risk1').css('opacity',1);
							$('#risk2').css('opacity',0);
							$('#risk3').css('opacity',0);
							$('#risk4').css('opacity',0);
					} 
					else if(cur_state == 4)
					{
						//$('#jcv_pi_2or_less_years .risk').animate({
//							opacity: 1
//							}, 250, function() {
//							// Animation complete.
//							});
							
							$('#risk1').css('opacity',1);
							$('#risk2').css('opacity',0);
							$('#risk3').css('opacity',1);
							$('#risk4').css('opacity',0);
					}
					
					else if(cur_state == 5)
					{
						//$('#jcv_npi_2or_more_years .risk').animate({
//							opacity: 1
//							}, 250, function() {
//							// Animation complete.
//							});
							$('#risk1').css('opacity',1);
							$('#risk2').css('opacity',1);
							$('#risk3').css('opacity',1);
							$('#risk4').css('opacity',0);
					}
					else if(cur_state == 6)
					{
						//$('#jcv_pi_2or_more_years .risk').animate({
//							opacity: 1
//							}, 250, function() {
//							// Animation complete.
//							});
							$('#risk1').css('opacity',1);
							$('#risk2').css('opacity',1);
							$('#risk3').css('opacity',1);
							$('#risk4').css('opacity',1);
							$('#jcv .jcv_plus.statement').addClass('glow');
					}
					
					
					
				} 
				
				else if (cur_id == "msas")
				{
					if(cur_state == 0)
					{
						
						$('#msas1').addClass("tapped").addClass("active");
						
						
					} 
					else if(cur_state == 1)
					{
						$('#msas1').removeClass("active");
						$('#msas1').addClass("inactive");
						$('#msas3').addClass("tapped").addClass("active");
						
						if($('#msas2').hasClass("tapped")){$('#msas2').removeClass("tapped").removeClass("active");}
						
						if($('#msas4').hasClass("tapped")){$('#msas4').removeClass("tapped").removeClass("active");}
						
						$('#msas1').removeClass("active").addClass("inactive").addClass("tapped");
					}
					else if(cur_state == 2)
					{
						$('#msas3').removeClass("active");
						$('#msas3').addClass("inactive");
						$('#msas4').addClass("tapped").addClass("active");
						
						
						if($('#msas1').hasClass("active")){$('#msas1').removeClass("active").addClass("inactive");}
						$('#msas1').removeClass("active").addClass("inactive").addClass("tapped");
						
					}
					else if(cur_state == 3)
					{
						$('#msas4').removeClass("active");
						$('#msas4').addClass("inactive");
						$('#msas2').addClass("tapped").addClass("active");
						
						if($('#msas3').hasClass("tapped")){$('#msas3').removeClass("tapped").removeClass("active");}
						if($('#msas1').hasClass("tapped")){$('#msas1').removeClass("tapped").removeClass("active");}
						
						if($('#msas3').hasClass("active")){$('#msas3').removeClass("active").addClass("inactive");}
						if($('#msas1').hasClass("active")){$('#msas1').removeClass("active").addClass("inactive");}
						
						$('#msas1').removeClass("active").addClass("inactive").addClass("tapped");
						$('#msas3').removeClass("active").addClass("inactive").addClass("tapped");
						$('#msas4').removeClass("active").addClass("inactive").addClass("tapped");
					}
					
				}
				else if (cur_id == "pml")
				{
					if(cur_state == 2)
					{
						$('#box2').addClass("tapped").addClass("active");
					}
					else if(cur_state == 3)
					{
						$('#box3').addClass("tapped").addClass("active");
					}
				}
				else if (cur_id == "patient-services")
				{
					var itemList = ['aa','aa1','aa2','aa3','aa4','aa5','aa6','aa7'];
					var currentSecID = '#patient-services';
					var currentState = getCurrentState(currentSecID, itemList);
					var currentItem = findCurrent(itemList);
					
					if (currentItem == itemList.length -1){
						setPrevTapped(currentItem,itemList);
						currentState = 'state-'+currentItem;
						setState(currentSecID,currentState,itemList);	
						
					}
					
					else if (currentItem > 0 ){
						setPrevTapped(currentItem, itemList);
						
						//set currentState var
						currentState = 'state-'+currentItem;
						
						//advance state to next appropriate
						advanceState(currentSecID,currentState,currentItem,itemList);
						
						//resetPost(currentItem,itemList);	
						resetPost(currentItem,itemList);
						
						//set patient-services specifics
						$('#chart-bg').removeClass(itemList[currentItem]).addClass(itemList[currentItem + 1]);
						var currentText = '.c'+currentItem;
						var nextText = '.c'+(currentItem+1);
						$(currentText).removeClass('show');
						$(nextText).addClass('show');
					}
					
					else if (currentItem == 0){
						//advance to state 1
						advanceState(currentSecID,currentState,currentItem,itemList);
						$('#chart-bg').removeClass(itemList[currentItem]).addClass(itemList[currentItem + 1]);
						$('.c1').addClass('show');
					}
					
				}
				
				else if(cur_id == "summary"){
					/*
					if(cur_state == 0){
							$('#summary').removeClass('state-0').addClass('state-1');
							$('#summ1').addClass('active').parents("#summary").addClass("tap-open");
							$('#summ2').addClass('inactive');
							$('#summ3').addClass('inactive');
						}
			
						else if (cur_state == 1){
							$('#summary').removeClass('state-1').addClass('state-2');
							$('#summ1').removeClass('active').addClass('inactive').parents("#summary").removeClass("tap-open");
							$('#summ2').addClass('active').parents("#summary").addClass("tap-open");
							$('#summ3').addClass('inactive');
						}
						else if (cur_state == 2){
							$('#summary').removeClass('state-2').addClass('state-3');
							$('#summ1').addClass('inactive');
							$('#summ2').removeClass('active').addClass('inactive').parents("#summary").removeClass("tap-open");
							$('#summ3').addClass('active').parents("#summary").addClass("tap-open");
								
						}
						*/
					
				}
				
				

				
				if (!inAnimation) {
							last_state = cur_state;
							if (cur_state < total_states && cur_id!="no-no-no" && cur_id!="patient-services") $('.contents').removeClass("state-"+cur_state).removeClass("from_0").removeClass("from_plus").addClass("state-" +(++cur_state));
							if ((cur_id=="jcv" && cur_state==3) || (cur_id=="pml" && cur_state==2)) {
								$("#"+cur_id).addClass("individual-tap");
							}
							
							
							
							inAnimation = true;
							setTimeout("resetAnim()",500);
				}
			}
		});
		
		function setState(currentSecID,currentState,itemList){
					var actualState = getCurrentState(currentSecID,itemList);
					$(currentSecID).removeClass(actualState).addClass(currentState);
				}
				
				
				function resetPost(currentItem,itemList){
					var currentID;
					for (var i = currentItem; i<itemList.length;i++){
						if ($(currentID).hasClass('tapped')){
							$(currentID).removeClass('tapped');
						}
						if ($(currentID).hasClass('inactive')){
							$(currentID).removeClass('inactive');
						}	
					}
				}
				
				function setPrevTapped(currentItem,itemList){
					var currentID;
					for (var i = 0; i<currentItem; i++){
						currentID = '#'+itemList[i];
						if (!$(currentID).hasClass('tapped')){
							$(currentID).addClass('tapped');
						}
						if (!$(currentID).hasClass('inactive')){
							$(currentID).addClass('inactive');
						}
					}
				}
				
				function advanceState(currentSecID,currentState,currentItem,itemList){
					var currentID; 
					var localState;
					if (currentItem < itemList.length - 1){
						//update active item
						currentID = '#'+itemList[currentItem];
						$(currentID).removeClass('active').addClass('tapped');
						currentID = '#'+itemList[currentItem+1];
						$(currentID).addClass('active');
						
						//update state
						localState = 'state-'+ (currentItem +1);
						setState(currentSecID,localState,itemList);		
					}
				}
				
				function reduceState(currentSecID,currentState,currentItem,itemList){
					var currentID;
					var localState;
					currentID = '#'+itemList[currentItem];
						$(currentID).removeClass('active').removeClass('tapped');
						
						currentID = '#'+itemList[currentItem-1];
						$(currentID).addClass('active');
						
						//update state
						localState = 'state-'+ (currentItem -1);
						setState(currentSecID,localState,itemList);		
				}
				
				function resetPost(currentItem,itemList){
					var currentID;
					for (var i=currentItem; i<itemList.length;i++){
						currentID = '#' + itemList[i];
						if ($(currentID).hasClass('tapped')){
							$(currentID).removeClass('tapped');
						}
						if ($(currentID).hasClass('inactive')){
							$(currentID).removeClass('inactive');
						}	
					}
				}
				
				
					

				function getCurrentState(currentSecID, itemList){
					var myState;
					var maxStates = itemList.length;
					var checkState; 
					
					for (var i = 0; i < maxStates; i++){
						checkState = 'state-' + i; 
						if ($(currentSecID).hasClass(checkState)){
							myState = checkState;	
						}
					}
					return myState;
				}

				
				function setNextState(currentItem, itemList){
					if (currentItem < itemList.length){	
						var state = "state-" + currentItem + 1; 
					}
					return state; 
				}
				
				function findCurrent(itemList){
					var currentID;
					var currentItemIndex = 0;
					for (var i=0; i<itemList.length; i++){
						currentID = '#'+ itemList[i];
						if ($(currentID).hasClass('active')){
							currentItemIndex = i;	
						}
					}
					return currentItemIndex; 
				}
		
				
				
				//Navigation with sceneTracking
				
				
				
				
				
				
		//function exit(){
			
			//var targetList = top.getActiveContactList();
//			var current;
//			for (var i = 0; i < targetList.length; i++){
//				current = targetList[i];
//				var value = current.ID
//				//alert(value);	
//				top.contactListRemoveActiveContact(value.toString());
//			top.cancelPresentation(true);
//			sessionStorage.clear();	
		//}
		
		//function closeOut(){
//			var targetList = top.getActiveContactList();
//			var current;
//			for (var i = 0; i < targetList.length; i++){
//				current = targetList[i];
//				var value = current.ID
//				alert(value);	
//				//top.contactListRemoveActiveContact(value);
//				
//			}
//			
//			top.cancelPresentation(true);
//			sessionStorage.clear();	
//			
//			//try{
////				if ( ( targetList != null ) && ( targetList.length > 0 ) ){
////					for (var i = 0; i < targetList.length; i++){
////						var current = targetList[i];
////						if (current != null){
////							var value = current[ID].toString();
////							alert(value);	
////						}
////					}
////				}
////			}
////			
////			catch (err){
////				alert("ERROR retrieving Contacts");
////			}
//			//$.each(targetList,function(key, value){
////				top.contactListRemoveActiveContact(value);	
////			});
//			
//			
//			//exit();
//		}
	
		$('#container .content_body').click(function(){
			leftArrowFirstClick = true;
			rightArrowFirstClick = true;
		});
		
		
	/*alert(sessionStorage.getItem('someKey'));*/
	
		
		cur_view_state = cur_id;
		sessionStorage.setItem(cur_view_state,'visited');
		
		if (sessionStorage.getItem('risk-disease') == 'visited'){
			$('#risk-disease-link').addClass('visited');
			
		}
		if (sessionStorage.getItem('app-patients') == 'visited'){
			$('#app-patients-link').addClass('visited');
			
		}
		if (sessionStorage.getItem('comp-inject') == 'visited'){
			$('#comp-inject-link').addClass('visited');
			
		}
		if (sessionStorage.getItem('c02_efficacy') == 'visited'){
			$('#c02_efficacy-link').addClass('visited');
			
		}
		if (sessionStorage.getItem('c03_efficacy') == 'visited'){
			$('#c03_efficacy-link').addClass('visited');
			
		}
		if (sessionStorage.getItem('c04_efficacy') == 'visited'){
			$('#c04_efficacy-link').addClass('visited');
		}

		if (sessionStorage.getItem('patient-services') == 'visited'){
			$('#patient-services-link').addClass('visited');
		}
		if (sessionStorage.getItem('msas') == 'visited'){
			$('#msas-link').addClass('visited');
		}
		if (sessionStorage.getItem('adherence') == 'visited'){
			$('#adherence-link').addClass('visited');
		}
		if (sessionStorage.getItem('summary') == 'visited'){
			$('#summary-link').addClass('visited');
		}
		
		// New Slides 2013 08 20 AP
		if (sessionStorage.getItem('efficacy-overview') == 'visited'){
			$('#efficacy-overview-link').addClass('visited');
		}
		if (sessionStorage.getItem('traditional-signs') == 'visited'){
			$('#traditional-signs-link').addClass('visited');
		}
		if (sessionStorage.getItem('patient-support') == 'visited'){
			$('#patient-support-link').addClass('visited');
		}
		if (sessionStorage.getItem('additional-info') == 'visited'){
			$('#additional-info-link').addClass('visited');
		}
		
		// Slides no longer used 2013 08 20 AP
		//if(sessionStorage.getItem('jcv') == 'visited'){
		//	$('#jcv-link').addClass('visited');
		//} 
		//if (sessionStorage.getItem('no-no-no') == 'visited'){
		//	$('#no-no-no-link').addClass('visited');
		//}
		//if (sessionStorage.getItem('pml') == 'visited'){
		//	$('#pml-link').addClass('visited');
		//}

		
		
		
		$('#exit').click(function(){
			
			if (cur_id == 'patient-services'){
				sessionStorage.setItem('current_page','active_access.htm');
			}
			
			else if (cur_id == 'msas'){
				sessionStorage.setItem('current_page','active_source.htm');
			}
			else if (cur_id == 'adherence'){
				sessionStorage.setItem('current_page','adherence.htm');
			}
			else if (cur_id == 'app-patients'){
				sessionStorage.setItem('current_page','app_patients.htm');
			}
			else if (cur_id == 'c02_efficacy'){
				sessionStorage.setItem('current_page','efficacy_1.htm');
			}
			else if (cur_id == 'c04_efficacy'){
				sessionStorage.setItem('current_page','efficacy_2.htm');
			}
			else if (cur_id == 'c03_efficacy'){
				sessionStorage.setItem('current_page','efficacy_3.htm');
			}
			else if (cur_id == 'welcome'){
				sessionStorage.setItem('current_page','home.htm');
			}
			else if (cur_id == 'comp-inject'){
				sessionStorage.setItem('current_page','inject_therapy.htm');
			}
			else if (cur_id == 'mechanism-of-action'){
				sessionStorage.setItem('current_page','moa.htm');
			}
			else if (cur_id == 'risk-disease'){
				sessionStorage.setItem('current_page','risk_disease.htm');
			}
			else if (cur_id == 'summary'){
				sessionStorage.setItem('current_page','summary.htm');
			}
			
			// New Slides 2013 08 20 AP
			else if (cur_id == 'efficacy-overview'){
				sessionStorage.setItem('current_page','efficacy_overview.htm');
			}
			else if (cur_id == 'traditional-signs'){
				sessionStorage.setItem('current_page','traditional-signs.htm');
			}
			else if (cur_id == 'patient-support'){
				sessionStorage.setItem('current_page','patient-support.htm');
			}
			else if (cur_id == 'additional-info'){
				sessionStorage.setItem('current_page','additional_info.htm');
			}
			
			// Slides no longer used 2013 08 20 AP
			//else if (cur_id == 'jcv'){
			//	sessionStorage.setItem('current_page','jcv.htm');
			//}
			//else if (cur_id == 'no-no-no'){
			//	sessionStorage.setItem('current_page','no_no_no.htm');
			//}
			//else if (cur_id == 'pml'){
			//	sessionStorage.setItem('current_page','pml.htm');
			//}
			
			else{
				sessionStorage.setItem('current_page','index.htm');	
			}
			
			top.navigateScene('TYS-Exit-Scene-QA');
				
		});
		
		// Makes the logo into a home-screen click
		// AP 2013 12 29 
		$('#isi_head_img').click(function(){
			location.href = "home.htm";
		});

		// Makes the title no longer pass through click events
		// AP 2013 12 29 
		$('h1.title').click(function(e){
			e.stopPropagation();
		});
		
		
		//$('#exit').click(function(){
//			
//			closeOut(function(){
//			top.cancelPresentation(true);
//			sessionStorage.clear();
//			});	
//		});
		
		//$('#exit').click(closeOut(targetList,function(){
//			top.cancelPresentation(true);
//			sessionStorage.clear();
//			}));
			
			
		//$('#exit').click(function(){
//			top.cancelPresentation(true);
//			sessionStorage.clear();
//		});


    });
})(jQuery);
