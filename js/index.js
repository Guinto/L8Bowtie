var Index = {
	mouseDown: false,
	pressedKeys: new Array()
};

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
		
		if (Settings.pickerState === 'selectBox') {
			var pos = Index.getMousePosition(event);
			Selection.setStart(pos.x, pos.y);
		}
		Index.doAction(event);
	});
	$('#lightGrid').on('mouseup', function() {
		Index.mouseDown = false;
		Animation.saveFrame(Grid.tiles);
		if (Settings.pickerState == "selectBox") {
			Grid.checkSelection();
			Grid.draw();
		}
	});
	$('#lightGrid').on('mousemove', function(event) {
		if (Index.mouseDown) {
			Index.doAction(event);
		}
	});
};

Index.doAction = function(event) {
	var pos = Index.getMousePosition(event);
	
	// Releases the mouse if it leaves the canvas
	if (pos.x < 5 || pos.y < 5 || pos.x > (Grid.actualSize - 5) || pos.y > (Grid.actualSize - 5)) {
		Index.mouseDown = false;
	}
	
	if (Settings.pickerState === 'selectBox') {
		Selection.setEnd(pos.x, pos.y);
		Grid.draw();
		Selection.draw();
	} else {
		Grid.checkHitsAndChangeColorIfTrue(pos.x, pos.y, Settings.colorPicker);
	}
};

Index.setupKeyboardEvents = function() {
	$('body').keydown(function(e) {
		Index.checkSingleKey(e.which);
		if (!Index.check(e.which)) {
			Index.pressedKeys.push(e.which);
		}
		Index.checkKeyCombos();
	});
	$('body').keyup(function(e) {
		//remove key
		var index = Index.pressedKeys.indexOf(e.which);
		Index.pressedKeys.splice(index, 1);
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