var Animation = {
	fps : 2
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
