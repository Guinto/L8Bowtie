var colorPicker = "white";
var savedPalette = [];
var mouseDown = false;
var recentHistory = new Array();
var history = new Array();
var future = new Array();

var Page = {};

function undo() {
	if (history.length === 0) {
		return;
	}
	saveForRedo();
	tiles = history.pop();
	drawGrid();	
}

function redo() {
	if (future.length === 0) {
		return;
	}
	saveForUndo();
	tiles = future.pop();
	drawGrid();	
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

function getMousePosition(event) {
	var canvas = document.getElementById("lightGrid");
	var rect = canvas.getBoundingClientRect();
	return {
		x: Math.ceil(event.clientX - rect.left),
		y: Math.ceil(event.clientY - rect.top)
	};
}

Page.setup = function() {
	setupMouseEvents();
	setupKeyboardEvents();
	setupButtonEvents();
	Animation.initFrames(tiles);
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
		Animation.saveFrame(tiles);
	});
	$('#lightGrid').on('mousemove', function(event) {
		if (mouseDown) {
			doActionOnTile(event);
		}
	});
}

function doActionOnTile(event) {
	var pos = getMousePosition(event);
	checkHitsAndChangeColorIfTrue(pos.x, pos.y, colorPicker);
}

// Use for keyboard junk
function setupKeyboardEvents() {
	$('body').keydown(function(e) {
	});
	$('body').keyup(function(e) {
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