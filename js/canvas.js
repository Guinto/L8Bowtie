var Canvas = {
	canvas: null,
	ctx: null
};

Canvas.setup = function() {
	Canvas.canvas = document.getElementById("lightGrid");
	Canvas.ctx = Canvas.canvas.getContext("2d");
};

Canvas.clear = function() {
	if (Canvas.canvas == null) {
		Canvas.canvas = document.getElementById("lightGrid");
	}
	if (Canvas.ctx == null) {
		Canvas.ctx = Canvas.canvas.getContext("2d");
	}
	
	// Store the current transformation matrix
	Canvas.ctx.save();

	// Use the identity matrix while clearing the canvas
	Canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
	Canvas.ctx.clearRect(0, 0, Canvas.canvas.width, Canvas.canvas.height);

	// Restore the transform
	Canvas.ctx.restore();
};