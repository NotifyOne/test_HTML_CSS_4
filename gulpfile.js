var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
// var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', async function(){
	gulp.src('./assets/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.init())
		.pipe(cleanCSS())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./assets/css'));
});

gulp.task('sass:watch', function(){
	gulp.watch('./assets/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
	browserSync.init(["./assets/css/**/*.*", "./**/*.html"], {
		server: {
			baseDir: "."
		}
		// proxy: "site.localhost"
	})
});

gulp.task('watch', gulp.series('sass', gulp.parallel('browser-sync', 'sass:watch')));

gulp.task('default', gulp.series('watch'));