var fs = require('fs');
var util = require('util');
var path = require('path');

exports.get_lists = function (req, res) {
		var fd = path.join( __dirname,'public', 'upload');
		fs.readdir(fd, function(err, files) {
				// err Îª´íÎó
				if (err)	{ 
					console.log('error:\n' + err) 
					return;
				}
				res.send( files );
		});
}


