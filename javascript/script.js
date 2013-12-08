$(document).ready(function (){
	$.ajax({
		url: 'http://rss.cnn.com/rss/edition.rss',
		success: function(data) {
					if (data.responseData.feed && data.responseData.feed.entries) {
				      $.each(data.responseData.feed.entries, function (i, e) {
				        console.log("------------------------");
				        console.log("title      : " + e.title);
				        console.log("author     : " + e.author);
				        console.log("description: " + e.description);
				      });
					}
				}
	});
})