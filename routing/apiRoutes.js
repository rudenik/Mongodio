var path = require("path");
// var mongoose = require("mongoose");
var cheerio = require("cheerio");
// var axios = require("axios");
var request = require("request");

var db = require("../models");

module.exports = function(app) {
	app.get("/getArts", function(req, res) {
        var results = [];
		request("http://www.gizmodo.com", function(error, response, html) {
			var $ = cheerio.load(html);
			$("h1.headline").each(function(i, element) {
				var link = $(element)
					.children()
					.attr("href");
				var title = $(element)
                    .children()
                    .text();
				var photo = $(element)
                    .parent()
                    .siblings('.item__content').children('.asset.main-media').
                    children('a').children('.img-wrapper').children('picture').children('source').first().attr('data-srcset')
				var excerpt = $(element)
                    .parent()
                    .siblings('.item__content')
					.text();
				if(!photo){
					var tdNum = Math.floor(Math.random() * 3) + 1;
					photo = `/assets/images/td${tdNum}.jpg`;
				}
				results.push({
					title: title, 
					link: link,
					photo: photo,
					dateCreated: Date.now(),
					excerpt: excerpt
                });
				var newArt = new db.Article({
					title: title,
					link: link,
					photo: photo,
					dateCreated: Date.now(),
					excerpt: excerpt
				});
				newArt.save(function(err, Article){
					if(err){
						console.log(err)
					}
					console.log(Article);
				})	
		});
			res.json(results.reverse());
	});
    })

	app.get("/queryArts", function(req, res) {
		db.Article.find({})
			.populate("comments")
			.sort({dateCreated: 'descending'})
			.then(function(results) {
				res.json(results);
			})
			.catch(function(err) {
				console.log(err);
				res.json(err);
			});
	});
	app.get("/delete/:id", function(req, res){
		console.log(req.params["id"]);
		db.Article.findByIdAndRemove({ _id : req.params["id"] })
		.then(function(result){
			console.log(result);
			res.redirect("/");
		})
		.catch(function(err){
			console.log(err);
			res.json(err);
		})
		
		
	})
	app.get("/comments/:id", function(req, res){
		db.Article.findById({ _id : req.params["id"] })
		.populate("comments")
		.then(function(result){
			res.json(result);
		})
		.catch(function(err){
			console.log(err);
			res.json(err);
		})
	})
	app.post("/addcomment/", function(req, res){
		console.log(req.body.body);
		console.log(req.body.id);
		db.Comment.create({"body": req.body.body}).then(function(dbComment){
			return db.Article.findOneAndUpdate({_id: req.body.id}, {$push: {comments:dbComment._id}},{new: true})
		}).then(function(dbArticle){
				console.log("dbArticle: " + dbArticle.comments[dbArticle.comments.length - 1]);
				db.Comment.findById(dbArticle.comments[dbArticle.comments.length - 1]).then(function(returnedComment){
					res.json(returnedComment);
				}).catch(function(err){
					res.json(err);
					console.log(err);
				})
		}).catch(function(err){
			res.json(err);
		})
	})
	app.delete("/deleteComment/:id", function(req, res){
		console.log("delete comment endbpoint hit");
		db.Comment.findByIdAndRemove({ _id : req.params["id"] })
		.then(function(result){
			console.log(result);
			res.json("deleted the Comment: " + result.body);
		})
	})
};

