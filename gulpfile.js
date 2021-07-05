const argv = require('minimist')(process.argv.slice(2))

const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename')
const streamify = require('gulp-streamify')
const source = require('vinyl-source-stream')

const budo = require('budo')
const browserify = require('browserify')
const resetCSS = require('node-reset-scss').includePath
const babelify = require('babelify');
const regeneratorRuntime = require("regenerator-runtime");

babelify.configure({
  presets: ['@babel/preset-env',{
    targets: {
      browsers: ["last 2 chrome versions"],
    },
    useBuiltIns: "entry"
  }]
})


const outfile = 'bundle.js';

//our CSS pre-processor
gulp.task('sass', function() {
  gulp.src('./src/sass/main.scss')
    .pipe(sass({
      outputStyle: argv.production ? 'compressed' : undefined,
      includePaths: [ resetCSS ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./app/styles'))
})

//the development task
gulp.task('watch', ['sass'], function(cb) {
  //watch SASS
  gulp.watch('src/sass/*.scss', ['sass'])

  //dev server
  budo('build/main/index.js', {
    serve: 'scripts/bundle.js',     // end point for our <script> tag
    stream: process.stdout, // pretty-print requests
    live: true,
    cors: true,// live reload & CSS injection
    dir: 'app',             // directory to serve
    open: argv.open,        // whether to open the browser
    host: 'localhost',
    port: 3001,
    browserify: {
      transform: babelify,
      standalone: 'govcal-dashboard-module'
    }
  }).on('exit', cb)
})

//the distribution bundle task
gulp.task('bundle', ['sass'], function() {
  var bundler = browserify('build/main/index.js', {
      transform: babelify,
      standalone: 'govcal-dashboard-module'
  })
  .bundle()
  return bundler
    .pipe(source('index.js'))
    .pipe(streamify(uglify()))
    .pipe(rename(outfile))
    .pipe(gulp.dest('./app/scripts'))
})
