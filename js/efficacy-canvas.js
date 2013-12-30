(function ($) { /* closure and portability */
    $(document).ready(function(){
        if ($("#down_arrow_67").length > 0) {
            var canvas = document.getElementById("down_arrow_67"),
                context = canvas.getContext("2d");
                
            context.beginPath();
            context.moveTo(1, 6);
            context.lineTo(1, 261);
            context.lineTo(83, 305);
            context.arcTo(86, 306, 171, 265, 3);
            context.lineTo(171, 265);
            context.lineTo(171, 6);
            context.arcTo(171, 1, 165, 1, 5);
            context.lineTo(6, 1);
            context.arcTo(1, 1, 1, 6, 5);
            context.closePath();
            grd = context.createLinearGradient(1,1,1,347);
            grd.addColorStop(0, "rgba(249,214,97,0.6)");
            grd.addColorStop(0.55, "rgba(239,172,28,0.6) ");
            grd.addColorStop(0.84, "rgba(239,178,35,0.6) ");
            grd.addColorStop(0.97, "rgba(249,205,72,0.6)");
            grd.addColorStop(1, "rgba(249,205,72,0.6)");
            context.fillStyle = grd;
            context.fill();

            grd = context.createRadialGradient(-50, 30, 0, -50, 30, 340);
            grd.addColorStop(0, "rgba(256,256,256,0)");
            grd.addColorStop(0.7, "rgba(256,256,256,0)");
            grd.addColorStop(0.705, "rgba(256,256,256,0.32)");
            grd.addColorStop(0.77, "rgba(256,256,256,0.25)");
            grd.addColorStop(0.87, "rgba(256,256,256,0)");
            context.fillStyle = grd;
            context.fill();
        }

        if ($("#down_arrow_92").length > 0) {
            var canvas = document.getElementById("down_arrow_92"),
                context = canvas.getContext("2d");
                
            context.beginPath();
            context.moveTo(1, 6);
            context.lineTo(1, 261);
            context.lineTo(83, 302);
            context.arcTo(86, 307, 89, 302, 5);
            context.lineTo(171, 266);
            context.lineTo(171, 6);
            context.arcTo(171, 1, 166, 1, 5);
            context.lineTo(6, 1);
            context.arcTo(1, 1, 1, 6, 5);
            context.closePath();
            grd = context.createLinearGradient(1,1,1,310);
            grd.addColorStop(0, "rgba(253,230,125,0.85)");
            grd.addColorStop(0.55, "rgba(253,204,71,0.75) ");
            grd.addColorStop(0.84, "rgba(251,192,51,0.8) ");
            grd.addColorStop(0.97, "rgba(252,211,108,0.85)");
            grd.addColorStop(1, "rgba(253,222,120,0.9)");
            context.fillStyle = grd;
            context.fill();

            grd = context.createRadialGradient(-30, 30, 0, -30, 30, 330);
            grd.addColorStop(0, "rgba(256,256,256,0)");
            grd.addColorStop(0.7, "rgba(256,256,256,0)");
            grd.addColorStop(0.705, "rgba(256,256,256,0.35)");
            grd.addColorStop(0.81, "rgba(256,256,256,0.25)");
            grd.addColorStop(0.87, "rgba(256,256,256,0)");
            context.fillStyle = grd;
            context.fill();
        }

        if ($("#chart67canvas").length > 0) {
            canvas = document.getElementById("chart67canvas");
            context = canvas.getContext("2d");
            context.beginPath();
            context.lineWidth = 0;
            context.strokeStyle = "#777777";
            context.lineJoin = "miter";
            context.moveTo(1, 1);
            context.lineTo(15, 1);
            context.lineTo(15, 258);
            context.lineTo(422, 258);
            context.stroke();
            context.moveTo(1, 65);
            context.lineTo(15, 65);
            context.stroke();
            context.moveTo(1, 129);
            context.lineTo(15, 129);
            context.stroke();
            context.moveTo(1, 193);
            context.lineTo(15, 193);
            context.stroke();
            context.moveTo(1, 258);
            context.lineTo(15, 258);
            context.stroke();
        }
        
        if ($("#chart92canvas").length > 0) {
          /*  canvas = document.getElementById("chart92canvas");
            context = canvas.getContext("2d");
            context.beginPath();
            context.lineWidth = 0;
            context.strokeStyle = "#bfbfbf";
            context.lineJoin = "miter";
            context.moveTo(0, 0);
            context.lineTo(14, 0);
            context.lineTo(14, 185);
            context.stroke();
            context.moveTo(0, 184);
            context.lineTo(417, 184);
            context.stroke();
            context.moveTo(0, 61);
            context.lineTo(14, 61);
            context.stroke();
            context.moveTo(0, 122);
            context.lineTo(14, 122);
            context.stroke();*/
        }
        
        if ($("#front1_67").length > 0) {
            canvas = document.getElementById("front1_67");
            context = canvas.getContext("2d");
            context.beginPath();
            context.moveTo(10,25);
            context.arcTo(59,10.7,108,25,175);
            context.lineTo(108, 234);
            context.lineTo(10, 234);
            context.lineTo(10, 25);
            context.fillStyle = "rgba(135,136,140,.88)";
            context.fill();

            context.font = "bold 23px arial";
            context.fillStyle = "#ffffff";
            context.fillText("0.67", 35,51);
        }

        if ($("#front1_92").length > 0) {
            canvas = document.getElementById("front1_92");
            context = canvas.getContext("2d");
            context.beginPath();
            context.moveTo(10,25);
            context.arcTo(53.5,12.768,97,25,160.6875);
            context.lineTo(97, 155);
            context.lineTo(10, 155);
            context.lineTo(10, 25);
            context.fillStyle = "rgba(126,129,132,.85)";
            context.fill();

            context.font = "bold 20px arial";
            context.fillStyle = "#ffffff";
            context.fillText("1.2", 37,45);
        }

        if ($("#front2_67").length > 0) {
            canvas = document.getElementById("front2_67");
            context = canvas.getContext("2d");
            context.beginPath();
            context.moveTo(129,165);
            context.arcTo(93,158,62,158,197);
            context.arcTo(93,157,114,165,175);
            context.moveTo(125,165);
            context.moveTo(129,165);
            context.fillStyle = "rgba(11,85,118,.9)";
            context.fill();
            
            context.beginPath();
            context.moveTo(10,165);
            context.arcTo(62,150.2,114,165,196);
            context.lineTo(114, 234);
            context.lineTo(10, 234);
            context.lineTo(10, 149);
            context.lineTo(10, 165);
            context.fillStyle = "rgba(19,146,200,.9)";
            context.fill();

            context.font = "bold 22px arial";
            context.fillStyle = "#ffffff";
            context.fillText("0.22", 40,193);
        }

        if ($("#front2_92").length > 0) {
            canvas = document.getElementById("front2_92");                                      
            context = canvas.getContext("2d");
            context.beginPath();
            context.moveTo(10,150);
            context.arcTo(55.5,140,99,150,200);
            context.lineTo(99, 167);
            context.lineTo(10, 167);
            context.lineTo(10, 150);
            context.fillStyle = "rgba(19,146,200,.9)";
            context.fill();

            context.font = "bold 20px arial";
            context.fillStyle = "#ffffff";
            context.fillText("0.1", 35,164);
        }
		
	

    });
})(jQuery);
