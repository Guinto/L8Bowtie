var Animation = {
	fps : 2,
	totalFrames: 60
};

Animation.draw = function() {
};
Animation.update = function() {
};

Animation.run = (function() {
	var loops = 0, skipTicks = 1000 / Animation.fps, maxFrameSkip = 10, nextAnimation = (new Date)
			.getTime();

	return function() {
		loops = 0;

		while ((new Date).getTime() > nextAnimation && loops < maxFrameSkip) {
			Animation.update();
			nextAnimation += 1000 / Animation.fps;
			loops++;
		}

		if (loops) {
			Animation.draw();
		}
	};
})();

Animation.setup = function () {
	$('#fps').val(Animation.fps);
	$('#fps').on('change', function() {
		Animation.fps = $(this).val();
	});
	
	$('#frameNumber').on('change', function() {
		$('#animationSlider').slider('value', $(this).val());
	});
	
	$('#animationSlider').slider({
		value: 1,
		min: 1,
		max: Animation.totalFrames,
		slide: function(event, ui) {
			$("#frameNumber").val(ui.value);
		}
	});
};