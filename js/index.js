var Index = {
	mouseDown: false,
	pressedKeys: new Array()
};

Index.doActionOnTile = function(event) {
	var pos = Index.getMousePosition(event);
	
	// Releases the mouse if it leaves the canvas
	if (pos.x < 5 || pos.y < 5) {
		Index.mouseDown = false;
	}
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
		Index.checkSingleKey(e.which);
		if (!Index.check(e.which)) {
			Index.pressedKeys.push(e.which);
		}
		Index.checkKeyCombos();
		console.log(Index.pressedKeys);
	});
	$('body').keyup(function(e) {
		//remove key
		var index = Index.pressedKeys.indexOf(e.which);
		Index.pressedKeys.splice(index, 1);
		console.log(Index.pressedKeys);
	});
};

Index.checkSingleKey = function(key) {
	// spacebar
	if (key == 32) {
		Animation.playOrPause();
	}
};

Index.checkKeyCombos = function() {
	// (ctrl or cmd) + z 
	if ((Index.check(91) || Index.check(17)) && Index.check(90)) {
		Settings.undo();
	}
	// (ctrl or cmd) + shift + z 
	if ((Index.check(91) || Index.check(17)) && Index.check(16) && Index.check(90)) {
		Settings.redo2();
	}
};

Index.check = function(key) {
	return Index.pressedKeys.indexOf(key) != -1;
};

Index.getMousePosition = function(event) {
	var canvas = document.getElementById("lightGrid");
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.ceil(event.clientX - rect.left),
		y: Math.ceil(event.clientY - rect.top)
	};
};