const gulp = require('gulp-help')(require('gulp'));
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const template = require('gulp-template');
const {exec} = require('child_process');
const docker = require('./docker');

/**
 *Basic parameters
 */
const ENVIRONMENT = (argv.env || argv.e || 'dev').toLowerCase();

const attachProcessToOutput = function(process) {
    process.stdout.on("data", (data) => {
        console.log(data.toString());
    });
    process.stderr.on("data", (data) => {
        console.error(data.toString());
    });
};

gulp.task("build", "setup for given environment, options: -e (environment)", function (cb) {
    runSequence('compile-template', 'build-container' , cb);
});

gulp.task("setup", "setup for given environment, options: -e (environment)", function (cb) {
    runSequence('compile-template', cb);
});

gulp.task("compile-template", "Compile files under templates/master with given environment, options: -e (environment)", function (cb) {
    let environmentStringValues = require(`./build-resources/template/env/${ENVIRONMENT}/string.js`);
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

gulp.task("build-container", "Build containers from generated docker-compose.yml file", function (cb) {
    docker
        .compose({composeFile: "./gen/docker/docker-compose.yml", projectName: 'FJU-HEALTH'})
        .then(cb)
        .catch((error) => {
            console.error(error);
        })
    ;
});

gulp.task("update-db", "Update db schema using generated knex file", function(cb) {
    let process = exec(`npm run update-db`, cb);
    attachProcessToOutput(process);
});

gulp.task("rollback-db", "Rollback last db migration using generated knex file", function(cb) {
    let process = exec(`npm run rollback-db`, cb);
    attachProcessToOutput(process);
});


gulp.task('_recreate-db', "[Private] Drop and Recreate DB from knexfinal", async function() {
    const Knex = require('knex');
    const knexConfig = require('./gen/knex/knexfile').development;
    let knex = Knex(knexConfig);
    await knex.raw(`DROP SCHEMA public CASCADE;`);
    await knex.raw(`CREATE SCHEMA public;`);
    knex.destroy();
});

gulp.task("recreate-db", "Drop all tables in database and update them with knex", function(cb) {
    runSequence('compile-template', '_recreate-db', 'update-db', cb);
});

