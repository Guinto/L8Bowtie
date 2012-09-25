var rowID = 0;
var tileID = 0;
var savedPalette = [];
var currColor = "";

function setupColorPickerWithSelector(selector) {
	$(selector).spectrum({
		showInitial: true,
		showPalette: true,
		showSelectionPalette: true,
		palette: [],
		localStorageKey: "spectrum.homepage",
		change: function(color) {
			currColor = color.toHexString();
		}
	});
}

function setupEvents() {
	var $tiles = $('.tile');
	
	$tiles.on('click', function() {
		$(this).css('background', currColor);
	});
}

function setupTouchEvents() {
	var $tiles = $('.tile');
	
	$tiles.spectrum({
		showInitial: true,
		showPalette: true,
		showSelectionPalette: true,
		palette: [],
		localStorageKey: "spectrum.homepage",
		change: function(color) {
			$(this).css("background", color.toHexString());
			currColor = color.toHexString();
		}
	});
}

function createTileAndAppendTo(selector) {
	$(selector).append('<div id="tile' + tileID + '" class="tile"></div>');
	tileID++;
}

function createRowAndAppendTo(selector) {
	$(selector).append('<div id="row' + rowID + '" class="row"></div>');
}

function createGridWithDimensions(width, height) {
	for (var i = 0; i < height; i++) {
		createRowAndAppendTo('#lightGrid');
		for (var j = 0; j < width; j++) {
			createTileAndAppendTo('#row' + rowID);
		}
		rowID++;
	}
}