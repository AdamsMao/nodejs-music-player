var fs = require('fs');
var path = require('path');
var file_read = require('./list_files');
var domain = require('domain');

module.exports = function (app) {
		app.get('/', function(req, res, next) {
				res.render('index');
		});

		app.get('/upload', function(req, res, next) {
				res.render('upload');
		});

		app.post('/file-upload', function(req, res, next) {
			//console.log(req.body);
			//get the temp path
			var d = domain.create();
			d.on('error', console.error);
			d.run(function() {
				var tmp_path = req.files.thumbnail.path;			
				//specific the upload to path
				var target_path = path.join('public', 'upload', req.files.thumbnail.name);
				var source = fs.createReadStream(tmp_path);
			 	var dest = fs.createWriteStream(target_path)
				source.pipe(dest);
				res.send('File uploaded to: ' + target_path + ' - ' + req.files.thumbnail.size + 'bytes' + '<br><br><a class="btn btn-primary" href="/upload" id="home" > Upload again </a>');
			});
		});

		app.get( '/get_files', file_read.get_lists );


}


