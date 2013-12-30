(function ($) { /* closure and portability */
    $(document).ready(function(){

       	$(".chart-active .tap-item").on("click", function() {
			var currentClickID = $(this).attr("id");

			$("#chart-bg").removeClass();
			$("#chart-bg").addClass(currentClickID);
		});
		
    });
})(jQuery);
    