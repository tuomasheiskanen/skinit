var gulp 		= require('gulp'),
	less 		= require('gulp-less'),
	concat		= require('gulp-concat'),
	watch 		= require('gulp-watch'),
	app		 	= require('./app.js'),
	debug		= require('debug')('skinit'),
	path		= require('path'),
	express 	= require('express'),
	livereload 	= require('gulp-livereload');

var LIVERELOAD_PORT = 35729;

// Start express server and server livereload to clients
function startServer(){
	app.set('port', process.env.PORT || 3000);
	var server = app.listen(app.get('port'), function() {
	  debug('Express server listening on port ' + server.address().port);
	});	
}

var path = {
	less: {
		src:  './styles/*.less',
		dest: './public/stylesheets',
		file: 'styles.css'
	},
	js: {
		src: [
				'./bower_components/jquery/dist/jquery.js',
				'./javascript/*.js',
				'./javascript/*.json'
			],
		dest: './public/javascript'
	},
	jade: {
		src: './views/*.jade'
	},
	images: {
		src: './images/*.png',
		dest: './public/images'
	}
};

gulp.task('less', function(){
	gulp.src(path.less.src)
	.pipe(less())
	.pipe(concat(path.less.file))
	.pipe(gulp.dest(path.less.dest))
	.pipe(livereload());
});

gulp.task('watch', function(){
	// Monitor less 
	gulp.watch(path.less.src, function(){
		gulp.start('less');
	});

	// Monitor javascript
	gulp.watch(path.js.src, function(){
		gulp.src(path.js.src)
		.pipe(gulp.dest(path.js.dest))
		.pipe(livereload());
	});

	// Monitor jade files
	gulp.watch(path.jade.src, function(file){
		gulp.src(path.jade.src)
		.pipe(livereload());
	});

});

gulp.task('copyjs', function(){
	gulp.src(path.js.src)
	.pipe(gulp.dest(path.js.dest));
});

gulp.task('copy-images', function(){
	gulp.src(path.images.src)
	.pipe(gulp.dest(path.images.dest));
})

gulp.task('server', ['copyjs', 'copy-images', 'watch'], function(){
	startServer();
	livereload.listen();
});

