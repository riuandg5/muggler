var express = require("express");
var key     = require('./config/config.json');
var muggler = require("../server.js")({
	email: key.client_email,
	key: key.private_key
});
var app     = express();

app.get("/", function(req, res){
	muggler.listAll({infolder: "root"}, function(err, resp){
		if(err){
			console.log(err);
		}
		console.log(resp);
		res.render("index.ejs", {files: resp.mug});
	})
})

app.post("/", function(req, res){
	muggler.upOne({fromfield: "fup", infolder: "root"}, req, function(err, resp){
		if(err){
			console.log(err);
		}
		res.send(resp);
	})
})

app.post("/delete/:fileid", function(req, res){
	muggler.delOne({fileid: req.params.fileid}, function(err, resp){
		if(err){
			console.log(err);
		}
		console.log(resp);
		res.redirect("/");
	})
})

app.listen(3000, function(){
    console.log("Muggler test server started at http://localhost:3000");
})	