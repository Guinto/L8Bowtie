var Index = {
	mouseDown: false		
};

Index.doActionOnTile = function(event) {
	var pos = Index.getMousePosition(event);
	Grid.checkHitsAndChangeColorIfTrue(pos.x, pos.y, Settings.colorPicker);
}

Index.setup = function() {
	Grid.setup();
	Canvas.setup();
	Index.setupMouseEvents();
	Index.setupKeyboardEvents();
	Settings.setupButtonEvents();
	Settings.setupColorPickerWithSelector('#colorChoice');
	Animation.initFrames(Grid.tiles);
};

Index.setupMouseEvents = function() {
	$('#lightGrid').on('mousedown', function(event) {
		Index.mouseDown = true;
		Settings.clearRedo();
		Settings.saveForUndo();
		console.log(Settings.history);
		Index.doActionOnTile(event);
	});
	$('#lightGrid').on('mouseup', function() {
		Index.mouseDown = false;
		Animation.saveFrame(Grid.tiles);
	});
	$('#lightGrid').on('mousemove', function(event) {
		if (Index.mouseDown) {
			Index.doActionOnTile(event);
		}
	});
};

// Use for keyboard junk
Index.setupKeyboardEvents = function() {
	$('body').keydown(function(e) {
	});
	$('body').keyup(function(e) {
	});
};

Index.getMousePosition = function(event) {
	var canvas = document.getElementById("lightGrid");
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.ceil(event.clientX - rect.left),
		y: Math.ceil(event.clientY - rect.top)
	};
};