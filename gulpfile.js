// COMMON
const { src, dest, watch, parallel, series } = require('gulp');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const del = require('del');
//SERVER
const browserSync = require('browser-sync').create();
// HTML
const fileinclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');

//! MODE PRODUCTION START
function html() {
	return src('dev/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(dest('dist'))
}

function cleanDist() {
	return del('dist/**/*')
}

exports.html = html;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, html);

//! MODE DEVELOP STAR
function browsersyncDev() {
	browserSync.init({
			server: {
					baseDir: 'dev/'
			}
	});
}

function htmlDev() {
	return src('src/views/*.html')
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(dest('dev'))
}

function cleanDev() {
	return del('dev/**/*')
}

function watchDev() {
	watch(['src/components/*.html','src/views/*.html'], htmlDev);
	watch(['dev/index.html']).on('change', browserSync.reload);
}

exports.htmlDev = htmlDev;
exports.cleanDev = cleanDev;
exports.browsersyncDev = browsersyncDev;
exports.watchDev = watchDev;
exports.dev = parallel(cleanDev, htmlDev, browsersyncDev, watchDev);
/** *****************
 * TODO: IF THERE ARE PROBLEMS - npm cache clean --force
 * ******************
 */