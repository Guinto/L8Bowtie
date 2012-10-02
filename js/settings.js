var Settings = {
	colorPicker: "white",
	savedPalette: [],
	pickerState: "color",
	recentHistory: new Array(),
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

Settings.saveForRedo = function() {
	var temp = new Array();
	for (i in Grid.tiles) {
		temp.push($.extend({}, Grid.tiles[i]));
	}
	future.push(temp);
};

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
	Settings.undo = new Array();
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
		}
	});
};

Settings.setupButtonEvents = function() {
	$('#undoBtn').on('click', function() {
		undo();
	});
	$('#redoBtn').on('click', function() {
		redo();
	});
	$('#turnOffBtn').on('click', function() {
		Settings.pickerState = "turnOff";
	});
};