var rowID = 0;

function setupTouchEvents() {
	var $tiles = $('.tile');
	
	$tiles.on('tap', function(event) {
		event.preventDefault();
		if ($(this).attr('class').indexOf("flip") !== -1) {
			$(this).removeClass('flip');
		} else {
			$(this).addClass('flip');
		}
	});
}

function createTileAndAppendTo(selector) {
	$(selector).append('<div class="tile hover panel">'
			+ '<div class="front"></div>' 
			+ '<div class="back"></div>' 
			+ '</div>');
}

function createRowAndAppendTo(selector) {
	$(selector).append('<div id="row' + rowID + '" class="row"></div>');
}

function createGridWithDimensions(width, height) {
	for (var i = 0; i < width; i++) {
		createRowAndAppendTo('#lightGrid');
		for (var j = 0; j < height; j++) {
			createTileAndAppendTo('#row' + rowID);
		}
		rowID++;
	}
}