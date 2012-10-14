var Tile = {
	offColor: "#292929",
	size: 70,
	actualSize: 70
};

function TileInstance() {
	this.color = Tile.offColor;
	this.lit = false
	this.row = arguments[0];
	this.col = arguments[1];

	this.hit = function(x, y) {
		Grid.actualSize = parseInt($('.span8').css("width"));
		Tile.actualSize = Grid.actualSize * Tile.size / Grid.size;
		var hitMargin = Grid.actualSize * Grid.margin / Grid.size;
		
		// Tile coords refer to top left corner of tile
		var tileX = this.col * Tile.actualSize + hitMargin * (this.col + 1);
		var tileY = this.row * Tile.actualSize + hitMargin * (this.row + 1);
		if (x > tileX && x < (tileX + Tile.actualSize) && y > tileY && y < (tileY + Tile.actualSize)) {
			return true;
		}
		return false;
	};
	
	this.draw = function() {
		Canvas.ctx.fillStyle = this.color;
		Canvas.ctx.fillRect(this.col *  Tile.size +  Grid.margin * (this.col + 1), this.row * Tile.size
				+  Grid.margin * (this.row + 1),  Tile.size,  Tile.size);
	};
	
	this.changeColor = function(color) {
		this.lit = true;
		this.color = color;
		this.draw();
	};
	
	this.turnOff = function() {
		this.lit = false;
		this.color = Tile.offColor;
		this.draw();
	};
}

