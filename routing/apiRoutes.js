var path = require("path");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");
var request = require("request");

var db = require("../models");

module.exports = function(app) {
	app.get("/getArts", function(req, res) {
        var results = [];
		request("http://www.gizmodo.com", function(error, response, html) {
			var $ = cheerio.load(html);
			// var photo = $('.img-wrapper').each(function(i, element){
            //     console.log($(element).children().attr('src'));
            // })
			$("h1.headline").each(function(i, element) {
                //shit is broken can't scrape what im looking for. 
                //try $('article') and then the appropriate childeren from there
                // $("article").each(function(i, element) {
				var link = $(element)
					.children()//.children('.headline')
					.attr("href");
				var title = $(element)
                    .children()
                    .text();
				var photo = $(element)
                    .parent()
                    .siblings('.item__content').children('.asset.main-media').
                    children('a').children('.img-wrapper').children('picture')//.first().children('img')
                    .html();
				var excerpt = $(element)
                    .parent()
                    .siblings('.item__content')
                    .text();
                var savedResp;
                // photo = JSON.stringify(photo);
                var photoUrl;
                if(photo){
                     photoUrl = photo.substring(photo.lastIndexOf('https://'+1), photo.lastIndexOf('png">'));
                    //  console.log(`photo src: ${photoUrl}png`)
                     photoUrl = photoUrl.substring(photoUrl.lastIndexOf("https://"), photoUrl.length);
                     console.log("photoUrl: " + photoUrl);
                }
                // photoUrl = photo.substring(photo.lastIndexOf('='+1), photo.lastIndexOf('png">'));
				results.push({
					title: title, 
					link: link,
					photo: photo,
					excerpt: excerpt
                });
                // console.log(`photo src: ${photoUrl}`)
                // console.log(`${link}, photo src: ${JSON.stringify(photo)}`)
				// db.Article.save({
				// 	title: title,
				// 	link: link,
				// 	photo: photo,
				// 	excerpt: excerpt
				// })
				// 	.then(function(results) {
				// 		console.log(results);
				// 		savedResp = results;
				// 	})
				// 	.catch(function(err) {
				// 		if (err) {
				// 			console.log(err);
				// 		}
				// 	});
				
            // });
            
        });
        
    });
    res.json(
        `pulled ${results.length} articles, response from db `
    );
    })

	app.get("/queryArts", function(req, res) {
		db.Article.find({})
			.then(function(results) {
				res.json(results);
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
			});
	});
};
