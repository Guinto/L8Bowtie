var colorPicker = "white";
var savedPalette = [];
var mouseDown = false;
var recentHistory = new Array();
var history = new Array();
var future = new Array();

function undo() {
	var temp = new Array();
	for (i in tiles) {
		temp.push($.extend({}, tiles[i]));
	}
	future.push(temp);
	var step = history.pop();
	for (i in step) {
		var tile = step[i];
		tile.draw();
	}
}

function redo() {
	var step = future.pop();
	history.push(step);
	for (i in step) {
		var tile = step[i];
		tile.draw();
	}
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
		doActionOnTile(event);
	});
	$('#lightGrid').on('mouseup', function() {
		mouseDown = false;
		history.push(recentHistory);
	});
	$('#lightGrid').on('mousemove', function(event) {
		if (mouseDown) {
			doActionOnTile(event);
		}
	});
}

function doActionOnTile(event) {
	var pos = getMousePosition(event);
	var hitTiles = checkHitsAndChangeColorIfTrue(pos.x, pos.y, colorPicker);
	if (hitTiles) {
		recentHistory.push(hitTiles);
	}
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