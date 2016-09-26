const fs = require('fs');
const gulp = require('gulp');
const browserSync = require('browser-sync');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


// JavaScript
// =======================

const buildScripts = debug => {
  let b = browserify('./src/javascript/main.js', {
    debug,
    standalone: 'aarCarousel',
    cache: {},
    packageCache: {},
  });

  const bundle = () => b
    .bundle()
    .on('error', (err) => {
      console.log(err);
      this.emit('end');
    })
    .pipe(source('aarCarousel.min.js'))
    .pipe(buffer())
    .pipe($.size({title: 'scripts'}))
    .pipe(gulp.dest('dist'));

  b = b
    .transform('rollupify')
    .transform('babelify')
    .transform('uglifyify');

  return bundle();
};

gulp.task('scripts-debug', ['styles'], () => buildScripts(true));

gulp.task('scripts', ['inject-css'], () => buildScripts(false));


// JavaScript minification
// -----------------------


// JavaScript linting
// -----------------------

const lint = (files, options) => {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
};

gulp.task('lint', () => {
  return lint('src/javascript/**/*.js')
});


// Style
// =======================

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


// Style minification
// -----------------------

gulp.task('styles-minify', ['styles'], () => {
  return gulp.src('.tmp/stylesheets/main.css')
    .pipe($.cssnano())
    .pipe(gulp.dest('.tmp/stylesheets/'))
});



// Style linting
// -----------------------

gulp.task('sass-lint', () =>
  gulp.src('src/stylesheets/*.scss')
    .pipe($.sassLint({
      configFile: '.sass-lint.yml',
    }))
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
);

gulp.task('scss-lint', ['sass-lint'])


// Style injecting in JS
// -----------------------

gulp.task('inject-css', ['styles-minify'], () => {
  gulp.src('src/javascript/insert-css-dep.js')
    .pipe($.replace(/^const css ?= '[^']*';$/m, `const css = '${fs.readFileSync(__dirname + '/.tmp/stylesheets/main.css', 'utf8')}';`))
    .pipe(gulp.dest('src/javascript/'))
});


// Serving Demo
// =======================

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
    'dist/aarCarousel.min.js',
    '.tmp/stylesheets/main.css',
  ]).on('change', reload);

  gulp.watch('src/stylesheets/*.scss', ['styles']);
  gulp.watch('src/javascript/*.js', ['scripts']);
});


// Build dist js
// =======================

gulp.task('build-js', ['scripts'], () => {
  gulp.src('dist/aarCarousel.min.js')
    .pipe($.uglify())
    .pipe(gulp.dest('dist'))
});