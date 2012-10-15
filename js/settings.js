var Settings = {
	colorPicker: "white",
	savedPalette: [],
	pickerState: "color",
	history: new Array(),
	future: new Array(),		
};

Settings.undo = function() {
	if (Settings.history.length === 0) {
		return;
	}
	Settings.saveForRedo();
	Grid.tiles = Settings.history.pop();
	Grid.draw();	
};

Settings.redo = function() {
	if (Settings.future.length === 0) {
		return;
	}
	Settings.saveForUndo();
	Grid.tiles = Settings.future.pop();
	Grid.draw();	
};

/*
 * Created as a workaround for a bug where the 
 * keyboard calling redo did not pop the future.
 */
Settings.redo2 = function() {
	if (Settings.future.length === 0) {
		return;
	}
	Settings.saveForUndo();
	
	// Extra pop needed for keyboard redo
	var firstPop = Settings.future.pop();
	var secondPop = Settings.future.pop();
	if (secondPop != null) {
		Grid.tiles = secondPop;
	} else {
		Grid.tiles = firstPop;
	}
	
	Grid.draw();	
};

Settings.saveForRedo = function() {
	var temp = new Array();
	for (i in Grid.tiles) {
		temp.push($.extend({}, Grid.tiles[i]));
	}
	Settings.future.push(temp);
};;

Settings.saveForUndo = function() {
	var temp = new Array();
	for (i in Grid.tiles) {
		temp.push($.extend({}, Grid.tiles[i]));
	}
	Settings.history.push(temp);
};

Settings.clearRedo = function() {
	Settings.future = new Array();
};

Settings.clearUndo = function() {
	Settings.history = new Array();
};

Settings.setupColorPickerWithSelector = function(selector) {
	$(selector).spectrum({
		color: "white",
		showInput: true,
		preferredFormat: "hex",
		showInitial: true,
		showPalette: true, // Needed to show premade palettte
		palette: ["#255ea6", "#da3838"],
		showSelectionPalette: true,
		localStorageKey: "spectrum.homepage",
		change: function(color) {
			Settings.colorPicker = color.toHexString();
		},
		beforeShow: function() {
			Settings.pickerState = "color";
			Settings.changeCursor('default');
		}
	});
};

Settings.fill = function() {
	Settings.saveForUndo();
	Grid.fill();
};

Settings.empty = function() {
	Settings.saveForUndo();
	Grid.empty();
};

Settings.setupButtonEvents = function() {
	$('#undoBtn').on('click', function() {
		Settings.undo();
	});
	$('#redoBtn').on('click', function() {
		Settings.redo();
	});
	$('#turnOffBtn').on('click', function() {
		Settings.pickerState = "turnOff";
		Settings.changeCursor('default');
	});
	$('#fill').on('click', function() {
		Settings.fill();
	});
	$('#empty').on('click', function() {
		Settings.empty();
	});
	$('#selectBox').on('click', function() {
		Settings.pickerState = "selectBox";
		Settings.changeCursor('crosshair');
	});
};

Settings.changeCursor = function(type) {
	$('canvas').css('cursor', type);
};