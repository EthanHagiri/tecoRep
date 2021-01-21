const { src, dest, watch, series } = require('gulp');

const scss         = require('gulp-sass');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const imagemin     = require('gulp-imagemin');
const del          = require('del');

function styles() {
    return src('app/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version']
        }))
        .pipe(dest('app/css'))
}

function cleanDist() {
    return del('dist')
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

function images() {
    return src('app/images/**/*')
        .pipe(imagemin(
            [
                imagemin.gifsicle({interlaced: true}),
                imagemin.mozjpeg({quality: 75, progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ]
        ))
        .pipe(dest('dist/images'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles);

}

exports.styles = styles;
exports.watching = watching;
exports.images = images;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, images, build);