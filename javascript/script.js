$(document).ready(function(){
	var worker = new Worker("../javascript/worker.js");

	worker.onmessage = function(event) {
		changeNews(event.data['pane'], event.data['title'], event.data['author'], event.data['content']);
	}

	function changeNews(pane, title, author, content){
		$('#title'+pane).fadeOut(2000, function() {
			$('#title'+pane).text(title);
			$('#title'+pane).fadeIn(2000);
		});
		$('#author'+pane).fadeOut(2000, function() {
			$('#author'+pane).text(author);
			$('#author'+pane).fadeIn(2000);
		});
		$('#content'+pane).fadeOut(2000, function() {
			$('#content'+pane).text(content);
			$('#content'+pane).fadeIn(2000);
		});
	}
});

var bgContext;
var video;
var context;

$(document).ready(function(){
	context = document.getElementById('screen').getContext('2d');
	video = document.getElementById('video');
	var bgCanvas = document.createElement('canvas');
	bgContext = bgCanvas.getContext('2d');
	bgCanvas.width = 700;
	bgCanvas.height = 400;

	video.addEventListener('play', function() {
    	setInterval(makeItGrey, 33);
	}, false);
	video.play();
});

function makeItGrey() {
    bgContext.drawImage(video, 0,100, 1260, 400, 0, 64,700,400);
    var pixelData = bgContext.getImageData(0, 0, 700, 400);
    for (var i = 0; i < pixelData.data.length; i += 4 ) {
        var r = pixelData.data[i];
        var g = pixelData.data[i+1];
        var b = pixelData.data[i+2];
        var averageColour = (r + g + b) / 3;
        pixelData.data[i] = averageColour;
        pixelData.data[i+1] = averageColour;
        pixelData.data[i+2] = averageColour;
    }
    context.putImageData(pixelData, 0,0);
}

google.load("feeds", "1");
var feedWorker;
var feedArea;
$(document).ready(function (){
	feedWorker = new Worker('../javascript/worker-feed.js');
	feedArea = $(".container-123").find('div');
	var feed = new google.feeds.Feed("http://rss.cnn.com/rss/edition.rss");
	feed.setNumEntries(4);
	feed.load(function(result) {
		if (!result.error) {
			feedWorker.postMessage(result.feed);
		}
	});
	feedWorker.onmessage = function (event) {
		var news = $('<div style="display:none;"><strong>' + event.data['title'] +
		 '</strong><p>' + event.data['content'] + '</p></div>');
        feedArea.prepend(news);
        news.fadeIn(2000);
	}
});

