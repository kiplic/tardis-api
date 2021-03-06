var gulp = require('gulp');

var exec = require('child_process').exec;

// gulp plugins
var jshint = require('gulp-jshint');
var ignore = require('gulp-ignore');
var nodeman = require('gulp-nodemon');

// lint task
gulp.task('lint', function () {
	return gulp.src(['./**/*.js', '!./node_modules/**'])
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
  		.pipe(jshint.reporter('fail'));
});

gulp.task('dev', function () {
	nodeman({ script: 'server.js', ext: 'html js' })
		.on('change', ['lint']);
});

gulp.task('startRedis', function() {
  exec('redis-server', function(err, stdout, stderr) {
    if (err) {
      console.log(err, stdout, stderr);
    }
  });
});

gulp.task('default', ['lint', 'dev', 'startRedis']);
