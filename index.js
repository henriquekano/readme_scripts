

var $;
var request = require("request");

function formatParametros(jqueryElement, method){
	var jqueryElementArray = jqueryElement.find("tbody > tr");
	var paramsArray = [];
	jqueryElementArray.each(function(){
		var newParam = {}; 
		newParam._edit = false,
		newParam._editFocus = false,
		newParam.name = $(this).find("[style='text-align: right'] strong").text();
		newParam.desc = $(this).find("[style='text-align: left']").text();
		newParam.type = "string";
		if(method.toLowerCase() === "get"){
			newParam.in = "query";
		}else{
			newParam.in = "body";
		}
		
		newParam._editFocusDesc = false
		newParam.required =  $(this).find(".required").length > 0;

		paramsArray.push(newParam);
	});

	return paramsArray;
}

function formatExamples(jqueryElement){
	var jqueryExamples = jqueryElement.find(".shell,.ruby,.php,.csharp");
	var examples = [];
	jqueryExamples.each(()=>{
		var newCode = {};
		newCode.code = this.text();
		newCode.language = "";
		examples.push(newCode);
	});

	return examples;
}

function formatToReadmeio(jqueryElement){
	var titulo = jqueryElement.find("h2").text();
	var resposta = jqueryElement.find("pre.json").text();
	var urlAndType = $(jqueryElement.find("blockquote p")[0]).text();
	var url = urlAndType.match(/https\:\/\/api\.pagar\.me\/1.*/).replace("https://api.pagar.me/1", "");
	var type = urlAndType.match(/^[A-Z]+/);
	var excerpt = jqueryElement.find("p").text();
	var params = formatParametros(jqueryElement, type);
	var codes = formatExamples(jqueryElement);

	var docPage = {
		"isReference": true,
		"api": {
			"try": true,
			"settings": "",
			"results": {
				"codes": [
					{
						"name": "",
						"code": resposta,
						"language": "json",
						"status": 200
					}
				]
			},
			"params": params,
			"examples": {
				"codes": codes
			},
			"url": url
		},
		"type": type,
		"body": "",
		"title": titulo,
		"excerpt": excerpt
	}
}
console.log("dsfsdfd");
require("jsdom").env('https://henriquekano.github.io/', function(err, window) {
 
    $ = require("jquery")(window);
    debugger;
	var routes = $("yay");

	var formatted = formatToReadmeio($(routes[1]));

});

// function outerHtml(jqueryElement){
// 	return jqueryElement.clone().wrap('<div>').parent().html();
// }

// $("h2").each(function(){
// 	 var el = $(this);
// 	 var group = "<yay>" + outerHtml(el);
// 	 var sibl = $(el.next());
// 	 while(!sibl.is("h1") && !sibl.is("h2")){
// 		group += outerHtml(sibl);
// 		sibl = $(sibl.next());
// 	}
// 	group += "</yay>";
// 	console.log(group);
// })

