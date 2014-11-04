var gulp 	= require('gulp'),
	less 	= require('gulp-less'),
	concat	= require('gulp-concat'),
	watch 	= require('gulp-watch');

var path = {
	less: {
		src:  './less/*.less',
		dest: './public/stylesheets'
	}
};

gulp.task('less', function(){
	gulp.src(path.less.src)
	.pipe(less())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest(path.less.dest));
});

gulp.task('watch', function(){
	gulp.watch(path.less.src, function(){
		gulp.start('less');
	});
});