var rowID = 0;

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

function flipOnHover() {
	// set up hover panels
    // although this can be done without JavaScript, we've attached these events
    // because it causes the hover to be triggered when the element is tapped on a touch device
	$('.hover').bind({
		mouseover: function() {
			$(this).addClass('flip');
		},
		mouseout: function() {
			$(this).removeClass('flip');
		}
    });
}