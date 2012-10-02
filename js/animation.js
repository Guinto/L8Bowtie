var Animation = {
	fps : 2,
	totalFrames: 60,
	frame: 0,
	frameData: new Array(),
	playing: false,
	intervalID: null
};

Animation.draw = function() {
	Animation.setFrame(Animation.frame);
};
Animation.update = function() {
	Animation.frame++;
	if (Animation.frame >= Animation.totalFrames) {
		Animation.frame = 0;
	}
	Animation.updateFrameCounterAndSlider();
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

Animation.run2 = function() {
	Animation.update();
	Animation.draw();
}

Animation.setup = function() {
	$('#fps').val(Animation.fps);
	$('#fps').on('change', function() {
		Animation.fps = $(this).val();
	});
	
	$('#frameNumber').on('change', function() {
		$('#animationSlider').slider('value', $(this).val());
		Animation.setFrame($(this).val());
		Settings.clearRedo();
		Settings.clearUndo();
		Settings.saveForUndo();
	});
	
	$('#animationSlider').slider({
		value: 0,
		min: 0,
		max: Animation.totalFrames,
		slide: function(event, ui) {
			$("#frameNumber").val(ui.value);
			Animation.setFrame(ui.value);
			Settings.clearRedo();
			Settings.clearUndo();
			Settings.saveForUndo();
		}
	});

	$('#playBtn').on('click', function() {
		Animation.playOrPause();
	});
};

Animation.updateFrameCounterAndSlider = function() {
	$('#frameNumber').val(Animation.frame);
	$('#animationSlider').slider('value', Animation.frame);
}

Animation.playOrPause = function() {
	Animation.setPlayButton();
	Animation.animate();
	Animation.playing = !Animation.playing;
};

Animation.setPlayButton = function() {
	var $playBtn = $('#playBtn');
	if (Animation.playing) {
		$playBtn.removeClass("icon-pause");
		$playBtn.addClass("icon-play");
	} else {
		$playBtn.removeClass("icon-play");
		$playBtn.addClass("icon-pause");
	}
};

Animation.animate = function() {
	if (Animation.playing) {
		clearInterval(Animation.intervalID);
	} else {
		Animation.intervalID = setInterval(function() { Animation.run2() }, 1000 / Animation.fps);
	}
}

Animation.setFrame = function(index) {
	Animation.frame = index;
	Grid.tiles = Animation.frameData[index];
	Grid.draw();
}

Animation.initFrames = function(initData) {
	if (Animation.frameData.length !== 0) {
		return;
	}
	
	for (var i = 0; i < Animation.totalFrames; i++) {
		Animation.frameData.push($.extend({}, Grid.copy(initData)));
	}
}

Animation.saveFrame = function(data) {
	Animation.frameData[Animation.frame] = $.extend({}, data);
}