'use strict';

var gulp         = require('gulp');
var sass         = require('gulp-sass');
var livereload   = require('gulp-livereload');
var jade         = require('gulp-jade');
var autoprefixer = require('gulp-autoprefixer');
var gulpif       = require('gulp-if');

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
        .pipe(sass())
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
            gulp.dest(paths.src.stylesBase + '/base')
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
            gulp.dest(paths.src.stylesBase + '/base')
        ))
        .pipe(livereload());
});
