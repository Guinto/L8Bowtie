var colorPicker = "white";
var savedPalette = [];
var mouseDown = false;
var recentHistory = new Array();
var history = new Array();
var future = new Array();

function undo() {
	if (history.length === 0) {
		return;
	}
	saveForRedo();
	tiles = history.pop();
	for (i in tiles) {
		var tile = tiles[i];
		tile.draw();
	}
}

function redo() {
	if (future.length === 0) {
		return;
	}
	saveForUndo();
	tiles = future.pop();
	for (i in tiles) {
		var tile = tiles[i];
		tile.draw();
	}
}

function saveForRedo() {
	var temp = new Array();
	for (i in tiles) {
		temp.push($.extend({}, tiles[i]));
	}
	future.push(temp);
}

function saveForUndo() {
	var temp = new Array();
	for (i in tiles) {
		temp.push($.extend({}, tiles[i]));
	}
	history.push(temp);
}

function clearRedo() {
	future = new Array();
}

function setupColorPickerWithSelector(selector) {
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
			colorPicker = color.toHexString();
		}
	});
}

function setupAnimation () {
	$('#fps').val(Animation.fps);
	$('#fps').on('change', function() {
		Animation.fps = $(this).val();
	});
}

function getMousePosition(event) {
	var canvas = document.getElementById("lightGrid");
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.ceil(event.clientX - rect.left),
		y: Math.ceil(event.clientY - rect.top)
	};
}

function setup() {
	setupMouseEvents();
	setupKeyboardEvents();
	setupButtonEvents();
}

function setupMouseEvents() {
	$('#lightGrid').on('mousedown', function(event) {
		mouseDown = true;
		clearRedo();
		saveForUndo();
		doActionOnTile(event);
	});
	$('#lightGrid').on('mouseup', function() {
		mouseDown = false;
	});
	$('#lightGrid').on('mousemove', function(event) {
		if (mouseDown) {
			doActionOnTile(event);
		}
	});
}

function doActionOnTile(event) {
	var pos = getMousePosition(event);
	hitTiles = checkHitsAndChangeColorIfTrue(pos.x, pos.y, colorPicker);
}

function setupKeyboardEvents() {
	$('body').keydown(function(e) {
		console.log(e.which);
	});
	$('body').keyup(function(e) {
		console.log(e.which);
	});
}

function setupButtonEvents() {
	$('#undoBtn').on('click', function() {
		undo();
	});
	$('#redoBtn').on('click', function() {
		redo();
	});
}