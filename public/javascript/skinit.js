$(document).ready(function(){

	$.getJSON('javascript/skin_config.json', function(data){
		$('#skinit').skinit(data);
	});

});