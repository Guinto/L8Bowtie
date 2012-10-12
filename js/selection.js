var Selection = {
	startX: 0,
	startY: 0,
	endX: 0,
	endY: 0
};

Selection.draw = function() {
	Canvas.ctx.strokeStyle = "white";
	Canvas.ctx.strokeRect(Selection.startX, Selection.startY, Selection.endX, Selection.endY);
};

Selection.setStart = function(x, y) {
	Grid.actualSize = parseInt($('.span8').css("width"));
	
	//Top left corner
	Selection.startX = x * Grid.size / Grid.actualSize;
	Selection.startY = y * Grid.size / Grid.actualSize;
};

Selection.setEnd = function(x, y) {
	Grid.actualSize = parseInt($('.span8').css("width"));
	
	//Bottom left corner
	Selection.endX = x * Grid.size / Grid.actualSize - Selection.startX;
	Selection.endY = y * Grid.size / Grid.actualSize - Selection.startY;
};