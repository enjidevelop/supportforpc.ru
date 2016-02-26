'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var livereload   = require('gulp-livereload');
var jade         = require('gulp-jade');
var jadeInh      = require('gulp-jade-inheritance');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');
var changed      = require('gulp-changed');
var plumber      = require('gulp-plumber');
var uglify       = require('gulp-uglify');
var spritesmith  = require('gulp.spritesmith');
var notify       = require('gulp-notify');
var prettify     = require('gulp-prettify');
var typograf     = require('gulp-typograf');

var onError = notify.onError('Ошибка в <%= error.plugin %>');

var paths = {};

// dist paths
paths.distBase         = 'dist';
paths.dist             = {};
paths.dist.scriptsBase = paths.distBase + '/scripts';
paths.dist.scripts     = paths.dist.scriptsBase + '/**/*.js';
paths.dist.stylesBase  = paths.distBase + '/styles';
paths.dist.styles      = paths.dist.stylesBase + '/**/*.scss';
paths.dist.jadeBase    = paths.distBase + '/jade';
paths.dist.jade        = paths.dist.jadeBase + '/**/*.jade';
paths.dist.sprites     = paths.distBase + '/sprites/1x/*.png';
paths.dist.sprites2x   = paths.distBase + '/sprites/2x/*.png';

//build paths
paths.buildBase     = 'www';
paths.build         = {};
paths.build.scripts = paths.buildBase + '/scripts';
paths.build.styles  = paths.buildBase + '/styles';
paths.build.jade    = paths.buildBase + '/html';

paths.html = paths.buildBase + '/**/*.html';


var buildCss = function() {
    return gulp.src(paths.dist.styles)
        .pipe(sass({outputStyle: 'compressed'}))
        .on('error', notify.onError({
            message : 'Line: <%= error.lineNumber %>:' +
            ' <%= error.message %>' +
            '\n<%= error.fileName %>',
            title   : '<%= error.plugin %>'
        }))
        .on('error', function() {
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.build.styles))
        .pipe(livereload());
};

// Main build task
gulp.task('build', [
    'styles',
    'js-uglify',
    'jade'
]);

gulp.task('sprites', function() {
    return gulp.src(paths.dist.sprites)
        .pipe(spritesmith({
            imgName     : 'sprites.png',
            cssName     : '_sprites.scss',
            imgPath     : '/img/sprites.png',
            padding     : 1,
            cssTemplate : 'sprites.handlebars'
        }))
        .pipe(gulpif(
            '*.png',
            gulp.dest(paths.buildBase + '/img'),
            gulp.dest(paths.dist.stylesBase + '/base')
        ))
        .pipe(livereload());
});

gulp.task('sprites2x', function() {
    return gulp.src(paths.dist.sprites2x)
        .pipe(spritesmith({
            imgName     : 'sprites@2x.png',
            imgPath     : '/img/sprites@2x.png',
            cssName     : '_sprites@2x.scss',
            padding     : 2,
            cssTemplate : 'sprites@2x.handlebars'
        }))
        .pipe(gulpif(
            '*.png',
            gulp.dest(paths.buildBase + '/img'),
            gulp.dest(paths.dist.stylesBase + '/base')
        ))
        .pipe(livereload());
});

gulp.task('styles', ['sprites', 'sprites2x'], function() {
    return buildCss();
});

gulp.task('css', function() {
    return buildCss();
});

gulp.task('js-uglify', function jsTask() {
    return gulp.src(paths.dist.scripts, {
        base: paths.dist.scriptsBase
    })
        .pipe(changed(paths.build.scripts))
        .pipe(plumber({
            errorHandler: notify.onError({
                message : 'Line: <%= error.lineNumber %>:' +
                ' <%= error.message %>' +
                '\n<%= error.fileName %>',
                title   : '<%= error.plugin %>'
            })
        }))
        .pipe(uglify({
            outSourceMap: false
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.build.scripts))
        .pipe(livereload());
});

gulp.task('jade', function() {
    return gulp.src(paths.dist.jade)
        .pipe(changed(paths.build.jade, {extension: '.html'}))
        .pipe(jadeInh({basedir: paths.dist.jadeBase}))
        .pipe(jade({
            pretty: true
        }))
        .pipe(typograf({
            lang: 'ru',
            disable: ['ru/nbsp/centuries', 'common/number/fraction']
        }))
        .on('error', notify.onError({
            message : 'Failed to compile html',
            title   : 'Jade'
        }))
        .on('error', function() {
            this.emit('end');
        })
        .pipe(prettify({
            indent_size: 4
        }))
        .pipe(gulp.dest(paths.build.jade));
});

/**
 * Watch task
 */
gulp.task('watch', ['build'], function watch() {
    livereload.listen(function(err) {
        if (err) {
            return console.log('Livereload start failed');
        }

        gulp.watch(paths.dist.sprites, ['sprites']);
        gulp.watch(paths.dist.sprites2x, ['sprites2x']);
        gulp.watch(paths.dist.styles,  ['css']);
        gulp.watch(paths.dist.scripts, ['js-uglify']);
        gulp.watch(paths.dist.jade,    ['jade']);

        gulp.watch(paths.html).on('change', function(file) {
            livereload.changed(file.path);
        });
    });
});

// Run
gulp.task('default', ['build']);

