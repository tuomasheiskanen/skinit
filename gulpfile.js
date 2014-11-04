var gulp 	= require('gulp'),
	less 	= require('gulp-less'),
	concat	= require('gulp-concat');

var path = {
	less: {
		src:  './less/*.less',
		dest: './public/stylesheets'
	}
};

gulp.task('less', function(){
	console.log(path.less.src);
	gulp.src(path.less.src)
	.pipe(less())
	.pipe(concat('styles.css'))
	.pipe(gulp.dest(path.less.dest));
});