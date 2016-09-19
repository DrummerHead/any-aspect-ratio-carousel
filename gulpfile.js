const gulp = require('gulp');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

const buildScripts = debug => {
  let b = browserify('./src/javascript/main.js', {
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

  b = b
    .transform('rollupify')
    .transform('brfs-babel')
    .transform('babelify')
    .transform('uglifyify');

  return bundle();
};

gulp.task('scripts-debug', ['styles'], () => buildScripts(true));

gulp.task('scripts', ['styles'], () => buildScripts(false));

gulp.task('styles', () => {
  return gulp.src('src/stylesheets/*.scss')
    .pipe($.plumber())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.'],
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
    .pipe(gulp.dest('.tmp/stylesheets'))
});

gulp.task('serve', ['scripts-debug'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'demo',
      routes: {
        '/dist': 'dist',
        '/tmp': '.tmp',
      }
    },
  });

  gulp.watch([
    'demo/*.*',
    'dist/main.js',
    '.tmp/stylesheets/main.css',
  ]).on('change', reload);

  gulp.watch('src/stylesheets/*.scss', ['styles']);
  gulp.watch('src/javascript/*.js', ['scripts']);
});