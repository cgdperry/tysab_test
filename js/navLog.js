// JavaScript Document
function navPage(virtualScene,callback){
	//alert(virtualScene+' virtual scene fired');
	top.virtualScene(virtualScene);
	callback();
}

// Build the Menu... 2013 08 20 AP

// Start with the uls
$("#sun_dropdown_container").append("<ul class=\"top\"></ul>");
$("#sun_dropdown_container").append("<ul class=\"bottom\"></ul>");

// Build the data: ul class, link class, href, text, page link for current page matching
var navbuttons = new Array(
	["top","home-link","home.htm","Home","home.htm"],
	["top","risk-disease-link","#","Risk of Disease","risk_disease.htm"],
	["top","efficacy-overview-link","#","Efficacy Overview","efficacy_overview.htm"],
	["top","c02_efficacy-link","#","Physical Disability","efficacy_1.htm"],
	["top","c04_efficacy-link","#","ARR","efficacy_2.htm"],
	["top","c03_efficacy-link","#","MRI Activity","efficacy_3.htm"],
	["bottom","traditional-signs-link","#","Traditional Signs","traditional-signs.htm"],
	["bottom","app-patients-link","#","Appropriate Patients","app_patients.htm"],
	["bottom","patient-support-link","#","Patient Support","patient-support.htm"],
	//["bottom","summary-link","#","Summary","summary.htm"],
	["bottom","additional-info-link","#","Additional Information","additional_info.htm"]
	);

// Get the current page with some wicked regex voodoo. Basically grabs everything after the last /
var currentpage = window.location.pathname.replace(/^.*\/([^/]*)/, "$1");

// Render out the buttons
for (var i=0;i<navbuttons.length;i++){
	// If it's the current page, add the current class. Visited gets added later and still works.
	var current = (currentpage==navbuttons[i][4])?"class=\"current\"":"";
	// Output jQuery
	$("ul." + navbuttons[i][0]).append("<li><a id=\"" + navbuttons[i][1] + "\" " + current + " href=\"" + navbuttons[i][2] + "\">" + navbuttons[i][3] + "</a></li>");
	//$("ul." + navbuttons[i][0]).append("<li><a id=\"" + navbuttons[i][1] + "\" " + current + " href='#'>" + navbuttons[i][3] + "</a></li>");		
}

// Exit button's a unique case.
$("ul.bottom").append("<li><a id=\"exit\" class=\"last\" href=\"#\">Exit</a></li>");


//log and nav calls
				
$('#risk-disease-link').on('click',function(){
		//alert('testing');
			
	navPage('TYS-IVA2-QA/risk_of_disease/home',function(){
		window.location.href = 'risk_disease.htm';
	});
			//e.preventDefault();
});				

$('#app-patients-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/patient_selection/home',function(){
		window.location.href = 'app_patients.htm';
	});
			
});	

$('#c02_efficacy-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/physical_disability_progression/home',function(){
		window.location.href = 'efficacy_1.htm';
	});
			
});	

$('#c04_efficacy-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/efficacy/home',function(){
		window.location.href = 'efficacy_2.htm';
	});
			
});	

$('#c03_efficacy-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/mri/home',function(){
		window.location.href = 'efficacy_3.htm';
	});
			
});	

$('#summary-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/summary/home',function(){
		window.location.href = 'summary.htm';
	});
			
});	

// Additional slides 2013 08 20 

$('#efficacy-overview-link').on('click',function(){
	navPage('TYS-IVA2-QA/efficacy-overview/home',function(){
		window.location.href = 'efficacy_overview.htm';
	});		
});	

$('#traditional-signs-link').on('click',function(){
	navPage('TYS-IVA2-QA/traditional-signs/home',function(){
		window.location.href = 'traditional-signs.htm';
	});		
});	

$('#patient-support-link').on('click',function(){
	 navPage('TYS-IVA2-QA/patient-support/home',function(){
		window.location.href = 'patient-support.htm';
	});		
});	

$('#additional-info-link').on('click',function(){
	navPage('TYS-IVA2-QA/additional-info/home',function(){
		window.location.href = 'additional_info.htm';
	});		
});	

// These two were missing... 2013 08 20 

$('#adherence-link').on('click',function(){
	navPage('TYS-IVA2-QA/adherence/home',function(){
		window.location.href = 'adherence.htm';
	});		
});	

$('#mechanism-of-action-link').on('click',function(){
	navPage('TYS-IVA2-QA/mechanism-of-action/home',function(){
		window.location.href = 'moa.htm';
	});		
});	

// Just brought these guys down here to be part of the additional information section... 2013 08 20 

$('#comp-inject-link').on('click',function(){
	navPage('TYS-IVA2-QA/injectable_therapy/home',function(){
		window.location.href = 'inject_therapy.htm';
	});
});	

$('#patient-services-link').on('click',function(){	
	navPage('TYS-IVA2-QA/activeaccess/home',function(){
		window.location.href = 'active_access.htm';
	});	
});	
            
$('#msas-link').on('click',function(){
	navPage('TYS-IVA2-QA/ms_active_source/home',function(){
		window.location.href = 'active_source.htm';
	});
});	


/*
// Links to slides no longer used 2013 08 20
$('#jcv-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/pml_risk_stratification/home',function(){
		window.location.href = 'jcv.htm';
	});
			
});	


$('#pml-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/pml_risk_factors/home',function(){
		window.location.href = 'pml.htm';
	});
			
});	


$('#no-no-no-link').on('click',function(){
		
			
	navPage('TYS-IVA2-QA/traditional_signs/home',function(){
		window.location.href = 'no_no_no.htm';
	});
			
});	
*/
	
            