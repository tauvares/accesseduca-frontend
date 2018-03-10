var gulp = require('gulp'),
  minifycss = require('gulp-minify-css'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  uglify = require('gulp-uglify'),
  usemin = require('gulp-usemin'),
  imagemin = require('gulp-imagemin'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  cache = require('gulp-cache'),
  changed = require('gulp-changed'),
  rev = require('gulp-rev'),
  browserSync = require('browser-sync'),
  ngannotate = require('gulp-ng-annotate'),
  del = require('del');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('usemin', [], function() {
  return gulp.src('./app/**/*.html')
    .pipe(usemin({
      css: [minifycss(), rev()],
      js: [ngannotate(), uglify(), rev()]
    }))
    .pipe(gulp.dest('dist/'));
});


// Imagens
gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({
      message: 'Images task complete'
    }));
});

// Clean
gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('copyfonts', ['clean'], function() {
  gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
  gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('copyfrontend', function() {
  gulp.src('app/frontend/**')
    .pipe(gulp.dest('dist/frontend'));
  gulp.src('app/styles/**')
    .pipe(gulp.dest('dist/styles'));
  gulp.src('app/scripts/**')
    .pipe(gulp.dest('dist/scripts'));
});


// Watch
gulp.task('watch', ['browser-sync'], function() {
  //Antes da integração
  // Watch .js files
  //gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html}', ['usemin']);
  // Watch image files
  //gulp.watch('app/images/**/*', ['imagemin']);

  //Depois da integração
  // Watch .js files
  gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html,app/frontend/**/*.js,app/frontend/**/*.css}', ['usemin']);
  //Watch image files
  gulp.watch('{app/images/**/*,app/frontend/img/**/*}', ['imagemin']);

});

gulp.task('browser-sync', ['default'], function() {
  var files = [
    'app/**/*.html',
    'app/styles/**/*.css',
    'app/images/**/*.png',
    'app/scripts/**/*.js',
    //Arquivos da Interface
    'app/frontend/**/*.css',
    'app/frontend/**/*.png',
    'app/frontend/**/*.jpg',
    'app/frontend/**/*.js',
    //Fim de arquivos da interface
    'dist/**/*'
  ];
  browserSync.init(files, {
    port: 5000,
    server: {
      baseDir: "dist",
      index: "index.html"
    }
  });
  // Watch any files in dist/, reload on change
  gulp.watch(['dist/**']).on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'imagemin', 'copyfonts', 'copyfrontend');
});

gulp.task('cleanapi', function() {
  return del(['../accesseduca/client'], {
    force: true
  });
});

gulp.task('copyapi', ['cleanapi'], function() {
  return gulp.src('dist/**')
    .pipe(gulp.dest('../accesseduca/client'));
});
