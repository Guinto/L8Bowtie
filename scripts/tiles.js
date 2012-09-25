var rowID = 0;
var tileID = 0;
var savedPalette = [];
var lastColor = "";

function setupTouchEvents() {
	var $tiles = $('.tile');
	
	$tiles.spectrum({
		showInitial: true,
		showPalette: true,
		showSelectionPalette: true,
		palette: [],
		color: lastColor,
		localStorageKey: "spectrum.homepage",
		change: function(color) {
			$(this).css("background", color.toHexString());
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
	for (var i = 0; i < width; i++) {
		createRowAndAppendTo('#lightGrid');
		for (var j = 0; j < height; j++) {
			createTileAndAppendTo('#row' + rowID);
		}
		rowID++;
	}
}