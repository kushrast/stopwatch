function currentTime() {
	var currTimeMs = Date.now();
	differenceMs = currTimeMs - startTimeMs;
	var totalTimeMs = differenceMs + previousTimeMs;

	var hours = Math.floor((totalTimeMs) / (60*60*1000));
	var minutes = Math.floor((totalTimeMs % (60*60*1000)) / (60*1000));
	var seconds = Math.floor((totalTimeMs % (60*1000)) / (1000));
	var decaseconds = Math.floor((totalTimeMs % (1000)) / (10));

	hour = updateTime(hours);
	min = updateTime(minutes);
	sec = updateTime(seconds);
	dSec = updateTime(decaseconds);
	document.getElementById("clock-main").innerText = hour + ":" + min + ":" + sec; /* adding time to the div */
	document.getElementById("clock-ms").innerText = dSec;

	document.getElementById("clock-h").innerText = hour + "h";
	document.getElementById("clock-m").innerText = min + "m";
	document.getElementById("clock-s").innerText = sec + "s";
}

function updateTime(k) {
  if (k < 10) {
    return "0" + k;
  }
  else {
    return k;
  }
}

var startTimeMs = null;
var previousTimeMs = 0;
var differenceMs = 0;

var playing = false;
var currTimeInterval = null;

function toggleTimer() {
	if (!playing) {
		startTimeMs = Date.now();
		currTimeInterval = setInterval(currentTime, 10);
		$(".toggle").html("Stop");
	} else {
		clearInterval(currTimeInterval);
		previousTimeMs += differenceMs;
		differenceMs = 0;
		startTimeMs = Date.now();
		currentTime();
		$(".toggle").html("Start");
	}
	playing = !playing;
}

function resetTimer() {
	differenceMs = 0;
	previousTimeMs = 0;
	startTimeMs = Date.now();
	currentTime();
}

$(document).on('click', '.toggle', toggleTimer);
$(document).on('click', '.reset', resetTimer);
