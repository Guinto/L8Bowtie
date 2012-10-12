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
	var hitCanvas = parseInt($('.span8').css("width"));
	
	//Top left corner
	Selection.startX = x * Grid.size / hitCanvas;
	Selection.startY = y * Grid.size / hitCanvas;
};

Selection.setEnd = function(x, y) {
	var hitCanvas = parseInt($('.span8').css("width"));
	
	//Bottom left corner
	Selection.endX = x * Grid.size / hitCanvas - Selection.startX;
	Selection.endY = y * Grid.size / hitCanvas - Selection.startY;
};