var Grid = {
	size: 740,
	actualSize: 740,
	row: 8,
	col: 8,
	margin: 20,
	tiles: new Array()
};

Grid.setup = function() {
	$('#lightGrid').attr("width", Grid.row * Tile.size + (Grid.row + 1) * Grid.margin);
	$('#lightGrid').attr("height", Grid.col * Tile.size + (Grid.col + 1) * Grid.margin);
	Grid.create();
	Grid.draw();
};

Grid.create = function () {
	for (var i = 0; i < Grid.row; i++) {
		for (var j = 0; j < Grid.col; j++) {
			Grid.tiles.push(new TileInstance(i, j));
		}
	}
};

Grid.draw = function() {
	Canvas.clear();
	for (i in Grid.tiles) {
		Grid.tiles[i].draw();
	}
};

Grid.copy = function(grid) {
	var temp = new Array();
	for (i in grid) {
		temp.push($.extend({}, grid[i]));
	}
	return temp;
};

Grid.fill = function() {
	for (i in Grid.tiles) {
		Grid.tiles[i].changeColor(Settings.colorPicker);
	}
};

Grid.empty = function() {
	for (i in Grid.tiles) {
		Grid.tiles[i].turnOff();
	}
};

Grid.checkSelection = function() {
	var selection = new Array();
	for (var x = Selection.startX; x < (Selection.endX + Tile.actualSize); x += Tile.actualSize) {
		for (var y = Selection.startY; y < (Selection.endY + Tile.actualSize); y += Tile.actualSize) {
			Grid.checkHitsAndChangeColorIfTrue(x, y, "pink");
		}
	}
	return selection;
};
Grid.checkHitsAndChangeColorIfTrue = function(x, y, color) {
	for (i in Grid.tiles) {
		if (Grid.tiles[i].hit(x, y)) {
			if (Settings.pickerState == "color" && Grid.tiles[i].color !== color) {
				Grid.tiles[i].changeColor(color);
			} else if (Settings.pickerState == "turnOff") {
				Grid.tiles[i].turnOff();
			} else if (Settings.pickerState == "selectBox" && !Settings.mouseDown) {
				Grid.tiles[i].changeColor(color);
			}
		}
	}
};