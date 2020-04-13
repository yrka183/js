let gulp = require('gulp'),
    gulpImageMin = require('gulp-imagemin'),
    babel = require("gulp-babel"),
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    pug = require('gulp-pug'),
    pugbem = require("gulp-pugbem"),
    pugLinter= require('gulp-pug-linter'),
    plumber = require('gulp-plumber'),
    pngquant = require('imagemin-pngquant'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    spritesmith = require('gulp.spritesmith');


gulp.task('clean', async function(){
  del.sync('dist');
})

gulp.task('scss', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 8 versions']
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
  ])
    .pipe(plumber())
    .pipe(concat('_libs.scss'))
    .pipe(plumber.stop())
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('html', function(){
  return gulp.src('app/*.html')
  .pipe(plumber())
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('pug', function(){
  return gulp.src('app/**/*.pug')
      // .pipe(del())
       .pipe(plumber()) 
        .pipe(pug({pretty: '\t',
              plugins: [pugbem]}))
        .pipe(gulp.dest('./app'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('image', function() {
   return gulp.src("app/img/**.*")
        .pipe(gulpImageMin(
            {
          interlaced: true,
          progressive: true,
          optimizationLevel: 5,
          svgoPlugins: [
              {
                  removeViewBox: true
              }
          ],
          use: [pngquant()]
      })
        .pipe(browserSync.reload({stream:true}))
        
)});


gulp.task('sprite', function () {
  let spriteData = gulp.src('app/sprite/*.png').pipe(spritesmith({
      imgName: '../img/sprite.png',
      cssName: 'sprite.scss'
  }));
  let imgStream = spriteData.img
      .pipe(gulp.dest('app/img/'));
  let cssStream = spriteData.css
      .pipe(gulp.dest('app/sprite/'));
  return merge(imgStream, cssStream);
});

gulp.task('script', function(){
  return gulp.src('app/js/*.js')
  .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js'
  ])
    .pipe(plumber())
    .pipe(concat('libs.min.js'))
    .pipe(babel({
      presets: ['@babel/env'],
      plugins: ['@babel/transform-runtime']
    })
    .pipe(uglify())
    .pipe(plumber.stop())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
)});

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: ['app']
      }
  });
});

gulp.task('export', function(){
     let buildHtml = gulp.src('app/**/*.html')
     .pipe(gulp.dest('dist'));

  let BuildCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'))

  let BuildJs = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
    
  let BuildFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))

  let BuildImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
    
  // let BuildPugPages = gulp.src('app/pug/**/*.pug')
  //   .pipe(dest('app'));
  return merge(buildHtml,BuildCss,BuildFonts,BuildJs,BuildImg);
});

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/**/*.pug', gulp.parallel('pug'));
  gulp.watch('app/js/*.js', gulp.parallel('script'));
  gulp.watch('app/sprite/**/*.png', gulp.parallel('sprite'));
});

gulp.task('build', gulp.series('clean', 'export'));

gulp.task('default', gulp.parallel('html','css' ,'scss', 'image', 'js','pug', 'browser-sync', 'watch'));