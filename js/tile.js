var Tile = {
	offColor: "#292929",
	size: 70
};

function TileInstance() {
	this.color = Tile.offColor;
	this.lit = false
	this.row = arguments[0];
	this.col = arguments[1];

	this.hit = function(x, y) {
		var hitCanvasSize = parseInt($('.span8').css("width"));
		var hitSize = hitCanvasSize * Tile.size / Grid.size;
		var hitMargin = hitCanvasSize * Grid.margin / Grid.size;
		
		// Tile coords refer to top left corner of tile
		var tileX = this.col * hitSize + hitMargin * (this.col + 1);
		var tileY = this.row * hitSize + hitMargin * (this.row + 1);
		if (x > tileX && x < (tileX + hitSize) && y > tileY && y < (tileY + hitSize)) {
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

