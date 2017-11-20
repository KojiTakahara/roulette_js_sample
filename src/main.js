$(function() {
	var rouletter = $('div.roulette');
	var startButton = $('#startButton');
	var stopButton = $('#stopButton');
	var initButton = $('#initButton');
	var addItem = function() {
		var members = $('.members_container ul li'), imgUrlList = [];
		for (var i = 0; i < members.length; i++) {
			$("<img />").attr("id", "members_" + i).appendTo(rouletter);
		}
		for (var i = 0; i < members.length; i++) {
			html2canvas(members[i], {
				onrendered: function(canvas) {
					imgUrlList.push(canvas.toDataURL("image/png"));
				}
			});
		}
		setTimeout(function() {
			for (var i = 0; i < imgUrlList.length; i++) {
				$("#members_" + i).attr("src", imgUrlList[i]);
			}
			initButton.attr("disabled", "true");
			startButton.removeAttr("disabled");
		}, 1000);
	}
	var initRoulette = function() {
		rouletter.roulette({
			speed : 8,
			duration : 8,
			startCallback : function() {
				startButton.attr("disabled", "true");
				stopButton.removeAttr("disabled");
			},
			slowDownCallback : function() {
				stopButton.attr("disabled", "true");
			},
			stopCallback : function($stopElm) {
				startButton.removeAttr("disabled");
			}
		});
	};
	startButton.click(function() {
		rouletter.roulette('start');
	});
	stopButton.click(function() {
		rouletter.roulette('stop');
	});
	initButton.click(function() {
		addItem();
		initRoulette();
	});
});
