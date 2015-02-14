var Crawler = require('crawler');
var requestify = require('requestify');
var url = require('url');
var patterns = [];

var c = new Crawler({
	maxConnections : 10,
	callback : function (error, result, $) {
		try{
			if (chechPattern($, patterns)){
				console.log($);
			} else {
				var urls = $('a');
				urls.each(function(index, a) {
					var toQueueUrl = $(a).attr('href');
					c.queue(toQueueUrl);
				});
			}
		} catch (e){
			console.log(e);
		}
	}
});

function chechPattern($, _patterns){
	_patterns.forEach(function(pattern){
		if ($(pattern).length){
			console.log($(pattern)[0]);
			return true;
		} else {
			return false;
		};
	});
}

requestify.get('http://beta.rpgcloud.net:5000/api/getPatterns?domain=http://www.sotmarket.ru')
	.then(function(response) {
		patterns = response.getBody().patterns;
		c.queue('http://www.sotmarket.ru/');
	});