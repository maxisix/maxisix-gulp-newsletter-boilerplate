/*******************************************************************************
DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp'),
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
	img_dest : './build/images'							// where to put minified img
};





/*******************************************************************************
INLINE CSS TASK
*******************************************************************************/

gulp.task('inlineCss', function() {
	return gulp.src(target.html_src)
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
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

gulp.task('default', ['inlineCss', 'imageMin'], function() {
	
});





/*******************************************************************************
WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {
	gulp.watch('./*.html', ['inlineCss']);
});