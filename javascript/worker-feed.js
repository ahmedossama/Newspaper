self.onmessage = function(event) {
	for (var i = event.data.entries.length-1; i >= 0; i--) {
        var entry = event.data.entries[i];
        postMessage({
        	'title': entry.title,
        	'content': entry.content
        })
	}
}

