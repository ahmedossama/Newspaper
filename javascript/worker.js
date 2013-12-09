importScripts('tinyxmldom.js');
importScripts('tinyxmlw3cdom.js');
importScripts('tinyxmlsax.js');

var article = 6;
var xmlObject;
self.onmessage = function (data) {
	
}

xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","news.xml",false);
	xmlhttp.setRequestHeader('Content-Type', 'text/xml');
	xmlhttp.addEventListener("load", function(){
		var parser = new DOMImplementation();
	  	xmlObject = parser.loadXML(xmlhttp.responseText).getDocumentElement();
		setTimeout("changeArticle()",1000);
	}, false);
	xmlhttp.send("");

function changeArticle(){
	var pane = Math.floor((Math.random()*5)+1); 
	var xmlArticle = xmlObject.getElementsByTagName("article").item(article);
	article += 1;
	if (article > 25) article = 0;
	var title = xmlArticle.getChildNodes().item(0).getFirstChild().getNodeValue();
	var author = xmlArticle.getChildNodes().item(1).getFirstChild().getNodeValue();
	var content = xmlArticle.getChildNodes().item(2).getFirstChild().getNodeValue();
	postMessage({
		'pane': pane,
		'title': title,
		'author': author,
		'content': content
	});
	setTimeout("changeArticle()",7000);
}


