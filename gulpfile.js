const gulp = require('gulp-help')(require('gulp'));
const runSequence = require('run-sequence');
const format = require('string-format');
const argv = require('yargs').argv;
const template = require('gulp-template');
const exec = require('gulp-exec');

format.extend(String.prototype, {});

/**
 *Basic parameters
 */
const ENVIRONMENT = (argv.env || argv.e || 'dev').toLowerCase();

gulp.task("setup", "setup for given environment, options: -e (environment)", function (cb) {
    runSequence('compile-template', cb);
});

gulp.task("compile-template", "Compile files under templates/master with given environment, options: -e (environment)", function (cb) {
    let environmentStringValues = require('./build-resources/template/env/{}/string.js'.format(ENVIRONMENT));
    let constantStringValues = require('./build-resources/template/env/constant.js');

    gulp.src('build-resources/template/master/**/*', {base: 'build-resources/template/master/'})
        .pipe(template(Object.assign(environmentStringValues, constantStringValues), {
            interpolate: /<%=([\s\S]+?)%>/g //Ignore ES6 syntax ${} replacement
        }))
        .pipe(gulp.dest('.'))
        .on('end', function () {
            cb();
        })
});


