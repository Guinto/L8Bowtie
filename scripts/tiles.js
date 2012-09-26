var rowID = 0;
var tileID = 0;
var savedPalette = [];
var currColor = "";
var offColor = "#292929";
var tiles = new Array();
var numRows = 0;
var numCols = 0;

function Tile(id) {
	this.lit = false;
	this.currColor = offColor;
	this.tileID = id;
	this.tileAnimationTick = 0;
	
	this.changeColor = function(color) {
		this.lit = true;
		this.currColor = color;
		$('#tile' + this.tileID).css('background', this.currColor);
	};
	
	this.turnOff = function() {
		this.lit = false;
		this.currColor = offColor;
		$('#tile' + this.tileID).css('background', this.currColor);
	};
	
	this.update = function() {
		this.tileAnimationTick++;
		if (this.tileAnimationTick > numCols) {
			this.tileAnimationTick = 0;
		}
	}
}

function setupColorPickerWithSelector(selector) {
	$(selector).spectrum({
		showInput: true,
		preferredFormat: "hex",
		showInitial: true,
		showPalette: true, // Needed to show premade palettte
		palette: ["#255ea6", "#da3838"],
		showSelectionPalette: true,
		localStorageKey: "spectrum.homepage",
		change: function(color) {
			currColor = color.toHexString();
		}
	});
}

function setupEvents() {
	var $tiles = $('.tile');
	
	$tiles.on('click', function() {
		var id = $(this).attr("id");
		id = id.substring(4, id.length);
		var tile = getTile(id);
		
		if (tile === null) {
			console.log("Tile with id " + id + " does not exist");
			return;
		}
		
		if (!tile.lit || tile.currColor !== currColor) {
			tile.changeColor(currColor);
		} else {
			tile.turnOff();
		}
	});
}

function getTile(id) {
	for (i in tiles) {
		if (tiles[i].tileID == id) {
			return tiles[i];
		}
	}
	return null;
}

function createTileAndAppendTo(selector) {
	$(selector).append('<div id="tile' + tileID + '" class="tile"></div>');
	tiles.push(new Tile(tileID));
	tileID++;
}

function createRowAndAppendTo(selector) {
	$(selector).append('<div id="row' + rowID + '" class="row"></div>');
}

function createGridWithDimensions(row, col) {
	numRows = row;
	numCols = col;
	for (var i = 0; i < col; i++) {
		createRowAndAppendTo('#lightGrid');
		for (var j = 0; j < row; j++) {
			createTileAndAppendTo('#row' + rowID);
		}
		rowID++;
	}
}