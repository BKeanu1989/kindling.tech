var gulp = require('gulp')
var notify = require('gulp-notify')
var rename = require('gulp-rename')
var rsync = require('gulp-rsync')
var browserSync = require('browser-sync').create()
var stylus = require('gulp-stylus')
var htmlmin = require('gulp-htmlmin')
var pump = require('pump')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var headerfooter = require('gulp-headerfooter')
var sass = require('gulp-sass')
var image = require('gulp-image');

// ----------------------------------------------------------------
// ADD HEADER & FOOTER
// ----------------------------------------------------------------
gulp.task('headerfooter', function() {
  gulp.src(['./src/**/*.html', '!./src/partials/**/*.html'])
    .pipe(headerfooter.header('./src/partials/header.html'))
    .pipe(headerfooter.footer('./src/partials/footer.html'))
    .pipe(gulp.dest('./build/'))
})

// ----------------------------------------------------------------
// DEPLOY TO SERVER
// ----------------------------------------------------------------
gulp.task('deploy', function() {
  gulp.src('build/**')
    .pipe(rsync({
        root: 'build',
        hostname: 'ssh.iamthanh.com',
        username: 'iamthanh.com',
        progress: true,
        destination: '/www/bornheim2'
      })
      .pipe(notify({
        message: 'Deployed!'
      }))
    )
})

// ----------------------------------------------------------------
// IMAGE STUFF
// ----------------------------------------------------------------

gulp.task('image', function() {
  return gulp.src('./src/img/**/*.{png,gif,jpg,svg}').pipe(image({
    pngquant: false,
    optipng: false,
    zopflipng: false,
    jpegRecompress: false,
    jpegoptim: false,
    mozjpeg: false,
    gifsicle: false,
    svgo: false,
    concurrent: 10
  })).pipe(gulp.dest('./build/img')).pipe(browserSync.stream());
});

gulp.task('minimage', function() {
  return gulp.src('./src/img/**/*.{png,gif,jpg,svg}').pipe(image()).pipe(gulp.dest('./build/img'));
});

// ----------------------------------------------------------------
// STYLUS
// ----------------------------------------------------------------
gulp.task('stylus', function() {
  return gulp.src('./src/stylus/**/*.styl')
    .pipe(stylus())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// SASS
// ----------------------------------------------------------------
gulp.task('sass', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// CSS
// ----------------------------------------------------------------
gulp.task('css', function() {
  return gulp.src('./src/css/*.css')
    // .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// HTML
// ----------------------------------------------------------------
gulp.task('html', function() {
  return gulp.src(['src/**/*.html', '!src/partials/**/*.html'])
    .pipe(headerfooter.header('src/partials/header.html'))
    .pipe(headerfooter.footer('src/partials/footer.html'))
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('build'))
    .pipe(browserSync.stream())
})

// ----------------------------------------------------------------
// JAVASCRIPT
// ----------------------------------------------------------------
gulp.task('js', function(cb) {
  pump([
      gulp.src('src/js/*.js'),
      concat('bundle.min.js'),
      // uglify(),
      gulp.dest('build/js'),
      browserSync.stream()
    ],
    cb
  )
})

// ----------------------------------------------------------------
// BROWSER-SYNC (STATIC SERVER)
// ----------------------------------------------------------------
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
    // proxy: {
    //  host: 'dev/',
    //  port: '80'
    // }
  })
  gulp.watch('src/**/*', ['html', 'sass', 'js', 'css'])
  // gulp.watch('src/**/*.html', ['html'])
  // gulp.watch('src/stylus/**/*.styl', ['stylus'])
  // gulp.watch('src/js/**/*.js', ['js'])
  // gulp.watch('src/css/**/*.css', ['css'])
    // gulp.watch('src/sass/**/*.scss', ['sass'])
})

// ----------------------------------------------------------------
// SET DEFAULT TASK
// ----------------------------------------------------------------
gulp.task('default', ['browser-sync'], function() {})
gulp.task('build', ['html', 'sass', 'js', 'css', 'image' ], function() {})
