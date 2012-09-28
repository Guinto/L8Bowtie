var offColor = "#292929";
var squareSize = 70;
var canvasSize = 740;
var margin = 20;
var row = 8;
var col = 8;
var tiles = new Array();
$('#lightGrid').attr("width", row * squareSize + (row + 1) * margin);
$('#lightGrid').attr("height", col * squareSize + (col + 1) * margin);

var canvas = document.getElementById("lightGrid");
var ctx = canvas.getContext("2d");

createGrid(row, col);
drawGrid();

function Tile() {
	this.lit = false;
	this.color = offColor;
	this.row = arguments[0];
	this.col = arguments[1];
	
	this.hit = function(x, y) {
		var hitCanvasSize = parseInt($('.span8').css("width"));
		var hitSquareSize = hitCanvasSize * squareSize / canvasSize;
		var hitMargin = hitCanvasSize * margin / canvasSize;
		
		// Tile coords refer to top left corner of tile
		var tileX = this.col * hitSquareSize + hitMargin * (this.col + 1);
		var tileY = this.row * hitSquareSize + hitMargin * (this.row + 1);
		if (x > tileX && x < (tileX + hitSquareSize) && y > tileY && y < (tileY + hitSquareSize)) {
			return true;
		}
		return false;
	}
	
	this.draw = function() {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.col * squareSize + margin * (this.col + 1), this.row * squareSize
				+ margin * (this.row + 1), squareSize, squareSize);
	}

	this.update = function() {
	}

	this.changeColor = function(color) {
		this.lit = true;
		this.color = color;
		this.draw();
	};

	this.turnOff = function() {
		this.lit = false;
		this.color = offColor;
		this.draw();
	};
}

function createGrid(row, col) {
	for (var i = 0; i < row; i++) {
		for (var j = 0; j < col; j++) {
			tiles.push(new Tile(i, j));
		}
	}
}

function drawGrid() {
	clearCanvas();
	for (i in tiles) {
		tiles[i].draw();
	}
}

function copyGrid(grid) {
	var temp = new Array();
	for (i in grid) {
		temp.push($.extend({}, grid[i]));
	}
	return temp;
}

function clearCanvas() {
	// Store the current transformation matrix
	ctx.save();

	// Use the identity matrix while clearing the canvas
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Restore the transform
	ctx.restore();
}

function checkHitsAndChangeColorIfTrue(x, y, color) {
	for (i in tiles) {
		if (tiles[i].hit(x, y)) {
			if (tiles[i].color !== color) {
				tiles[i].changeColor(color);
			}
		}
	}
}