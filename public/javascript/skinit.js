$(document).ready(function(){

	var _data;
	$.getJSON('javascript/skin_config.json', function(data){
		_data = data;
	}); 

	$('#add-new').click(function(){
		var skinitElement = $('<div>').skinit(_data);
		$('.controlpanel').append(skinitElement);
	});
});