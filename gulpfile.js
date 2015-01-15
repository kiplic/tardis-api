var gulp = require('gulp');

// gulp plugins
var jshint = require('gulp-jshint');
var ignore = require('gulp-ignore');
var nodeman = require('gulp-nodemon');

// lint task
gulp.task('lint', function () {
	return gulp.src(['./**/*.js', '!./node_modules/**'])
		.pipe(jshint())
});

gulp.task('dev', function () {
	nodeman({ script: 'server.js', ext: 'html js' })
		.on('change', ['lint'])
});

gulp.task('default', ['lint', 'dev']);
