$(document).ready(function(){
	console.log('document ready');

	$.getJSON('javascript/skin_config.json', function(conf){
		var config = conf;
		render(config);
		registerEvents();
	});

	function render(conf){
		var rootElement = $('#skinit');

		// container for images
		var layoutContainer = $('<div class="layout">');
		layoutContainer.css('background-image', 'url(images/'+ conf.url +')');

		// container for option controls
		var optionsContainer = $('<div class="controls">');

		rootElement.append(layoutContainer);
		rootElement.append(optionsContainer);

		// introduce layers
		for(var i=0; i<conf.layers.length; i++){ 

			var layer = conf.layers[i];

			var layerElement = $('<div class="layer">');
			layerElement.attr('id', 'layer-' + layer.id);

			layoutContainer.append(layerElement);

			var optionContainer = $('<div>');
			var label = $('<label>');
			label.text(layer.name);

 			var select = $('<select>');
			select.attr('id', layer.id);

			for(var j=0; j<layer.options.length; j++){
				var option = layer.options[j];
				var opt = $('<option>');
				opt.attr('value', option.url);
				opt.text(option.name);
				select.append(opt);
			}

			optionContainer.append(label);
			optionContainer.append(select)
			optionsContainer.append(optionContainer);
		}
	}

	function registerEvents(){

		console.log('Register events');

		$('.controls').change(function(ev){

			console.log('change event');
			var target = $(ev.target);
			var layerId = target.attr('id');
			var filename = target.val();

			$('#layer-' + layerId).css('background-image', 'url(./images/' + filename + ')');
		});
	}

});