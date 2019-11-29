var fs = require('fs')
var del = require('del')
var gulp = require('gulp')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var rename = require('gulp-rename')
var nodeSass = require('node-sass')
var sassGlob = require('gulp-sass-glob')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var browserify = require('browserify')
var babelify = require('babelify')
var tap = require('gulp-tap')
var buffer = require('gulp-buffer')
var yargv = require('yargs').argv
var gulpif = require('gulp-if')
var livereload = require('gulp-livereload')
var wpPot = require('gulp-wp-pot')
var groupMQ = require('gulp-group-css-media-queries')
var cleanCSS = require('gulp-clean-css')

function compileSASS () {
  sass.compiler = nodeSass
  return (
    gulp
      .src('./*/scss/*.scss', { base: './' })
      .pipe(sassGlob())
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
      .pipe(autoprefixer({ cascade: false }))
      .pipe(
        rename(function (path) {
          path.dirname = path.dirname.replace('/scss', '/css')
        })
      )
      .pipe(groupMQ())
      .pipe(gulpif(!yargv.nouglify, cleanCSS({ compatibility: 'ie10' })))
      .pipe(gulp.dest('./'))
      .pipe(livereload())
  )
}

function compileJS () {
  return gulp
    .src(['./*/js/*/src/*.js', '!./*/js/*/src/*.js'], {
      read: false,
      base: './'
    })
    .pipe(
      tap(function (file) {
        file.contents = browserify(file.path, { debug: true })
          .transform(
            babelify.configure({
              presets: ['@babel/env', '@babel/react']
            })
          )
          .bundle()
      })
    )
    .pipe(buffer())
    .pipe(
      rename(path => {
        path.dirname += '/../'
      })
    )
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(gulpif(!yargv.nouglify, uglify()))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./'))
    .pipe(livereload())
}

function watchFiles () {
  livereload.listen({
    host: 'localhost',
    port: 35729,
    quiet: true
  })
  gulp.watch('./*/scss/**/*.scss', compileSASS)
  gulp.watch('./*/js/*/src/**/*.js', compileJS)
}

function makePot () {
  return gulp
    .src(['**/*.php', `!${getBuildDir()}/**`, ...getBuildIgnore()])
    .pipe(
      wpPot({
        domain: 'shortcodes-ultimate',
        package: 'Shortcodes Ultimate'
      })
    )
    .pipe(gulp.dest('./languages/shortcodes-ultimate.pot'))
}

function createBuild () {
  del.sync([getBuildDir()])

  return gulp
    .src(['./**/*', `!${getBuildDir()}/**`, ...getBuildIgnore()])
    .pipe(gulp.dest(getBuildDir()))
}

function createShortcodesFull () {
  sass.compiler = nodeSass

  return gulp
    .src('./includes/scss/shortcodes.scss')
    .pipe(sassGlob())
    .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename('shortcodes.full.css'))
    .pipe(gulp.dest('./includes/css/'))
}

function getBuildIgnore () {
  return fs
    .readFileSync('.buildignore', 'utf8')
    .split(/\r\n|\n|\r/)
    .filter(item => {
      if (item && item.indexOf('//') !== 0) {
        return '!' + item
      }
    })
    .map(item => '!' + item)
}

function getBuildDir () {
  return './build'
}

exports.sass = compileSASS
exports.js = compileJS
exports.watch = watchFiles
exports.compile = gulp.parallel(compileSASS, compileJS, createShortcodesFull)
exports.build = gulp.series(
  gulp.parallel(compileSASS, compileJS, createShortcodesFull),
  makePot,
  createBuild
)
