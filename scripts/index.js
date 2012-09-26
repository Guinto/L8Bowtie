var colorPicker = "white";
var savedPalette = [];
var mouseDown = false;

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

function setupMouseEvents() {
	$('#lightGrid').on('mousedown', function(event) {
		mouseDown = true;
		var pos = getMousePosition(event);
		checkHitsAndChangeColorIfTrue(pos.x, pos.y, colorPicker);
	});
	$('#lightGrid').on('mouseup', function() {
		mouseDown = false;
	});
	$('#lightGrid').on('mousemove', function(event) {
		if (mouseDown) {
			var pos = getMousePosition(event);
			checkHitsAndChangeColorIfTrue(pos.x, pos.y, colorPicker);
		}
	});
}

function setupKeyboardEvents() {
	$('body').keydown(function(e) {
		console.log(e.which);
	});
	$('body').keyup(function(e) {
		console.log(e.which);
	});

}