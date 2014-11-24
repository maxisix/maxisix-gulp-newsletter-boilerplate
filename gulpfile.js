/*******************************************************************************
DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp'),
	uncss = require('gulp-uncss');
	inlineCss = require('gulp-inline-css'),
	imagemin = require('gulp-imagemin'),
	notify = require('gulp-notify');





/*******************************************************************************
FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/

var target = {
    html_src : './*.html',                  			// all html files
    html_dest : './build',                          	// where to put minified html
	img_src : './images/**/*',				   			// all img files
	img_dest : './build/images',						// where to put minified img
	css_src : './css/*.css',							// all css files
	css_dest : './build/css/'							// where to put uncss files
};





/*******************************************************************************
UNCSS TASK
*******************************************************************************/

gulp.task('unCss', function() {
	return gulp.src(target.css_src)
        .pipe(uncss({
            html: ['index.html']
        }))
        .pipe(gulp.dest(target.css_dest))
        .pipe(notify("UNCSS task completed"));
});





/*******************************************************************************
INLINE CSS TASK
*******************************************************************************/

gulp.task('inlineCss', function() {
	return gulp.src(target.html_src)
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: false,
                removeLinkTags: true
        }))
        .pipe(gulp.dest(target.html_dest))
        .pipe(notify("Inline-CSS task completed"));
});





/*******************************************************************************
IMAGES MIN TASK
*******************************************************************************/

gulp.task('imageMin', function() {
	return gulp.src(target.img_src)
			.pipe(imagemin())
			.pipe(gulp.dest(target.img_dest))
			.pipe(notify("Images minify task completed"));
});







/*******************************************************************************
DEFAULT TASK
*******************************************************************************/

gulp.task('default', ['unCss', 'inlineCss', 'imageMin'], function() {
	
});





/*******************************************************************************
WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {
	gulp.watch('./*.html', ['inlineCss']);
});