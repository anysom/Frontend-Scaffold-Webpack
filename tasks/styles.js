import gulp    from 'gulp'
import sass from 'gulp-sass'
import rename from 'gulp-rename'
import autoprefixer from 'gulp-autoprefixer'
import minifyCSS from 'gulp-minify-css'
import globalConfig from './config'

function handleError(error) {
    console.log('test', error.toString());
    gulp.src('').pipe(notify(error));
    this.emit('end');
}

function styles(browser) {
  console.log('Build styles');

  gulp.src(globalConfig.stylesDirectory + globalConfig.mainStyleFile)
    .pipe(sass())
    .on('error', handleError)
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .on('error', handleError)
    .pipe(minifyCSS())
    .on('error', handleError)
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(globalConfig.staticDistDirectory + '/css'))
    .pipe(browser.stream());
}

module.exports = styles
