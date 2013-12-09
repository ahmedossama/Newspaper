google.load("feeds", "1");

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

$(document).ready(function (){
	var feed = new google.feeds.Feed("http://rss.cnn.com/rss/edition.rss");
	feed.setNumEntries(4);
	feed.load(function(result) {
		if (!result.error) {
		    var area = $(".container-123").find('div');
		    area.text('');
			for (var i = 0; i < result.feed.entries.length; i++) {
		        var entry = result.feed.entries[i];
		        var code = '<div><strong>' + entry.title + '</strong><p>' + entry.content + '</p></div>'
		        area.html(area.html() + code);
	    	}
		}
	});
});

