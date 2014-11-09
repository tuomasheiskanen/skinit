var gulp 		= require('gulp'),
	less 		= require('gulp-less'),
	concat		= require('gulp-concat'),
	watch 		= require('gulp-watch'),
	app		 	= require('./app.js'),
	debug		= require('debug')('skinit'),
	lr 			= require('tiny-lr')(),
	path		= require('path');
	express 	= require('express');

var LIVERELOAD_PORT = 35729;

// Start express server and server livereload to clients
function startServer(){
	// app.use(require('connect-livereload')());

	app.set('port', process.env.PORT || 3000);

	var server = app.listen(app.get('port'), function() {
	  debug('Express server listening on port ' + server.address().port);
	});	
}

function startLivereload(){
	console.log('Starting livereload listener');
	lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(file){

	console.log('Notify livereload');
	// var fileName = path.relative('./public/stylesheets/', file);
	var fileName = './public/stylesheets/' + file;
	// var fileName = file;
	console.log(fileName);

	lr.changed({
		body: {
		  files: [fileName]
		}
	});	
}

var path = {
	less: {
		src:  './less/*.less',
		dest: './public/stylesheets',
		file: 'styles.css'
	}
};

gulp.task('less', function(){
	gulp.src(path.less.src)
	.pipe(less())
	.pipe(concat(path.less.file))
	.pipe(gulp.dest(path.less.dest));
	// .pipe(notifyLivereload(path.less.file));
	notifyLivereload(path.less.file);
});

gulp.task('watch', function(){
	gulp.watch(path.less.src, function(){
		gulp.start('less');
		// notifyLivereload(file);
	});
});

gulp.task('server', ['watch'], function(){
	startServer();
	startLivereload();
});

