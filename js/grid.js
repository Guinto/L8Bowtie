var Grid = {
	size: 740,
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
Grid.checkHitsAndChangeColorIfTrue = function(x, y, color) {
	for (i in Grid.tiles) {
		if (Grid.tiles[i].hit(x, y)) {
			if (Grid.tiles[i].color !== color) {
				Grid.tiles[i].changeColor(color);
			}
		}
	}
};