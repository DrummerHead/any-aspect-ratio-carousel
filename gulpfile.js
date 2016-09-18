const gulp = require('gulp');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const buildScripts = debug => {
  let b = browserify('./src/main.js', {
    debug,
    standalone: 'aar-carousel',
    cache: {},
    packageCache: {},
  });

  const bundle = () => b
    .bundle()
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe($.size({title: 'scripts'}))
    .pipe(gulp.dest('dist'));

  if (debug) {
    b = b
      .transform('rollupify')
      .transform('brfs-babel')
      .transform('babelify')
      .plugin('watchify')
      .on('update', bundle);
  } else {
    b = b
      .transform('rollupify')
      .transform('brfs-babel')
      .transform('babelify')
      .transform('uglifyify');
  }

  return bundle();
};

gulp.task('scripts-debug', () => buildScripts(true));

gulp.task('scripts', () => buildScripts(false));

gulp.task('serve', ['scripts-debug'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'demo',
      routes: {
        '/dist': 'dist'
      }
    },
  });

  gulp.watch(['demo/*.*'], reload);
  gulp.watch(['dist/*.js'], reload);
})