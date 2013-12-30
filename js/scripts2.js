var inAnimation = false,
	tabAnimation = false,
    isiScroll,
	isiOpen = false,
	isiAnimating = false,
    cur_id,
    last_id,
    cur_state,
    last_state,
    total_states,
    referenceScroll,
    isiRequiredScroll,
	tabFocus,
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
                "risk-disease": 4,
                "app-patients": 3,
                "comp-inject": 2,
                "c02_efficacy": 2,
                "c03_efficacy": 1,
                "c04_efficacy": 1,
                "no-no-no": 5,
				"pml": 4,
                "jcv":7,
                "patient-services":8,
                "msas":4,
                "summary":3
            },
            roll_count,
            roll_max,
            scrollToE = "";

        cur_id = $("body .contents").attr("id");
        total_states = numStatesObj[cur_id];
        cur_state = 0;

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
						if(PAGE.prev != false && this.dirX == -1) { location.href = PAGE.prev; }
						if(PAGE.next != false && this.dirX ==  1) { location.href = PAGE.next; }
					}

                	/*
                    $("#isi_head_img").removeClass("solid");
                    $cur_div = scrollToE ? $(scrollToE) : $("#pres_scroller > div").eq(this.currPageX);
                    last_id = cur_id;
                    cur_id = $cur_div.attr("id");
                    if (cur_id=="welcome") {
                        if ($("#isi .contents").hasClass("collapse")) {
                            $("#isi .contents .tap_div").trigger("click");
                        }
                        if ($("#isi .indication").hasClass("closed")) {
                            $("#isi .indication").trigger("click");
                        }
                        $("body").addClass("home");
                    } else if (last_id=="welcome" && cur_id!="welcome") {
                        $("body").removeClass("home");
                        if ($("#isi .indication").hasClass("open")) {
                            $("#isi .indication").toggleClass("open closed");
                            $("#isi .indication").parents(".contents").toggleClass("ind-open");
                        }
                        if (!$("#isi .contents").hasClass("collapse")) {
                            $("#isi .contents .tap_div").trigger("click");
                        }
                    } else {
                        $("body").removeClass("home");
                    }
                    total_states =  numStatesObj[cur_id];
                    if (last_id != cur_id) {
                        cur_state = 0;

                        if ($("#"+last_id).hasClass("has-init")) $("#"+last_id).addClass("init");
                        if ($("#"+cur_id).hasClass("has-init")) {
                            $cur_div.removeClass("init");
                            inAnimation = true;
                            setTimeout("resetAnim()",1000);
                        }
                        if ($("#"+last_id).hasClass("individual-tap")) $("#"+last_id).find(".active, .inactive, .show").removeClass("active inactive tapped show").parents(".contents").removeClass("tap-open");
                        if (last_id=="jcv" || last_id=="pml") $("#"+last_id).removeClass("individual-tap risk4");
                        $cur_div.siblings().each(function() {
                            var classes = $(this).attr("class").split(" ");
                            for (var i in classes) {
                                if (classes[i].split("-")[0]=="state" && classes[i].split("-")[1]!="0") {
                                    $(this).removeClass("state-"+classes[i].split("-")[1]);
                                    $(this).addClass("state-0");
                                }
                            }
                        });
                        if (cur_id=="no-no-no") {$("#container #"+cur_id+" .content_body").trigger("click");}
                    }
                    scrollToE = "";
                    */
                }
            });
        } else {
            if ($("#container .contents").hasClass("has-init")) {
                $("#container .contents").removeClass("init");
                inAnimation = true;
                setTimeout("resetAnim()",1000);
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
                        setTimeout("resetAnim()",1000);
                    }
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

        $("#container footer .expand_info").on("click", function() {
            $(this).toggleClass("expanded collapsed");
            $(this).prevAll(".foot_mask").toggleClass("on");
        });

        $("#container #patient-services .tap-item").on("click", function(e) {
            e.preventDefault();
            if ($(this).attr("id")) var idnum = $(this).attr("id").replace(/aa/g,"");
            $(this).nextAll(".comment_holder").find(".c"+idnum).addClass("show").siblings().removeClass("show");
        });

        /* Magnifying glass to enlarge efficacy charts */
        $('.magnifying_glass_button').on('click', function(){
            var mg_id = "#" + $(this).parents(".contents").attr("id") + "_mg";
            $(mg_id).show();
        });
        $('.magnifying_glass_container span').on('click', function(){
            $(this).parents(".magnifying_glass_container").hide();
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
		$('footer .study_statements > div').on('click', function()
		{
			if(!$(this).hasClass("open"))
			{
				$(this).addClass("open");
				$(this).siblings("div").removeClass("open");
			}
			else
			{
				$(this).removeClass("open");
			}
		});

        /* Hide all statements */
        $('.content_body').on('click', function(evt){
            $('footer .study_statements > div').removeClass("open");
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
            if (!$(this).parent().hasClass("collapse")) {
                if ($(this).hasClass("closed")) {
                    $(this).removeClass("closed").addClass("open");
                    $(this).parents(".contents").addClass("ind-open");
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
                var $this = $(this).parent();
                $this.toggleClass("collapse");
				/*alert(isiOpen);
				alert(isiAnimating);*/
				
				if(!isiAnimating){
					if(!isiOpen){
						
						isiAnimating = true;
						$('#isi .contents').animate({
							top: 0
							}, 500, 'easeOutSine', function() {
								isiAnimating = false;
								isiOpen = true;
							});
					} else {
						isiAnimating = true;
						$('#isi .contents').animate({
							top: 432
							}, 500, 'easeOutSine', function() {
								isiAnimating = false;
								isiOpen = false;
							});
					}
				}
				
                if ($this.hasClass("collapse")) {
                    $this.removeClass("ind-open").find("h3").removeClass("open").addClass("closed");
                    if (isiScroll) isiScroll.scrollTo(0, 0, 1000)
                } else {
                    $this.find("h3").not(".indication").removeClass("closed").addClass("open");
                    if (isiScroll) setTimeout("isiScroll.refresh()",1000);
                }
            }
        });

        $(".nav_arrow").bind("click", function() {
            ($(this).parents(".collapsed").length) ? $(this).parents(".collapsed").removeClass("collapsed").addClass("expanded")
                                                    : $(this).parents(".expanded").removeClass("expanded").addClass("collapsed");
        });

        $("#sunmap #sun_area").bind("click", function(e) {
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
		/* justin transition scripts */
		
		  $("#jcv .tap-item").on("click", function() {
			/*  $(this).children('.risk').css('opacity', 1);*/
			  if(cur_state > 2){
			  $(this).children('.risk').animate({
							opacity: 1
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
			  }
		  });
		  
		  $("#container").on("click", function(){
	
			  if(cur_state == 1){
				   		$('#jcv #back_box').animate({
							left: '30px'
							}, 1000, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #front_box').animate({
							left: '30px'
							}, 1000, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #content_box').animate({
							left: '-5px'
							}, 1000, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#JCVplus .bg_img').css('display', 'none');
						$('#JCV- .bg_img').css('display', 'none');
				
						
					
			   } else if (cur_state == 2){
				 		$("#back_box").css('z-index', 500);
						$("#front_box").css('z-index', 1);
						
						/*$("#back_box .front_face").css('display', 'none');*/
						$(".tab-fix").css('display','block');
						$("#front_box #backbox").animate({
							opacity:0
							}, 500, 'easeOutSine', function() {
							// Animation complete.
						});
						
						$("#back_box #backbox_bg .image-back").animate({
							opacity: 0
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$("#back_box #backbox_bg .image-forward").animate({
							opacity: 1
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-back").animate({
							opacity: 1
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-forward").animate({
							opacity: 0
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						/*$("#back_box #backbox_bg .image-back").css('opacity',0);
						$("#back_box #backbox_bg .image-forward").css('opacity',1);
						
						$("#front_box #backbox_bg .image-back").css('opacity',1);
						$("#front_box #backbox_bg .image-forward").css('opacity',0);*/
					
						
						
				
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
						
						
						//moves the left tab forward on focus of back box 
						//moving the image
						
						$("#back_box #backbox_bg .image-back").animate({
							opacity: 1
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$("#back_box #backbox_bg .image-forward").animate({
							opacity: 0
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-back").animate({
							opacity: 0
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						$("#front_box #backbox_bg .image-forward").animate({
							opacity: 1
							}, 500, 'easeOutSine', function() {
							// Animation complete.
							});
						
					/*	$("#back_box #backbox_bg .image-back").css('opacity',1);
						$("#back_box #backbox_bg .image-forward").css('opacity',0);
						
						$("#front_box #backbox_bg .image-back").css('opacity',0);
						$("#front_box #backbox_bg .image-forward").css('opacity',1);*/
						
							
						$('.risk').css('opacity', 0);
						
                        cur_state = 1;
                        inAnimation = true;
                        setTimeout("resetAnim()",500);
						
                    }
                } else {
                    $("#jcv .content_body").trigger("click");
                }
            });
            $("#jcv #JCVplus").on("click", function(){
				if(cur_state == 3){
					
				}
				
          		if (cur_state < 2) {
				
					
                    if (!inAnimation) {
                        $("#jcv.contents").removeClass("state-"+cur_state).removeClass("from_plus").addClass("state-2");
                        if (cur_state == 0) $("#jcv.contents").addClass("from_0");
						$("#back_box .front_face").css('display', 'none');
						
						
						$('#jcv #back_box').animate({
							left: '30px'
							}, 1000, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #front_box').animate({
							left: '30px'
							}, 1000, 'easeOutSine', function() {
							// Animation complete.
							});
						$('#jcv #content_box').animate({
							left: '0px'
							}, 1000, 'easeOutSine', function() {
							// Animation complete.
							});
						
							
						//setting the tabs
						$("#back_box").css('z-index', 500);
						$("#front_box").css('z-index', 1);
						
						$('#JCVplus .bg_img').css('display','none');
						$('#JCV- .bg_img').css('display', 'none');
							
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
				}
			});
        }

		$(".show_all").click(function(){
            if (cur_id == "jcv") $("#jcv").find(".tap-item").trigger("click");
		});

		if (typeof piScroll != "undefined") setTimeout('piScroll.refresh()', 1000);
        if (typeof referenceScroll != "undefined") setTimeout('referenceScroll.refresh()', 1000);
        if (typeof scrollContent != "undefined") setTimeout('scrollContent.refresh()', 1000);

		/* only for individual scenes, remove the following script if the entire presentation is in one file */
		$(".contents.state-0").each(function(){
			if($(this).hasClass('init')){
				$(this).removeClass('init');
			}
		});
		
		/* efficacy scripts */
		$("#c04_efficacy").click(function(){
			if(cur_state == 1){
				
				$('#per67').animate({
							top: '541px'
							}, 1500, 'linear', function() {
							// Animation complete.
							});
				$('#chart67').animate({
							top: '43px'
							}, 1500, 'linear', function() {
									$('#percentage_fade_top ').animate({
										opacity:1,
										top: '70px'
										}, 500, 'easeInOutCubic', function() {
										// Animation complete.
									});
									$('#percentage_fade_bottom').animate({
										opacity:1,
										top: '170px'
										}, 500, 'easeInOutCubic', function() {
										// Animation complete.
									});
							});
			}
		});
		
		
		$("#c03_efficacy").click(function(){
			
			if(cur_state == 1){
				
				$('#per92').animate({
							top: '541px'
							}, 1500, 'linear', function() {
							// Animation complete.
							});
				$('#chart92').animate({
							top: '43px'
							}, 1500, 'linear', function() {
									$('.line_graph_1').animate({
										opacity:1,
										top: '115px'
										}, 500, 'easeInOutCubic', function() {
										// Animation complete.
									});
									$('.line_graph_2').animate({
										opacity:1,
										top: '210px'
										}, 500, 'easeInOutCubic', function() {
										// Animation complete.
									});
							});
			}
		});
		
	
		
		
		

    });
})(jQuery);
