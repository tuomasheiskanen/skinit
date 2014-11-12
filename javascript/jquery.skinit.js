(function($){

	$.fn.skinit = function(data){
		var rootElement = $(this);
		render(rootElement, data);
		registerEvents(rootElement);
		return this;
	}

	function render(root, conf){
		var rootElement = root;

		// container for images
		var layoutContainer = $('<div class="layout">');
		layoutContainer.css('background-image', 'url(images/'+ conf.url +')');

		// container for option controls
		var optionsContainer = $('<div class="controls">');

		rootElement.append(optionsContainer);
		rootElement.append(layoutContainer);

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

			layer.options = layer.options.sort(function(a,b){
				return a.url < b.url ? -1 : 1;
			});

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

	function registerEvents(root){

		$(root, '.controls').change(function(ev){

			var target = $(ev.target);
			var layerId = target.attr('id');
			var filename = target.val();

			if(!filename || filename.length == 0){
				$(this).find('#layer-' + layerId).css('background-image', '');
			}else{
				$(this).find('#layer-' + layerId).css('background-image', 'url(./images/' + filename + ')');
			}

		});
	}

}(jQuery));
